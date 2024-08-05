import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="Discover new recipes based on the ingredients you have at home. Input ingredients and get suggestions from Cookpad."
          />
          <meta name="author" content="nekkuzuria" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
