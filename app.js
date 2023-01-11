// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
//
// // const index = require('./routes/index');
// const surveys = require('./routes/surveys');
//
// const port=3000;
//
// const app=express();
//
// //**************SURVEY SET VIEW!!!
// //View Engine
// app.set('view',path.join(__dirname, 'view'));
// app.set('view engine','ejs');
// app.engine('html', require('ejs').renderFile);
//
// //Set static Folder
// app.use(express.static(path.join(__dirname, 'client')));
// //**************SURVEY SET VIEW!!!
// //Body Parser Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
//
// // app.use('/',index)
// app.use('/api',surveys)
// app.listen(port,() => {
//   console.log('Server started on port '+ port );
// });
//
//
//



const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/databaseJS.js');
// Connect to Database
mongoose.connect(
  "mongodb+srv://anela:anela1234!!!@cluster0.pyyvf.mongodb.net/?retryWrites=true&w=majority"
);
// On Connection
mongoose.connection.on('connected', () =>{
  console.log('connected to database '+ config.database);
});
//On Error
mongoose.connection.on('error', (err) =>{
  console.log('Database error '+ err);
});
const app=express();


//
const users = require('./routes/users');
const surveys = require('./routes/surveys');
const user_answers = require('./routes/user_answers');

//Port number
const port=3000;
//CORS Middleware
app.use(cors());
//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


//**************SURVEY SET VIEW!!!
//View Engine
app.set('view',path.join(__dirname, 'view'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

//Set static Folder
app.use(express.static(path.join(__dirname, 'client')));
//**************SURVEY SET VIEW!!!



//Body Parser Middleware
app.use(bodyParser.json());
//Passport Middleware
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true}));
app.use('/api',surveys);
app.use('/api',user_answers);
// app.use('/api',id);
// app.use('/api/surveys/id=',id);
//**************SURVEY SET VIEW!!!
// app.use(bodyParser.urlencoded({extended:false}));

//**************SURVEY SET VIEW!!!
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
//Index route
app.get('/',(req,res)=>{
  res.send('Invalid Endpoint');
});

app.get('*',(req, res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'))
});
//strart server
app.listen(port,() => {
  console.log('Server started on port '+ port );
});
