import { Center, Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";

import Footer from "../containers/Footer";
import Header from "../containers/Header";

import styles from "./Home.module.css";

const Map = dynamic(() => import("../components/Map"), {
  loading: () => (
    <Center h="86vh" w="100vw">
      <Spinner size="xl" color="#0011ff" />
    </Center>
  ),
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>imap</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Header />
        <Map />
      </main>

      <Footer />
    </div>
  );
}
