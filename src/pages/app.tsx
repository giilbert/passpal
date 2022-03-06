import Navbar from '@components/Navbar';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

function AppPage() {
  return (
    <>
      <Navbar />
    </>
  );
}

// disallow access to page when user is NOT signed in
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });

  if (!session)
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
      props: {},
    };

  return {
    props: {
      session,
    },
  };
};

export default AppPage;
