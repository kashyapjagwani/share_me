import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Share Me</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
