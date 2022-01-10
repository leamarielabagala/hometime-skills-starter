import {
  Box,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from "@chakra-ui/react";

import One from "./challenges/one";
import Two from "./challenges/two";
import Three from "./challenges/three";

export default function App() {
  return (
    <Box bg="gray.100" minH="100vh" pb={12}>
      <Container pt={8} centerContent>
        <Box bg="white" w="md" minH="xl" borderRadius="lg" shadow="md" p={4}>
          <Tabs variant="soft-rounded">
            <TabList p={2} pb={0}>
              <Tab>Coordinates</Tab>
              <Tab>TV Shows</Tab>
              <Tab>Stopwatch</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <One />
              </TabPanel>
              <TabPanel>
                <Two />
              </TabPanel>
              <TabPanel>
                <Three />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
}
