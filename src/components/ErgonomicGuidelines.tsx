import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  UnorderedList,
  Text,
  ListItem,
} from "@chakra-ui/react";

export const ErgonomicGuidelines = (): JSX.Element => {
  return (
    <Accordion defaultIndex={[0]} allowToggle w="100%" pt={4}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text
                as="strong"
                opacity={0.8}
                fontSize={{ base: "md" }}
                alignSelf="start"
              >
                Ergonomic guidelines:
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <UnorderedList alignItems="start" pl={8} textAlign="start">
            <ListItem>
              <Text opacity={0.8} fontSize={{ base: "md", lg: "lg" }}>
                Sit back in your chair.
              </Text>
            </ListItem>
            <ListItem>
              <Text opacity={0.8} fontSize={{ base: "md", lg: "lg" }}>
                Maximize the contact of your back with the chair back using
                chair adjustments or cushions as needed.
              </Text>
            </ListItem>
            <ListItem>
              <Text opacity={0.8} fontSize={{ base: "md", lg: "lg" }}>
                Position the monitor at a comfortable height that doesn't make
                you bend your head up down to see the screen.
              </Text>
            </ListItem>
            <ListItem>
              <Text opacity={0.8} fontSize={{ base: "md", lg: "lg" }}>
                Place your feet flat on the floor or on a footrest.
              </Text>
            </ListItem>
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
