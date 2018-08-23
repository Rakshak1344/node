const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//----------------------------------------------------------------------------------
var app = express(); //express here w'll be defined in var called app
app.set('view engine','hbs');

//---------------------Middleware-----------------------------------------------------
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =  `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n');
   next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
//     next();
// });

//------------------------------hbs------------------------------------------------
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});


//-----------------------------------------------------------------------------------
// app.use(express.static(__dirname + '/public'));

app.get(`/`,(req,res)=>{
   // res.send('<h2>Hello Express!!</h2>');
// res.send({
//     name: 'Rakshith',
//     likes: [
//         'Computers',
//         'AI'
//     ]
// });
res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage: 'HELLO welcome to Website'
    // currentYear: new Date().getFullYear() ===>(getCurrentYear)
    });
});

app.get('/about',(req,res)=>{
    // res.send('About Pages');
    res.render('about.hbs',{
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear() ===>(screamIt)
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        error:'unable to handel request'
    });
});

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});