import * as Yup from 'yup';

const accountCreationSchema = Yup.object({
  email: Yup.string()
    .required('An email is required')
    .email('Not a valid email'),
  name: Yup.string().required('Your name is required'),
  password: Yup.string()
    .required('A password is required')
    .test(
      'length',
      'Password must contain at least 12 characters',
      (v) => v?.length > 12
    )
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[^A-z\s\d][\\\^]?/,
      'Password must contain at least one special character'
    ),
  confirmPassword: Yup.string()
    .required('Confirmation password is required')
    .oneOf(
      [Yup.ref('password'), null],
      'Password and confirm password do not match'
    ),
});

const userCredentialsSchema = Yup.object({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const passwordCreationSchema = Yup.object({
  website: Yup.string().url('Website must be a valid URL').notRequired(),
  login: Yup.string().required('A login is required'),
  password: Yup.string().required('A password is required'),
});

export { accountCreationSchema, userCredentialsSchema, passwordCreationSchema };
