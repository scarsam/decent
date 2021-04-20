import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../store/user";
import Head from "next/head";
import PageLayout from "../layout/PageLayout";
import Link from "../components/Link";

export default function Home() {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (user?.id) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <PageLayout center>
      <Head>
        <title>Decent | Sam Ojling</title>
        <link rel="icon" href="/decent-favicon.png" />
      </Head>

      <h1 className="text-4xl md:text-5xl mb-10 text-center italic font-semibold text-primary">
        Decent Healthcare for <span className="lg:block">Tech Freelancers</span>
      </h1>
      <Link size="large" path="/sign-up" styleAs="button" text="Sign Up" />
      <p className="mt-2 mb-16">
        Already have an account?{" "}
        <Link path="/login" styleAs="link" text="Sign In" />
      </p>
      <Link
        size="regular"
        path="https://www.decent.com/"
        styleAs="button"
        text="Join our Telegram"
      />
      <ul className="flex uppercase divide-x-2 divide-gray-600 text-md align-middle mt-8">
        <li className="px-2">
          <Link
            path="https://www.decent.com/about-us"
            styleAs="link"
            text="About us"
          />
        </li>
        <li className="px-2">
          <Link
            path="https://www.decent.com/blog/all-posts"
            styleAs="link"
            text="News"
          />
        </li>
        <li className="px-2">
          <Link path="https://decent.breezy.hr/" styleAs="link" text="Jobs" />
        </li>
        <li className="px-2">
          <Link
            path="https://www.decent.com/faq"
            styleAs="link"
            text="Contact us"
          />
        </li>
      </ul>
    </PageLayout>
  );
}
