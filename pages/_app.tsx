import TopBar from "../layout/TopBar";
import Container from "../layout/Container";
import Layout from "../layout/Layout";
import UserProviderWrapper from "../store/user";
import { makeServer } from "../utils/server";
import "../styles/globals.css";

// This should not run in product - only for testing / development
makeServer();

function MyApp({ Component, pageProps }) {
  return (
    <UserProviderWrapper>
      <Layout>
        <Container>
          <TopBar />
        </Container>
        <Container height>
          <Component {...pageProps} />
        </Container>
      </Layout>
    </UserProviderWrapper>
  );
}

export default MyApp;
