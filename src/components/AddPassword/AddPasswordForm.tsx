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
import { passwordCreationSchema } from '@utils/patterns';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

function AddPasswordForm() {
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        website: '',
        login: '',
        password: '',
      }}
      validationSchema={passwordCreationSchema}
      onSubmit={async (values) => {
        // prompts the user for their master password and validates it
        const masterPassword = await getMasterPassword();

        if (!masterPassword) {
          setFormError('Canceled');
          return;
        }

        // TODO: encrypt and send to server storage
      }}
    >
      {({ errors, isSubmitting, touched }) => (
        <Form>
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
