import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import AddPassword from '@components/AddPassword';
import { DecryptedPassword } from '@utils/types/DecryptedPassword';
import { useState } from 'react';
import PasswordTable from './PasswordTable';

interface PasswordsDisplayProps {
  passwords: DecryptedPassword[];
}

function PasswordsDisplay({ passwords }: PasswordsDisplayProps) {
  const [filter, setFilter] = useState<string>();
  const filteredPasswords = filterPasswords(passwords, filter);

  return (
    <Box>
      {/* Top */}
      <HStack>
        {/* Search bar */}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            variant="filled"
            placeholder="Search"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </InputGroup>
        <AddPassword />
      </HStack>

      {filteredPasswords.length !== 0 ? (
        <PasswordTable filteredPasswords={filteredPasswords} />
      ) : (
        <Text>Nothing to be found.</Text>
      )}
    </Box>
  );
}

function filterPasswords(passwords: DecryptedPassword[], filter: string) {
  if (filter === '' || !filter) return passwords;
  // passwords with logins which contain the filter
  return passwords.filter(({ login, name }) => {
    return login.includes(filter) || name.includes(filter);
  });
}

export default PasswordsDisplay;
