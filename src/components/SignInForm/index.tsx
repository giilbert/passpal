import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { userCredentialsSchema } from '@utils/patterns';
import { Formik, Form, Field } from 'formik';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

function SignInForm() {
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={userCredentialsSchema}
      onSubmit={async (values) => {
        await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        }).then((result) => {
          if (result.ok) window.location.href = '/app';
          else if (result.status === 401)
            setFormError('Invalid email or password');
          else if (result.status !== 401) setFormError('An error occured');
        });
      }}
    >
      {({ errors, isSubmitting, setFieldValue, touched }) => (
        <Form>
          <Field name="email">
            {({ field }) => (
              <FormControl
                isInvalid={errors.email && touched.email}
                isRequired
                mb="4"
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
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
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
