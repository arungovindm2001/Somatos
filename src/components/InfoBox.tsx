import {
  VStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { ErgonomicGuidelines } from "./ErgonomicGuidelines";

export const InfoBox = (): JSX.Element => {
  const responsiveWidth = useBreakpointValue({
    base: "85vw",
    sm: "60vw",
    md: "45vw",
  });
  return (
    <VStack
      p={5}
      shadow="md"
      borderRadius="md"
      m={4}
      textAlign="center"
      w="1500px"
    >
      <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }}>
        <Text as="strong">SOMA</Text>
        <Text as="strong" color={useColorModeValue("green.500", "green.300")}>
          TOS
        </Text>{" "}
        analyzes your posture & notifies you in real-time!
      </Text>
      <Text
        opacity={0.8}
        fontSize={{ base: "lg", lg: "xl" }}
        mt="6"
        textAlign="center"
      >
        Get into an ergonomic position, set your timer, click calibrate, and get
        cracking! You can minimize the browser and{" "}
        <span>
          <Text as="strong">SOMA</Text>
          <Text
            as="strong"
            color={useColorModeValue("green.500", "green.300")}
          >
            TOS
          </Text>
        </span>{" "}
        will play an audio notification if we identify bad posture!
      </Text>
      <ErgonomicGuidelines />
    </VStack>
  );
};
