import { Box, VStack, Text, useColorModeValue, chakra } from "@chakra-ui/react";

export const Header = (): JSX.Element => {
  return (
    <VStack textAlign="center">
      <chakra.h1
        className="header"
        fontSize={{ base: "2.25rem", sm: "3rem", lg: "3.75rem" }}
        letterSpacing="tight"
        fontWeight="bold"
        lineHeight="1.2"
      >
        SOMA
        <Box
          as="span"
          className="header"
          color={useColorModeValue("green.500", "green.300")}
        >
          TOS
        </Box>
      </chakra.h1>
      <Text opacity={0.5} fontSize={{ base: "sm", lg: "md" }}>
        AI powered posture improvement
      </Text>
    </VStack>
  );
};
