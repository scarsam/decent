import { createServer, Response } from "miragejs";

export const makeServer = () => {
  return createServer({
    routes() {
      this.post("/login", (_, request) => {
        let user = JSON.parse(request.requestBody);

        if (user.email !== "sam@ojling.com" && user.password !== "Password1") {
          return new Response(
            403,
            {},
            "Oops! Either your email or password was incorrect. Please try again!",
          );
        }

        return { user };
      });

      this.post("/signup", (_, request) => {
        let user = JSON.parse(request.requestBody);

        return { user };
      });

      this.passthrough();
    },
  });
};
