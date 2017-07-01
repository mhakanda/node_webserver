const express = require('express');
const hbs = require('hbs');
var app = express();
var fs = require('fs')
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
var now = new Date().toString();
var log = (`${now}:${req.method} and ${req.url}`);
fs.appendFile('server.log',log+'\n',(err)=>{
  if (err){
    console.log('Error occured');
  }
})
  next();
});
app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});
app.use(express.static(__dirname+'/public'));
//middleware  and static asset, no need to routing
//console.log('Server Started');
app.get('/',(req,res)=>{
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    currentY: new Date().getFullYear(),
    welcomeM: 'Welcome to the cat land'
  });
  });
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentY: new Date().getFullYear()
  });
});
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Nothing found',

  })
});

app.listen(3000,()=>{
  console.log('Server has started on Port 3000');
});
