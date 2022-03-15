import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
} from '@chakra-ui/react';
import { accountCreationSchema } from '@utils/patterns';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import ConfirmPasswordField from './ConfirmPasswordField';
import MasterPasswordField from './MasterPasswordField';

const SignUpForm = () => {
  const [formErrors, setFormErrors] = useState('');

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
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
        {(formikProps) => (
          <Form>
            <Field name="name">
              {({ field }) => (
                <FormControl
                  isInvalid={
                    formikProps.errors.name && formikProps.touched.name
                  }
                  isRequired
                  mb="4"
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input {...field} id="name" />
                  <FormErrorMessage>{formikProps.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="email">
              {({ field }) => (
                <FormControl
                  isInvalid={
                    formikProps.errors.email && formikProps.touched.email
                  }
                  isRequired
                  mb="4"
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" />
                  <FormErrorMessage>
                    {formikProps.errors.email}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <MasterPasswordField formikProps={formikProps} />
            <ConfirmPasswordField formikProps={formikProps} />

            <Button
              type="submit"
              colorScheme="blue"
              onClick={() => formikProps.submitForm()}
              isLoading={formikProps.isSubmitting}
              mb="2"
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>

      <Text color="red.400">{formErrors}</Text>
    </>
  );
};

export default SignUpForm;
