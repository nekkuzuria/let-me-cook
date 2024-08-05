import IndexPage from "../pages/home";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Let Me Cook</title>
        <meta
          name="description"
          content="Discover new recipes based on the ingredients you have at home. Input ingredients and get suggestions from Cookpad."
        />
        <meta name="author" content="nekkuzuria" />
      </Head>
      <IndexPage />
    </>
  );
}
