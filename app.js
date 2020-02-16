const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// load user mode

require('./models/User');

//passport config
require('./config/passport')(passport);

// Load routes
const index = require('./routes/index');
const auth = require('./routes/auth');

//load Keys
const keys = require('./config/keys')

//Map global promises
mongoose.Promise = global.Promise;

// Mongoose connect
mongoose.connect(keys.mongoURI, {
   useUnifiedTopology:true,
   useNewUrlParser:true
})
   .then(()=> console.log('MongoDB Connected'))
   .catch(err => console.log(err));

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized:false
}));

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// set global vars
app.use((req, res, next)=>{
 res.locals.user = req.user || null ;
 next();
})


//use Routes
app.use('/', index);
app.use('/auth', auth);


const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`Server started on port ${port}`)
});


