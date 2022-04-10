import { Center, Container, Divider, Heading, Link } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';
import SignInForm from '@components/SignInForm';

function SignInPage() {
  return (
    <Center>
      <Container mt="8">
        <Heading>Sign In</Heading>
        <Divider my="5" />

        <SignInForm />

        <NextLink href="/sign-up" passHref>
          <Link color="cyan.700" mb="10">
            Don't have an account? Sign Up
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
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

export default SignInPage;
