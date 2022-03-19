import { Box, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import MasterPasswordPrompt from '@components/MasterPasswordPrompt';
import Navbar from '@components/Navbar';
import PasswordsDisplay from '@components/PasswordsDisplay';
import SidePasswordDisplay from '@components/SidePasswordDisplay';
import { DecryptedPassword } from '@utils/types/DecryptedPassword';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

type SetState<T> = Dispatch<SetStateAction<T>>;

interface PageContextValue {
  sidePasswordDisplay: DecryptedPassword;
  setSidePasswordDisplay: SetState<DecryptedPassword>;
}

const PageContext = createContext<PageContextValue>(null);

function AppPage() {
  const isLargeScreen = useBreakpointValue({
    base: false,
    md: true,
  });

  const [sidePasswordDisplay, setSidePasswordDisplay] =
    useState<DecryptedPassword>();

  return (
    <>
      <Navbar />
      <MasterPasswordPrompt />

      <PageContext.Provider
        value={{
          sidePasswordDisplay,
          setSidePasswordDisplay,
        }}
      >
        {/* three column layout (for big screens) and single column layout (small screens) */}
        {isLargeScreen ? <DesktopPageLayout /> : <MobilePageLayout />}
      </PageContext.Provider>
    </>
  );
}

const DesktopPageLayout = () => (
  <Grid templateColumns="5fr 3fr" gap="3" ml="32" mr="3" mt="3">
    <GridItem w="100%">
      <PasswordsDisplay
        passwords={[
          { name: 'name1', login: 'login1', password: 'password123' },
          { name: 'name2', login: 'login2', password: 'password123' },
          { name: 'name3', login: 'login3', password: 'password123' },
          { name: 'name4', login: 'login4', password: 'password123' },
        ]}
      />
    </GridItem>
    <GridItem w="100%">
      <SidePasswordDisplay />
    </GridItem>
  </Grid>
);

const MobilePageLayout = () => (
  <>
    <Box ml="20" pr="3" pt="3">
      <PasswordsDisplay
        passwords={[
          { name: 'name1', login: 'login1', password: 'password123' },
          { name: 'name2', login: 'login2', password: 'password123' },
          { name: 'name3', login: 'login3', password: 'password123' },
          { name: 'name4', login: 'login4', password: 'password123' },
        ]}
      />
    </Box>

    <SidePasswordDisplay />
  </>
);

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
export { PageContext };
