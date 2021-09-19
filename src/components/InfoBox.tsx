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
      borderWidth="1px"
      m={4}
      textAlign="center"
      w={responsiveWidth}
    >
      <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }}>
        <Text as="strong">Posture</Text>
        <Text as="strong" color={useColorModeValue("purple.500", "purple.300")}>
          AI
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
          <Text as="strong">Posture</Text>
          <Text
            as="strong"
            color={useColorModeValue("purple.500", "purple.300")}
          >
            AI
          </Text>
        </span>{" "}
        will play an audio notification if we identify bad posture!
      </Text>
      <ErgonomicGuidelines />
    </VStack>
  );
};
