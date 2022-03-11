import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import PasswordCard from './PasswordCard';

function PasswordsDisplay() {
  return (
    <Box>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input variant="filled" placeholder="Search" />
      </InputGroup>

      <Table variant="striped" colorScheme="orange">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Login</Th>
          </Tr>
        </Thead>

        <Tbody>
          <PasswordCard name="Google" login="me@gmail.com" password="as" />
          <PasswordCard name="Google" login="hello@gmail.com" password="as" />
        </Tbody>
      </Table>
    </Box>
  );
}

export default PasswordsDisplay;
