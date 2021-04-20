import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../store/user";
import Head from "next/head";
import PageLayout from "../layout/PageLayout";
import Link from "../components/Link";
import Notification from "../components/Notification";

export default function Home() {
  const router = useRouter();
  const { user, updateUser } = useUserStore();

  useEffect(() => {
    if (!user?.email) {
      router.push("/login");
    }
  }, []);

  return !user?.email ? (
    <PageLayout center>
      <p>Loading</p>
    </PageLayout>
  ) : (
    <PageLayout>
      <Head>
        <title>Decent | Dashboard - Sam Ojling</title>
        <link rel="icon" href="/decent-favicon.png" />
      </Head>
      <h1 className="text-5xl mb-10 text-primary">Member Portal</h1>
      <Notification message="Yay! Welcome to Decent!" autoDeleteTime={5000} />
      <p>
        Hi {user?.email} you're in! Unless you want to{" "}
        <Link
          onClick={() =>
            updateUser({
              email: "",
              password: "",
            })
          }
          path="/"
          styleAs="link"
          content="Sign Out"
        />
        .
      </p>
    </PageLayout>
  );
}
