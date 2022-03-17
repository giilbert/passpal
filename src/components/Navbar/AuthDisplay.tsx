import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import UserProfileIcon from './UserProfileIcon';
const AnimatedBox = motion<BoxProps>(Box);

function AuthDisplay() {
  const { data: session } = useSession({
    required: false,
  });

  return (
    <AnimatedBox py="3" px="3.5" display="flex" alignItems="center">
      <UserProfileIcon width={8} height={8} />
      <Menu>
        <MenuButton ml="1.5" as={Button} rightIcon={<ChevronDownIcon />}>
          Signed in as <strong>{session.user.name}</strong>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </AnimatedBox>
  );
}

export default AuthDisplay;
