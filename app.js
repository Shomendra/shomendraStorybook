const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// load model

require('./models/User');
require('./models/Story')

//passport config
require('./config/passport')(passport);

// Load routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const  stories = require('./routes/stories')

//load Keys
const keys = require('./config/keys')

//Handlebars Helpers
const {
  truncate,
  stripTags,
  formatDate,
  select,
  editIcon
} = require('./helpers/hbs')

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Method ovride middleware
app.use(methodOverride('_method'));




// Handlebars Middleware
app.engine('handlebars', exphbs({
  helpers: {
     truncate: truncate,
     stripTags: stripTags,
     formatDate : formatDate,
     select: select,
     editIcon: editIcon
  },
  handlebars: allowInsecurePrototypeAccess(Handlebars),
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

// Srt static folder
app.use(express.static(path.join(__dirname, 'public')));


//use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories)


const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`Server started on port ${port}`)
});


