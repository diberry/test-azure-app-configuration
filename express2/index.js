const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const render = require("express-react-views");
const bodyParser = require("body-parser");
const {getConfigurationSetting} = require('./azure-app-configuration')
const port = process.env.PORT || 3000;

// fn to create express server
const server = async () => {

  // server
  const app = express();

  // middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.set("views", path.join(__dirname, "./views"));
  app.set("view engine", "jsx");
  app.engine("jsx", render.createEngine({ beautify: true }));

  // root route
  app.get("/", async (req, res) => {

    // get feature flag
    const beta = await getConfigurationSetting("beta");

    // configure props
    const props = {
      beta: (beta && beta.toLowerCase() == "true") ? true : false,
    };
    console.log(props);

    // render navigation with or without "beta" feature available
    res.render("index", props);
  });

  return app;
};

server()
  .then((app) => {
    app.listen(port, () => {
      console.log(`Server has started on port ${port}!`);
    });
  })
  .catch((err) => console.log(err));
