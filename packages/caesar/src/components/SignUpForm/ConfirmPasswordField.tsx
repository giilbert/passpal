import {
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Field, FormikProps } from 'formik';
import { useState } from 'react';

interface SignUpFormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface ConfirmPasswordFieldProps {
  formikProps: FormikProps<SignUpFormValues>;
}

function ConfirmPasswordField({ formikProps }: ConfirmPasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Field name="confirmPassword">
        {({ field }) => (
          <FormControl
            isInvalid={
              formikProps.errors.confirmPassword &&
              formikProps.touched.confirmPassword
            }
            isRequired
            // also margin for above since the MasterPasswordField does not have margin
            my="4"
          >
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <InputGroup>
              <Input
                {...field}
                id="confirmPassword"
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
            <FormErrorMessage>
              {formikProps.errors.confirmPassword}
            </FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </>
  );
}

export default ConfirmPasswordField;
