import {
  Box,
  Input,
  Flex,
  VStack,
  Skeleton,
  Tag,
  Image,
  Stack,
  Heading,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useDebounce } from "use-debounce";
import React, { useState } from "react";
import useGetShows, { QueryResponse, Show } from "./hooks";

function ShowCard(props: Show) {
  // 💡 use this link below for placeholder images.
  // "https://via.placeholder.com/112x157.png?text=No+image"

  // 💡 A few hints:
  // genres use the Tag component
  // loading placeholders use the Skeleton component
  // both from @chakra-ui/react
  // use the docs: https://chakra-ui.com/docs/getting-started
  const showImgUrl = props.show.image?.medium;

  return (
    <Flex
      w="full"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      shadow="sm"
      _hover={{
        cursor: "pointer",
        shadow: "lg"
      }}
    >
      <Image
        width={112}
        height={157.33}
        src={showImgUrl}
        fallbackSrc="https://via.placeholder.com/112x157.png?text=No+image"
      />
      <Box p={4}>
        <Stack direction="row">
          {props.show.genres.map((g, idx) => (
            <Tag key={`${g}-${idx}`} size="sm">{g}</Tag>))}
        </Stack>
        <Heading fontSize="md" color="gray.600" fontWeight="bold" marginTop={2}>
          {props.show.name}
        </Heading>
        <Text
          fontSize="small"
          mt="2"
          color="gray.500"
          noOfLines={2}
          dangerouslySetInnerHTML={{
            __html: props.show.summary
          }}
        />
      </Box>
    </Flex>
  );
}

function EmptyShowCard() {
  return (
    <Flex
      w="full"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      shadow="sm"
      _hover={{
        cursor: "pointer",
        shadow: "lg"
      }}
    >
      <Skeleton width={112} height={157.33} />
      <Box p={4} flex={1}>
        <Skeleton height="30px" />
        <SkeletonText mt="2" noOfLines={3} spacing="2" height="10px" />
      </Box>
    </Flex>
  );
}

export default function Two() {
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);

  // I've debounced the input for you just
  // use 'searchValue' to trigger a request to the search API
  // https://api.tvmaze.com/search/shows?q=:searchValue
  
  const { data: results = [], isLoading }: QueryResponse = useGetShows(searchValue);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <Box>
      <Input
        type="text"
        placeholder="Search for a TV show"
        onChange={handleSearch}
      />
      { searchValue === '' ?
        <Text p={6} textAlign="center" color="gray.500" >
          Nothing here. Try searching for a TV show above!
        </Text> :
          !isLoading && results.length === 0 ?
            <Text p={6} textAlign="center" color="gray.500" >
              No results for "{searchValue}"
            </Text> :
            <VStack spacing={4} mt={6}>
              {isLoading ?
                <>
                  <EmptyShowCard />
                  <EmptyShowCard />
                </> :
                results.map((show) => (
                  <ShowCard key={show.show.id} {...show} />
                ))}
            </VStack> }
    </Box>
  );
}
