import { useQuery } from "react-query";
import axios from "axios";

// putting this here as a guide for what the API returns
// and what you need from it.
export interface Show {
  score: number;
  show: {
    id: number;
    name: string;
    type: string;
    genres: string[];
    image?: {
      medium: string;
    };
    summary: string;
  };
}

export interface QueryResponse {
  data: Show[] | undefined;
  isLoading: boolean;
}

const getShows = async (searchValue: string): Promise<Show[]> => {
  const { data } = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${searchValue}`
  );
  return data;
};

export default function useGetShows(searchValue: string) {
  return useQuery<Show[], Error>(
    ["shows", searchValue],
    () => getShows(searchValue),
  );
}
