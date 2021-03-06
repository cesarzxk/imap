import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";
import { MapProvider } from "../context/MapContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MapProvider>
        <Component {...pageProps} />
      </MapProvider>
    </ChakraProvider>
  );
}

export default MyApp;

reportWebVitals();
