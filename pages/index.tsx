import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../store/user";
import Head from "next/head";
import PageLayout from "../layout/PageLayout";

export default function Home() {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user?.id) {
      router.push("/login");
    }
  }, []);

  return (
    <PageLayout>
      <Head>
        <title>Decent | Dashboard - Sam Ojling</title>
        <link rel="icon" href="/decent-favicon.png" />
      </Head>

      {!user?.id ? <p>Loading...</p> : <p>Dashboard</p>}
    </PageLayout>
  );
}
