import { FormikValues } from "formik";
import { sessionValidationSchema } from "../validation/sessionValidation";
import { useRouter } from "next/router";
import { useState } from "react";
import api from "../utils/api";
import Button from "../components/Button";
import Form from "../components/Form";
import Head from "next/head";
import ServerError from "../components/ServerError";
import TextField from "../components/TextField";
import PageLayout from "../layout/PageLayout";
import Link from "../components/Link";

const initalValues = {
  email: "",
  password: "",
};

const Signup: React.VFC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (values: FormikValues) => {
    try {
      const result = await api("/sign-up", values);
      setError(null);
      router.push("/");
    } catch (err) {
      setError(err?.message);
    }
  };

  return (
    <PageLayout>
      <Head>
        <title>Decent | Sign up - Sam Ojling</title>
        <link rel="icon" href="/decent-favicon.png" />
      </Head>
      <h1 className="text-5xl mb-10">Sign Up</h1>
      <Form
        handleSubmit={onSubmit}
        initalValues={initalValues}
        validationSchema={sessionValidationSchema}
        render={(errors, touched) => (
          <>
            {error && <ServerError message={error} />}
            <TextField
              type="email"
              name="email"
              placeholder="Email"
              label="What is your email address?"
              isInvalid={touched.email && errors.email}
              errorMessage={errors.email}
            />

            <TextField
              type="password"
              name="password"
              placeholder="Password"
              label="Please create a strong password:"
              isInvalid={touched.password && errors.password}
              errorMessage={errors.password}
            />

            <span className="mt-4 mb-2 block">
              <Button>Create my account</Button>
            </span>
            <p>
              Not ready yet? <Link path="/" styleAs="link" text="Cancel" />.
            </p>
          </>
        )}
      />
    </PageLayout>
  );
};

export default Signup;
