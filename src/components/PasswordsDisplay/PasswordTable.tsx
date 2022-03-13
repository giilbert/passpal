import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { DecryptedPassword } from '@utils/types/DecryptedPassword';
import PasswordCard from './PasswordCard';

interface PasswordTableProps {
  filteredPasswords: DecryptedPassword[];
}

function PasswordTable({ filteredPasswords }: PasswordTableProps) {
  return (
    <Table variant="striped" colorScheme="orange">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Login</Th>
        </Tr>
      </Thead>

      <Tbody>
        {filteredPasswords.map((p) => (
          <PasswordCard decryptedPassword={p} />
        ))}
      </Tbody>
    </Table>
  );
}

export default PasswordTable;
