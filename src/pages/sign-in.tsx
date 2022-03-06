import {
  Button,
  Center,
  Container,
  Divider,
  Heading,
  Input,
  InputGroup,
  Text,
  Link,
} from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import NextLink from 'next/link';
import { userCredentialsSchema } from '@utils/patterns';

function SignInPage() {
  return (
    <Center>
      <Container mt="8">
        <Heading>Sign In</Heading>
        <Divider my="5" />
        <SignInForm />

        <NextLink href="/sign-up" passHref>
          <Link color="cyan.700">Don't have an account? Sign Up</Link>
        </NextLink>
      </Container>
    </Center>
  );
}

interface FormValues {
  email: string;
  password: string;
}

const SignInForm = () => {
  const [formError, setFormError] = useState('');

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
      {({ errors, isSubmitting, setFieldValue }: FormikProps<FormValues>) => (
        <Form>
          <InputGroup flexDirection="column" mb="20px">
            <Text>Email</Text>
            <Input
              placeholder="janedoe@example.com"
              onChange={(e) => setFieldValue('email', e.target.value)}
            />
            <Text color="red.400">{errors.email}</Text>
          </InputGroup>

          <InputGroup flexDirection="column" mb="20px">
            <Text>Password</Text>
            <Input
              type="password"
              onChange={(e) => setFieldValue('password', e.target.value)}
            />
            <Text color="red.400">{errors.password}</Text>
          </InputGroup>

          <Text colorScheme="red">{formError}</Text>

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
};

// disallow access to page when user is signed in
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });

  if (session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

export default SignInPage;
