const routes = require("express").Router();
const temples = require("./temple"); // Ensure this matches the actual file name

//console.log("DEBUG: Mounting /temples routes...");
routes.use("/temples", temples); // Register all the routes from `temple.js` under /temples

// Print all routes for debugging
//console.log("DEBUG: Checking routes in index.js...");
routes.stack.forEach((r) => {
  //console.log(r.route ? r.route.path : "No route found");
});

// Register the documentation route last
routes.use("/", (req, res) => {
  //console.log("DEBUG: Documentation route hit!");
  let docData = {
    documentationURL: "https://nathanbirch.github.io/nathan-byui-api-docs",
  };
  res.send(docData);
});

module.exports = routes;
