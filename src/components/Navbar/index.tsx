import {
  Flex,
  Box,
  Text,
  useDisclosure,
  Button,
  FlexProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  Heading,
} from '@chakra-ui/react';
import {
  ArrowRightIcon,
  EditIcon,
  HamburgerIcon,
  LockIcon,
} from '@chakra-ui/icons';
import { motion, Variants } from 'framer-motion';
import NavItem from './NavItem';

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
          <NavItem name="Home" url="/" icon={<ArrowRightIcon />} />
          <NavItem name="Passwords" url="/passwords" icon={<LockIcon />} />
          <NavItem
            name="Create A Password"
            url="/generate"
            icon={<EditIcon />}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function OpenButton({ open }: { open: () => void }) {
  return (
    <Button
      onClick={() => {
        open();
      }}
      leftIcon={<HamburgerIcon />}
      m="3"
      colorScheme="teal"
    >
      Menu
    </Button>
  );
}

export default Navbar;
