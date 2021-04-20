import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../store/user";
import Head from "next/head";
import PageLayout from "../layout/PageLayout";
import Link from "../components/Link";

export default function Home() {
  const router = useRouter();
  const { user } = useUserStore();

  // useEffect(() => {
  //   if (!user?.id) {
  //     router.push("/login");
  //   }
  // }, []);

  return !user?.id ? (
    <PageLayout center>
      <p>Loading</p>
    </PageLayout>
  ) : (
    <PageLayout>
      <Head>
        <title>Decent | Dashboard - Sam Ojling</title>
        <link rel="icon" href="/decent-favicon.png" />
      </Head>

      <h1 className="text-5xl mb-10">Member Portal</h1>
      <p>
        Hi {user?.email} you're in! Unless you want to{" "}
        <Link path="/" styleAs="link" text="Sign Out" />.
      </p>
    </PageLayout>
  );
}