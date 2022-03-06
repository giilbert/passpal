import {
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  Heading,
  Input,
  InputGroup,
  Text,
  Link,
} from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik, FormikProps } from 'formik';
import NextLink from 'next/link';
import { createContext, useContext, useState } from 'react';
import { accountCreationSchema } from '@utils/patterns';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const formContext = createContext<FormikProps<FormValues>>(null);

interface FormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

function SignUpPage() {
  return (
    <Center>
      <Container mt="8">
        <Heading>Sign Up</Heading>
        <Divider my="5" />
        <SignUpForm />

        <NextLink href="/sign-in" passHref>
          <Link color="cyan.700">Already have an account? Sign In</Link>
        </NextLink>
      </Container>
    </Center>
  );
}

const SignUpForm = () => {
  const [formErrors, setFormErrors] = useState('');

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={accountCreationSchema}
        onSubmit={async (values, formikHelpers) => {
          formikHelpers.setSubmitting(true);
          const res = await axios.post('/api/auth/sign-up', values);
          formikHelpers.setSubmitting(true);

          if (res.status === 200) {
            window.location.href = '/sign-in';
          } else if (res.status === 400) {
            setFormErrors('Malformed fields.');
          } else {
            setFormErrors('Something went wrong.');
          }
        }}
      >
        {(formHelpers: FormikProps<FormValues>) => (
          <Form>
            <formContext.Provider value={formHelpers}>
              <FormField
                name="name"
                displayName="Name"
                placeholder="John Doe"
              />

              <FormField
                name="email"
                displayName="Email"
                placeholder="johndoe@example.com"
              />

              <PasswordField {...formHelpers} />

              <FormField
                name="confirmPassword"
                displayName="Confirm Master Password"
              />

              <Button
                type="submit"
                colorScheme="blue"
                onClick={() => {
                  formHelpers.submitForm();
                }}
                isLoading={formHelpers.isSubmitting}
                mb="2"
              >
                Sign Up
              </Button>
            </formContext.Provider>
          </Form>
        )}
      </Formik>

      <Text color="red.400">{formErrors}</Text>
    </>
  );
};

interface FormFieldProps {
  name: string;
  displayName: string;
  placeholder?: string;
}

const FormField = ({ name, displayName, placeholder = '' }: FormFieldProps) => {
  const { setFieldValue, errors } = useContext(formContext);

  return (
    <InputGroup flexDirection="column" my="4">
      <Text>{displayName}</Text>
      <Input
        placeholder={placeholder}
        onChange={(e) => setFieldValue(name, e.target.value)}
        type={
          name === 'password' || name === 'confirmPassword' ? 'password' : name
        }
      />
      <Text color="red.500">{errors[name]}</Text>
    </InputGroup>
  );
};

const numberRegex = /[0-9]/;
const specialCharacterRegex = /[^A-z\s\d][\\\^]?/;

const PasswordField = ({
  values,
  setFieldValue,
  errors,
}: FormikProps<FormValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordValue = values['password'];

  const tooShort = passwordValue.length < 12;
  const noNumbers = !numberRegex.exec(passwordValue);
  const noSpecialCharacters = !specialCharacterRegex.exec(passwordValue);

  return (
    <>
      <InputGroup flexDirection="column" my="4">
        <Text>Password</Text>
        <Input
          onChange={(e) => setFieldValue('password', e.target.value)}
          type={showPassword ? 'text' : 'password'}
        />
        {errors['password']}
        <Checkbox onChange={() => setShowPassword(!showPassword)}>
          Show
        </Checkbox>
      </InputGroup>

      {(tooShort || noNumbers || noSpecialCharacters) && (
        <Text>
          Password must: <br />
        </Text>
      )}
      {tooShort && (
        <Text textColor="red.500">- Be at least 12 characters long</Text>
      )}
      {noNumbers && (
        <Text textColor="red.500">- Contain at least 1 number</Text>
      )}
      {noSpecialCharacters && (
        <Text textColor="red.500">- Contain at least 1 special character</Text>
      )}
    </>
  );
};

// disallow access to page when user is signed in
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });

  if (session)
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
      props: {},
    };

  return {
    props: {},
  };
};

export default SignUpPage;
