import { getMasterPassword } from '@components/MasterPasswordPrompt/getMasterPassword';

// takes in an encrypted password and turns it into a string
function encodePassword(data: ArrayBuffer, iv: Uint8Array) {
  const dataEncoded = Buffer.from(data).toString('base64');
  const ivEncoded = Buffer.from(iv).toString('base64');
  return dataEncoded + ',' + ivEncoded;
}

// takes in a string and turns it into a encrypted password
function decodePassword(encoded: string) {
  const [dataEncoded, ivEncoded] = encoded.split(',');
  const data = new Uint8Array(Buffer.from(dataEncoded, 'base64'));
  const iv = new Uint8Array(Buffer.from(ivEncoded, 'base64'));

  return {
    data,
    iv,
  };
}

function stringToBuffer(string: string) {
  const textEncoder = new TextEncoder();
  return textEncoder.encode(string);
}

async function genKey() {
  const masterPassword = stringToBuffer(await getMasterPassword());

  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    masterPassword,
    {
      name: 'PBKDF2',
    },
    false,
    ['deriveKey']
  );

  const salt = 'Salt Salt Salt';

  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: stringToBuffer(salt),
      iterations: 1000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-CBC', length: 128 },
    true,
    ['encrypt', 'decrypt']
  );

  return key;
}

async function encryptPassword(password: string) {
  const key = await genKey();

  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const encrypted = (await window.crypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    key,
    stringToBuffer(password)
  )) as Uint8Array;

  return encodePassword(encrypted, iv);
}

async function decryptPassword(encrypted: string) {
  const { data, iv } = decodePassword(encrypted);
  const key = await genKey();

  const decrypted = (await window.crypto.subtle.decrypt(
    {
      name: 'AES-CBC',
      iv,
    },
    key,
    data
  )) as ArrayBuffer;

  // convert array buffer to string
  const encoder = new TextDecoder('utf-8');

  return encoder.decode(decrypted);
}

export { encryptPassword, decryptPassword, decodePassword };
