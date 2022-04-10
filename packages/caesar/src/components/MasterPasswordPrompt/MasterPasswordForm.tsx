import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { returnListener } from './getMasterPassword';

let masterPasswordHashed: string =
  typeof window !== 'undefined' &&
  localStorage.getItem('master-password-hashed');

function MasterPasswordForm({ close }: { close: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        masterPassword: '',
      }}
      validate={async (fields) => {
        // error if the master password does not matched the entered one
        if (masterPasswordHashed !== (await sha256(fields.masterPassword)))
          return {
            masterPassword: 'Master Password does not match.',
          };
      }}
      onSubmit={async (values) => {
        // promising return using event emitters
        returnListener.emit('success', values.masterPassword);
        close();
      }}
    >
      {({ errors, isSubmitting, touched }) => (
        <Form>
          <Field name="masterPassword">
            {({ field }) => (
              <FormControl
                isInvalid={errors.masterPassword && touched.masterPassword}
                isRequired
                mb="4"
              >
                <FormLabel htmlFor="masterPassword">Master Password</FormLabel>
                <InputGroup>
                  <Input
                    {...field}
                    id="masterPassword"
                    type={showPassword ? 'text' : 'password'}
                  />

                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>
                  Your master password will be stored for this session. <br />
                  It will be forgotten when you leave or refresh this website.
                </FormHelperText>
                <FormErrorMessage>{errors.masterPassword}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            mb="2"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

// utility function to compute the sha256 hash of the password, to store
async function sha256(str: string) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  );
  return Array.prototype.map
    .call(new Uint8Array(buf), (x: number) => ('00' + x.toString(16)).slice(-2))
    .join('');
}

export default MasterPasswordForm;
