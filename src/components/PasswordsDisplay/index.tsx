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
import { fetcher } from '@utils/fetcher';
import useSWR from 'swr';
import { Password } from '@prisma/client';

function PasswordsDisplay() {
  const { data: passwords, error } = useSWR<Password[]>(
    '/api/get-passwords',
    fetcher
  );
  const [filter, setFilter] = useState<string>();
  const filteredPasswords = filterPasswords(passwords, filter);

  if (!passwords) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;

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

function filterPasswords(passwords: Password[], filter: string) {
  if (filter === '' || !filter) return passwords;
  // passwords with logins which contain the filter
  return passwords.filter(({ login, website }) => {
    return login.includes(filter) || website.includes(filter);
  });
}

export default PasswordsDisplay;
