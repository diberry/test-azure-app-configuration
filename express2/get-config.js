const {getConfigurationSetting} = require('./azure-app-configuration');

getConfigurationSetting('beta').then((result)=>{
    console.log(result)
}).catch((ex)=>{
    console.log(ex);
})