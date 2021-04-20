import { createServer, Response } from "miragejs";

export const makeServer = () => {
  return createServer({
    routes() {
      this.post("/login", (_, request) => {
        let user = JSON.parse(request.requestBody);

        if (user.password !== "Password123") {
          return new Response(
            403,
            { some: "header" },
            {
              errors: [
                "Oops! Either your email or password was incorrect. Please try again!",
              ],
            },
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
