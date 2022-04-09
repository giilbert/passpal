import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
  Text,
} from '@chakra-ui/react';
import { getMasterPassword } from '@components/MasterPasswordPrompt/getMasterPassword';
import { encryptPassword } from '@utils/passwordEncryption';
import { passwordCreationSchema } from '@utils/patterns';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

const CREATE_PASSWORD_ENDPOINT = '/api/create-password';

function AddPasswordForm({ close }: { close: () => void }) {
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        name: '',
        website: '',
        login: '',
        password: '',
      }}
      validationSchema={passwordCreationSchema}
      onSubmit={async (values, helpers) => {
        // prompts the user for their master password and validates it
        const masterPassword = await getMasterPassword();
        // if the user cancels entering their master password
        if (!masterPassword) {
          setFormError('Canceled');
          return;
        }

        const encrypted = await encryptPassword(values.password);

        const res = await axios.post(CREATE_PASSWORD_ENDPOINT, {
          ...values,
          password: encrypted,
        });

        if (res.status === 200) {
          close();
        } else {
          setFormError('An error occurred.');
        }
      }}
    >
      {({ errors, isSubmitting, touched }) => (
        <Form>
          <Field name="name">
            {({ field }) => (
              <FormControl
                isInvalid={errors.name && touched.name}
                mb="4"
                isRequired
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} id="name" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="website">
            {({ field }) => (
              <FormControl isInvalid={errors.website && touched.website} mb="4">
                <FormLabel htmlFor="website">Website</FormLabel>
                <Input {...field} id="website" />
                <FormErrorMessage>{errors.website}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="login">
            {({ field }) => (
              <FormControl
                isInvalid={errors.login && touched.login}
                isRequired
                mb="4"
              >
                <FormLabel htmlFor="login">Login</FormLabel>
                <Input {...field} id="login" />
                <FormErrorMessage>{errors.login}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="password">
            {({ field }) => (
              <FormControl
                isInvalid={errors.password && touched.password}
                isRequired
                mb="4"
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    {...field}
                    id="password"
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
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Text colorScheme="red" mb="4">
            {formError}
          </Text>

          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            mb="2"
          >
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddPasswordForm;
