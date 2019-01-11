const express=require('express');
var app=express();
const fs=require('fs');
const hbs=require('hbs');
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{

var now=new Date().toString();
var log=`${now}:${req.method}:${req.url}`;
console.log(log);
fs.appendFile('server.log',log+'\n',(err)=>
{
    if(err){cpnsole.log('Unable to log server.');}
});
next();
});
// app.use((req,res,next)=>{
// res.render('maintenance.hbs');
// });
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>
{
   return new Date().getFullYear()
});
hbs.registerHelper('screamit',(text)=>
{
return text.toUpperCase()
});
app.get('/',(req,res)=>
{
res.render('home.hbs',{
   pageTitle:'home page',
   currentYear:new Date().getFullYear(),
   msg:'welcome'
});
});

app.get('/about',(req,res)=>
{
res.render('about.hbs',{
    pageTitle:"About Year",
    currentYear:new Date().getFullYear()
});
});
app.get('/bad',(req,res)=>
{
res.send({
        errorMessage:'unable to handle message'
    });
});
app.listen(3000,()=>{
 console.log('listening on port 3000');
});