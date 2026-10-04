const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const session =require('express-session');
const mongostore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const user = require('./modules/users.js');

const app = express();
const store = new mongostore({
uri : 'mongodb+srv://seba2:somnrohr@cluster0.pnsklih.mongodb.net/?appName=shop',
collection : 'sessions'
});

const csrf=require('csurf');
app.set('view engine', 'ejs');

const routes = require('./routes/admin.js');
const appshop = require('./routes/shop.js');
const auth = require('./routes/auth.js');
const authcontroller = require('./controllers/auth.js');

const csrfprotection =csrf();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(session({secret :'mysecret', resave:false , saveUninitialized:false , store:store}));
app.use(csrfprotection);

// app.use((req, res, next) => {
//     user.findById('6a980379204666fe7b31c498')
//         .then(user => {
//             req.user = user; 
//             next();
//         })
//         .catch(err => {
//             console.log('Error fetching user:', err);
//             next();
//         });
// });
app.use('/admin', routes.router);
app.use(appshop);
app.use(auth);

app.use((req, res, next) => {
    res.status(404).send('<h1>page does not exist </h1>');
});

const server = http.createServer(app);

mongoose.connect('mongodb+srv://seba2:somnrohr@cluster0.pnsklih.mongodb.net/?appName=shop')
.then(result=>{
    server.listen(3000);
    console.log("✅ connected successfully");
})
.catch(err=>{console.log(err)})