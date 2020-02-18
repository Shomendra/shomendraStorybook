if(process.env.NODE_ENV === 'production'){
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}



// module.exports = {

//   mongoURI: 'mongodb+srv://storybookp:shomendra@cluster0-ox5ya.mongodb.net/test?retryWrites=true&w=majority',
//   googleClientID: '290734536306-sdrsf37sksh37jj27nhkbjnrtvemt5tb.apps.googleusercontent.com',
//   googleClientSecret:'v66uaTp_uIKpvFDfegOW94aA'

// }

