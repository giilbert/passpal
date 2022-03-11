import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowRightIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import NavItem from './NavItem';
import AuthDisplay from './AuthDisplay';

function Navbar() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  if (!isOpen) return <OpenButton open={onOpen} />;

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Heading>Passpal</Heading>
          <DrawerCloseButton onClick={onClose} mt="3" />
        </DrawerHeader>
        <DrawerBody p="1">
          <NavItem name="Home" url="/app" icon={<ArrowRightIcon />} />
          <NavItem
            name="Generate Password"
            url="/generate-password"
            icon={<EditIcon />}
          />
          <AuthDisplay />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function OpenButton({ open }: { open: () => void }) {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  if (isMobile)
    return (
      <Button
        onClick={() => {
          open();
        }}
        m="3"
        colorScheme="teal"
        position="fixed"
        top="0"
        left="0"
      >
        <HamburgerIcon />
      </Button>
    );

  return (
    <Button
      onClick={() => {
        open();
      }}
      leftIcon={<HamburgerIcon />}
      m="3"
      colorScheme="teal"
      position="fixed"
      top="0"
      left="0"
    >
      Menu
    </Button>
  );
}

export default Navbar;
