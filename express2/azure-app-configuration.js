const { AppConfigurationClient } = require("@azure/app-configuration");

//if (!process.env.production) {
//  require("dotenv").config();
//  console.log("debug environment");
//}

//const connectionString = process.env["APPCONFIG_CONNECTION_STRING"];
const connectionString = "";
console.log(connectionString)
const client = new AppConfigurationClient(connectionString);

const getConfigurationSetting = async (keyName) => {

  try {

    //const connectionString = "";
    //const appConfigClient = new AppConfigurationClient(connectionString);
    
    return client.getConfigurationSetting({key: "AppTitle"}).then(result =>{
        console.log(result);
        return result.value;
      }).catch(ex =>{
        console.log(ex);
      });

  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

module.exports = {
  getConfigurationSetting,
};
