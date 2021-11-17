const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const render = require("express-react-views");
const bodyParser = require("body-parser");
const { AppConfigurationClient } = require("@azure/app-configuration");
const port = process.env.PORT || 3000;

/*
const getConfigurationSetting = async (keyName) => {
  try {
    if (!process.env.production) {
      require("dotenv").config();
      console.log("debug environment");
    }

    const connectionString = "";
    console.log(connectionString);
    const appConfigClient = new AppConfigurationClient(connectionString);

    console.log(`Getting key ${keyName}`);

    const result = await appConfigClient.getConfigurationSetting({key: keyName});
    return result.value;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};
*/

// fn to create express server
const server = async () => {
  // server
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.set("views", path.join(__dirname, "./views"));
  app.set("view engine", "jsx");
  app.engine("jsx", render.createEngine({ beautify: true }));

  app.get("/", async (req, res) => {
    const beta = await getConfigurationSetting("beta");
    const props = {
      beta,
    };
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
