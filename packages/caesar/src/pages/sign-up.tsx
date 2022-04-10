import { Center, Container, Divider, Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import SignUpForm from '@components/SignUpForm';

function SignUpPage() {
  return (
    <Center>
      <Container mt="8">
        <Heading>Sign Up</Heading>
        <Divider my="5" />

        <SignUpForm />

        <NextLink href="/sign-in" passHref>
          <Link color="cyan.700" mb="10">
            Already have an account? Sign In
          </Link>
        </NextLink>
      </Container>
    </Center>
  );
}

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
