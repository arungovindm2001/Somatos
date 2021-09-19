import {
  Box,
  Icon,
  Link,
  Stack,
  Text,
  Image,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { VscGithubInverted } from "react-icons/vsc";

export const Footer = (): JSX.Element => {
  const links = [
    {
      label: "Github",
      icon: VscGithubInverted,
      url: "https://github.com/arungovindm2001/posture-app",
    },
    
  ];

  const color = useColorModeValue("purple.500", "purple.300");
  return (
    <Box as="footer" mt={12} height="100%" textAlign="center" className="app">
      <Text fontSize="sm">
        Made by
        <Center>
        <Link href="https://github.com/kingjuno" isExternal>
          <Image
            src="https://avatars.githubusercontent.com/u/69108486?v=4"
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
            padding="10px"
          ></Image>
          </Link>
          <Link href="https://github.com/arungovindm2001" isExternal>
          <Image
            src="https://avatars.githubusercontent.com/u/67337602?v=4"
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
            padding="10px"
          ></Image>
          </Link>
          <Link href="https://github.com/gopik820" isExternal>
          <Image
            src="https://avatars.githubusercontent.com/u/73281663?v=4"
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
            padding="10px"
          ></Image>
          </Link>
          <Link href="https://github.com/siddharthc30" isExternal>
          <Image
            src="https://avatars.githubusercontent.com/u/53928899?v=4"
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
            padding="10px"
          ></Image>
          </Link>
        </Center>
        
      </Text>
      <Stack mt={4} direction="row" spacing="12px" justify="center" mb={10}>
        {links.map((link, index) => {
          return (
            <Link
              key={index}
              display="inline-block"
              href={link.url}
              aria-label={link.label}
              isExternal
            >
              <Icon
                as={link.icon}
                fontSize="xl"
                color="gray.400"
                _hover={{ color: color }}
              />
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
};
