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

const initalValues = {
  email: "",
  password: "",
};

const Signup: React.VFC = () => {
  const [error, setError] = useState<string | null>(null);
  const { updateUser } = useUserStore();
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
              label="Email"
              isInvalid={touched.email && errors.email}
              errorMessage={errors.email}
            />

            <TextField
              type="password"
              name="password"
              placeholder="Password"
              label="Password"
              isInvalid={touched.password && errors.password}
              errorMessage={errors.password}
            />

            <Button>Sign up</Button>
          </>
        )}
      />
    </PageLayout>
  );
};

export default Signup;
