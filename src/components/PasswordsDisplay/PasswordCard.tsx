import { Td, Tr } from '@chakra-ui/react';
import { DecryptedPassword } from '@utils/types/DecryptedPassword';
import { PageContext } from 'pages/app';
import { useContext } from 'react';

interface PasswordCardProps {
  decryptedPassword: DecryptedPassword;
}

function PasswordCard({ decryptedPassword }: PasswordCardProps) {
  const { name, login } = decryptedPassword;
  const { setSidePasswordDisplay } = useContext(PageContext);

  return (
    <Tr
      _hover={{
        cursor: 'pointer',
        boxShadow: '-4px 0px teal',
      }}
      transition="box-shadow 500ms cubic-bezier(0.33, 1, 0.68, 1)"
      onClick={() => setSidePasswordDisplay(decryptedPassword)}
    >
      <Td>{name}</Td>
      <Td>{login}</Td>
    </Tr>
  );
}

export default PasswordCard;
