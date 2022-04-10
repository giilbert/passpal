import {
  Input,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  Button,
  InputRightElement,
} from '@chakra-ui/react';
import { Field, FormikProps } from 'formik';
import { useState } from 'react';

const numberRegex = /[0-9]/;
const specialCharacterRegex = /[^A-z\s\d][\\\^]?/;

interface SignUpFormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface PasswordFieldProps {
  formikProps: FormikProps<SignUpFormValues>;
}

function MasterPasswordField({ formikProps }: PasswordFieldProps) {
  const { values, errors, touched } = formikProps;
  const passwordValue = values.password;

  const [showPassword, setShowPassword] = useState(false);

  const tooShort = passwordValue.length < 12;
  const noNumbers = !numberRegex.exec(passwordValue);
  const noSpecialCharacters = !specialCharacterRegex.exec(passwordValue);

  return (
    <>
      <Field name="password">
        {({ field }) => (
          <FormControl
            isInvalid={errors.password && touched.password}
            isRequired
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
          </FormControl>
        )}
      </Field>

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
}

export default MasterPasswordField;
