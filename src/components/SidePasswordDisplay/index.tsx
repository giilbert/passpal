import { CloseIcon, CopyIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Code,
  createStandaloneToast,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  ScaleFade,
  Slide,
  useBreakpointValue,
  useOutsideClick,
} from '@chakra-ui/react';
import { Password } from '@prisma/client';
import { decryptPassword } from '@utils/passwordEncryption';
import { DecryptedPassword } from '@utils/types/DecryptedPassword';
import { PageContext } from 'pages/app';
import { useContext, useRef } from 'react';

function SidePasswordDisplay() {
  const { sidePasswordDisplay, setSidePasswordDisplay } =
    useContext(PageContext);
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  const ref = useRef();
  useOutsideClick({
    ref,
    handler: () => setSidePasswordDisplay(null),
  });

  if (!sidePasswordDisplay && !isMobile)
    return <Center height="100%">Select a password</Center>;
  if (!sidePasswordDisplay) return null;

  if (isMobile)
    return (
      <Box
        position="absolute"
        left={0}
        top={0}
        p="5"
        width="100vw"
        height="100vh"
        backgroundColor="Window"
        zIndex={999}
        ref={ref}
      >
        <ScaleFade in={!!sidePasswordDisplay}>
          <Box>
            <Button
              colorScheme="red"
              onClick={() => setSidePasswordDisplay(null)}
            >
              <CloseIcon />
            </Button>
            <Content {...sidePasswordDisplay} />
          </Box>
        </ScaleFade>
      </Box>
    );

  return (
    <Box ref={ref}>
      <Content {...sidePasswordDisplay} />
    </Box>
  );
}

const Content = ({ website, login, password }: Password) => {
  return (
    <>
      <Heading my="5">{website}</Heading>

      {/* login info */}
      <InputGroup size="md">
        <InputLeftAddon children="Login" />
        <Input type="text" value={login} disabled />
        <InputRightElement width="4rem" mr="2">
          <Button h="1.75rem" size="sm">
            <EditIcon />
          </Button>

          <Button
            h="1.75rem"
            size="sm"
            colorScheme="teal"
            onClick={() => copy(login)}
          >
            <CopyIcon />
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* password info */}
      <InputGroup size="md" mt="2">
        <InputLeftAddon children="Password" />
        <Input type="password" value={'*'.repeat(12)} disabled />
        <InputRightElement width="6rem" mr="2">
          <Button h="1.75rem" size="sm">
            <EditIcon />
          </Button>

          <Button h="1.75rem" size="sm">
            <ViewIcon width="34px" />
          </Button>

          <Button
            h="1.75rem"
            size="sm"
            colorScheme="teal"
            onClick={async () => copy(await decryptPassword(password))}
          >
            <CopyIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

function copy(text: string) {
  const toast = createStandaloneToast({
    defaultOptions: {
      duration: 500,
      position: 'top',
    },
  });

  window.navigator.clipboard
    .writeText(text)
    .then(() => {
      toast({
        title: 'Copied!',
        status: 'success',
      });
    })
    .catch(() => {
      toast({
        title: 'An error occured',
        status: 'error',
      });
    });
}

export default SidePasswordDisplay;
