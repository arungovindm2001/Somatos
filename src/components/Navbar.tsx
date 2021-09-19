import {
  Box,
  Flex,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const Navbar = (): JSX.Element => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const nextMode = useColorModeValue("dark", "light");

  return (
    <Flex w="100%" m="2" mb="4">
      <Box m="2">{/* ok so basically im monky */}</Box>
      <Spacer />
      <Box>
        <IconButton
          size="md"
          fontSize="lg"
          aria-label={`Switch to ${nextMode} mode`}
          variant="ghost"
          color="current"
          margin="2"
          marginRight="4"
          onClick={toggleColorMode}
          icon={<SwitchIcon />}
        />
      </Box>
    </Flex>
  );
};
