import {
  Box,
  BoxProps,
  Container,
  IconProps,
  Link,
  Text,
} from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import NextLink from 'next/link';
import { cloneElement, ReactElement } from 'react';

const navItemVariants: Variants = {
  hover: {
    backgroundColor: '#0001',
    transition: {
      ease: 'linear',
      duration: 0.1,
    },
  },
};

const AnimatedBox = motion<BoxProps>(Box);

interface NavItemProps {
  name: string;
  url: string;
  icon: ReactElement;
}

function NavItem({ name, url, icon }: NavItemProps) {
  return (
    <NextLink href={url} passHref>
      <AnimatedBox
        py="3"
        px="5"
        variants={navItemVariants}
        whileHover="hover"
        cursor="pointer"
        display="flex"
        alignItems="center"
      >
        {cloneElement<IconProps>(icon, {
          width: 5,
          height: 5,
        })}
        <Text ml="4" fontSize="xl">
          {name}
        </Text>
      </AnimatedBox>
    </NextLink>
  );
}

export default NavItem;
