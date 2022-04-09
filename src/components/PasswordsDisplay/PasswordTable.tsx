import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { Password } from '@prisma/client';
import PasswordCard from './PasswordCard';

interface PasswordTableProps {
  filteredPasswords: Password[];
}

function PasswordTable({ filteredPasswords }: PasswordTableProps) {
  return (
    <Table variant="striped" colorScheme="orange">
      <Thead>
        <Tr>
          <Th>Login</Th>
          <Th>Website</Th>
        </Tr>
      </Thead>

      <Tbody>
        {filteredPasswords.map((p, i) => (
          <PasswordCard password={p} key={i} />
        ))}
      </Tbody>
    </Table>
  );
}

export default PasswordTable;
