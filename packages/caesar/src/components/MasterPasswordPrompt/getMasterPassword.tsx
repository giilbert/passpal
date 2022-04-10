import { trigger } from '.';
import { EventEmitter } from 'events';

// master password will be stored IN-MEMORY
// will be cleared every 10 minutes and when page reloads

let masterPassword: string;

async function getMasterPassword() {
  if (!masterPassword) {
    try {
      masterPassword = await promptMasterPassword();
    } catch {
      return;
    }
  }

  return masterPassword;
}

let returnListener = new EventEmitter();
// will wait for master password to be entered before continuing
function promptMasterPassword() {
  trigger.emit('show');
  return new Promise<string>((resolve, reject) => {
    const cleanUp = () => {
      returnListener.off('success', success);
      returnListener.off('cancel', reject);
    };

    const success = (masterPassword: string) => {
      resolve(masterPassword);
      cleanUp();
    };

    const error = () => {
      reject();
      cleanUp();
    };

    returnListener.on('success', success);
    returnListener.on('cancel', error);
  });
}

export { getMasterPassword, promptMasterPassword, returnListener };
