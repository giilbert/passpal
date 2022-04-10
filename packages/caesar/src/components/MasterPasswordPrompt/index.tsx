import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { EventEmitter } from 'events';
import MasterPasswordForm from './MasterPasswordForm';
import { returnListener } from './getMasterPassword';

const trigger = new EventEmitter();

function MasterPasswordPrompt() {
  const { isOpen, onOpen, onClose, getDisclosureProps } = useDisclosure();

  useEffect(() => {
    trigger.on('show', onOpen);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        returnListener.emit('cancel');
        onClose();
      }}
      size="md"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <MasterPasswordForm close={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { trigger };
export default MasterPasswordPrompt;
