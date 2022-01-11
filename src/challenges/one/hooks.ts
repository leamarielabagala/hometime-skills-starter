import React, { RefObject, Reducer, useReducer, useEffect, useRef } from "react";

type MousedownAction = {
  type: 'mousedown';
  element: HTMLElement;
  event: MouseEvent;
}

type MousemoveAction = {
  type: 'mousemove';
  element: HTMLElement;
  event: MouseEvent;
}

type UseMouseAction =
  | MousemoveAction
  | {
      type: 'activeStatus';
      value: UseMouseState['context']['activeStatus'];
    }
  | {
      type: 'mouseleave';
    }
  | {
      type: 'mouseup';
    }
  | MousedownAction

interface UseMouseState {
  mouse: MousePosition;
  context: {
    hoverStatus: 'idle' | 'enter' | 'leave';
    activeStatus: 'inactive' | 'active';
  }
}

const initialState: MousePosition = {
  x: null,
  y: null,
  elementWidth: null,
  elementHeight: null,
  isOver: false,
  isDown: false,
};

const initialContext: UseMouseState['context'] = {
  hoverStatus: 'idle',
  activeStatus: 'inactive',
};

export interface MousePosition {
  x: number | null;
  y: number | null;
  elementWidth: number | null;
  elementHeight: number | null;
  isOver: boolean;
  isDown: boolean;
}

const MouseReducer = (state: UseMouseState, action: UseMouseAction): UseMouseState => {
  const { mouse, context } = state;

  const handleDown = (
    state: UseMouseState,
    action:
      | MousedownAction
      | MousemoveAction
  ): UseMouseState => {
    if (typeof window === 'undefined') return state;
    const { event: e, element } = action;
    let event: MouseEvent = e;

    const { pageX = 0, pageY = 0 } = event;
    const rect = element.getBoundingClientRect();
    const x = pageX - rect.left - (window.pageXOffset || window.scrollX);
    const y = pageY - rect.top - (window.pageYOffset || window.scrollY);

    return {
      context: {
        ...state.context,
        hoverStatus: 'enter',
      },
      mouse: {
        ...state.mouse,
        x,
        y,
        elementWidth: rect.width,
        elementHeight: rect.height,
        isOver: true,
      },
    };
  }

  switch (action.type) {
    case 'mousemove':
      return handleDown(state, action);
    case 'mousedown':
      return {
        context,
        mouse: {
          ...mouse,
          isDown: true,
        },
      };
    case 'mouseup':
      return { context, mouse: { ...mouse, isDown: false } };
    case 'mouseleave':
      return {
        context: {
          ...context,
          hoverStatus: 'leave',
        },
        mouse: { ...mouse, isOver: false },
      };
    case 'activeStatus':
      return {
        context: { ...context, activeStatus: action.value },
        mouse,
      };
    default:
      return state;
  }
};

function useEvent(ref: any, type: any, listener: any): void {
  const storedListener = useRef(listener);

  useEffect(() => {
    storedListener.current = listener;
  })

  useEffect(() => {
    const refEl = ref && 'current' in ref ? ref.current : ref;
    if (!refEl) return;

    let didUnsubscribe = 0
    function listener(this: any, ...args: any[]) {
      if (didUnsubscribe) return;
      storedListener.current.apply(this, args);
    }

    refEl.addEventListener(type, listener);

    return () => {
      didUnsubscribe = 1;
      refEl.removeEventListener(type, listener);
    }
  }, [ref, type])
}

function useMouseLocation<HTMLElement>(
  ref: RefObject<HTMLElement>
): MousePosition {
  const [state, dispatch] = useReducer<
    Reducer<UseMouseState, UseMouseAction>
  >(
    MouseReducer,
    {
      mouse: initialState,
      context: initialContext,
    }
  );

  const getElement = (ref: any) => {
    return ref && 'current' in ref ? ref.current : ref;
  };

  const onMove = (event: MouseEvent) => {
    const element = getElement(ref);
    if (!element) return;
    dispatch({ type: 'mousemove', event, element });
  };

  const onLeave = () => dispatch({ type: 'mouseleave' });

  const onDown = (event: MouseEvent) => {
    const element = getElement(ref);
    if (!element) return;
    dispatch({
      type: 'mousedown',
      element,
      event,
    });
  };

  const onUp = () => dispatch({ type: 'mouseup' });

  useEvent(ref, 'mouseenter', onMove);
  useEvent(ref, 'mousemove', onMove);
  useEvent(ref, 'mouseleave', onLeave);
  useEvent(ref, 'mousedown', onDown);
  useEvent(typeof window !== 'undefined' ? window : null, 'mousedown', onDown);
  useEvent(typeof window !== 'undefined' ? window : null, 'mouseup', onUp);

  useEffect(() => {
    if (state.context.hoverStatus === 'enter') {
      dispatch({ type: 'activeStatus', value: 'active' });
    } else {
      dispatch({ type: 'activeStatus', value: 'inactive' })
    }
  }, [state.context.hoverStatus])

  return state.context.activeStatus === 'active' ? state.mouse : initialState;
}

export default useMouseLocation;