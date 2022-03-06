import { AppProps } from 'next/app';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({});

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default App;
