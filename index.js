const express = require('express');
const cors = require('cors');
const app = express();
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

//console.log("DEBUG: Loading routes/index.js..."); // Debugging

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', routes);

const db = require('./models');
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const PORT = process.env.PORT || 8080;
//console.log("DEBUG: Registered Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(
      `Route: ${Object.keys(middleware.route.methods)
        .join(", ")
        .toUpperCase()} ${middleware.route.path}`
    );
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((nestedRoute) => {
      if (nestedRoute.route) {
        // console.log(
        //   `Route: ${Object.keys(nestedRoute.route.methods)
        //     .join(", ")
        //     .toUpperCase()} ${nestedRoute.route.path}`
        // );
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});
