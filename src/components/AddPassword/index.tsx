import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import AddPasswordForm from './AddPasswordForm';

function AddPassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="green" px="8">
        Add Password
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddPasswordForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddPassword;
