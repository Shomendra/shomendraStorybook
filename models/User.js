const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create Schema 

const UserSchema = new Schema({
  googleID:{
    type:String,
    require:true
  },
  email:{
    type: String,
    require: true
  },
  firstName:{
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type:String
  }
});

// Create collection and add schema
mongoose.model('users', UserSchema)

