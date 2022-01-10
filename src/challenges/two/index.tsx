import { Box, Input, Flex, Text, VStack } from "@chakra-ui/react";
import { useDebounce } from "use-debounce";
import React, { useState } from "react";

// putting this here as a guide for what the API returns
// and what you need from it.
interface Show {
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

function ShowCard() {
  // 💡 use this link below for placeholder images.
  // "https://via.placeholder.com/112x157.png?text=No+image"

  // 💡 A few hints:
  // genres use the Tag component
  // loading placeholders use the Skeleton component
  // both from @chakra-ui/react
  // use the docs: https://chakra-ui.com/docs/getting-started

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
      p={4}
    >
      <Text>
        Fill me in{" "}
        <span role="img" aria-label="wave">
          👋{" "}
        </span>
      </Text>
    </Flex>
  );
}

export default function Two() {
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);

  // I've debounced the input for you just
  // use 'searchValue' to trigger a request to the search API
  // https://api.tvmaze.com/search/shows?q=:searchValue

  console.log(searchValue);

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
      <VStack spacing={4} mt={6}>
        <ShowCard />
      </VStack>
    </Box>
  );
}
