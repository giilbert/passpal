import { Td, Tr } from '@chakra-ui/react';
import { Password } from '@prisma/client';
import { PageContext } from 'pages/app';
import { useContext } from 'react';

interface PasswordCardProps {
  password: Password;
}

function PasswordCard({ password }: PasswordCardProps) {
  const { name, website, login } = password;
  const { setSidePasswordDisplay } = useContext(PageContext);

  return (
    <Tr
      _hover={{
        cursor: 'pointer',
        boxShadow: '-4px 0px teal',
      }}
      transition="box-shadow 500ms cubic-bezier(0.33, 1, 0.68, 1)"
      onClick={() => setSidePasswordDisplay(password)}
    >
      <Td>{name}</Td>
      <Td>{login}</Td>
      <Td>{website}</Td>
    </Tr>
  );
}

export default PasswordCard;
