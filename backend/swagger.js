const swaggerAutoGen = require("swagger-autogen")({ openapi: "3.0.0" });
const doc = {
  info: {
    title: "    RestFul NE",
    description: "API Docs for restful NE",
  },
  servers: [
    {
      url: "http://localhost:3450",
      description: "Localhost",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "'NE' auth",
    },
    {
      name: "Books",
      description: "Library Management system",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginDto: {
        email: "",
        password: "",
      },
      SignUpDto: {
        lastName: "",
        firstName: "",
        email: "",
        password: "",
      },
      CreateBookDto: {
        name: '',
        author: '',
        publisher: '',
        publicationYear: '',
        subject: '',
      }
    },
  },
  host: "http://localhost:3450",
};

const routes = ["./baseRouter.js"];
swaggerAutoGen("./swagger.json", routes, doc);