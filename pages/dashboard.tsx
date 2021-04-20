import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../store/user";
import Head from "next/head";
import PageLayout from "../layout/PageLayout";
import Link from "../components/Link";

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

      <h1 className="text-5xl mb-10">Member Portal</h1>
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
          text="Sign Out"
        />
        .
      </p>
    </PageLayout>
  );
}
