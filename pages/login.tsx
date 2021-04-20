import { FormikValues } from "formik";
import { sessionValidationSchema } from "../validation/sessionValidation";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUserStore } from "../store/user";
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

const Login: React.VFC = () => {
  const [error, setError] = useState<string | null>(null);
  const { updateUser } = useUserStore();
  const router = useRouter();

  const onSubmit = async (values: FormikValues) => {
    try {
      const result = await api("/login", values);
      updateUser({ ...result?.user });
      setError(null);
      router.push("/dashboard");
    } catch (err) {
      setError(err?.message);
    }
  };

  return (
    <PageLayout>
      <Head>
        <title>Decent | Login - Sam Ojling</title>
        <link rel="icon" href="/decent-favicon.png" />
      </Head>
      <h1 className="text-5xl mb-10 text-primary">Sign In</h1>
      <Form
        handleSubmit={onSubmit}
        initalValues={initalValues}
        validationSchema={sessionValidationSchema}
        render={(errors, touched, handleChange) => (
          <>
            {error && <ServerError message={error} />}
            <TextField
              type="email"
              name="email"
              placeholder="Email"
              label="Email"
              isInvalid={touched.email && errors.email}
              handleChange={handleChange}
              errorMessage={errors.email}
            />

            <TextField
              type="password"
              name="password"
              placeholder="Password"
              label="Password"
              isInvalid={touched.password && errors.password}
              errorMessage={errors.password}
              handleChange={handleChange}
              helperText={
                <p>
                  Can't remember?{" "}
                  <Link path="/" styleAs="link" text="Let's reset it" />.
                </p>
              }
            />

            <Button>Let me in</Button>
          </>
        )}
      />
    </PageLayout>
  );
};

export default Login;
