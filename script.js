const express  = require('express');
const path = require('path');
const app = express(); 
const fs = require('fs'); 


app.set('view engine' , 'ejs'); //for ejs
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//for forms.

app.use(express.static(path.join(__dirname , "public")));
// static files in public dir .





// main code .

app.get('/',function(req,res){
 
fs.readdir(`./files` , function(req,files){
    // console.log(files); // reads the directory files. 
    res.render('index' , {files:files}); // can send anything to views dir or page. sending all the  files to page named files.
}) 
});



app.get('/file/:filename',function(req,res){
// when the file is created , go to that route and read the file in english and render the data , filename onto the show page.
    fs.readFile(`./files/${req.params.filename}`,"utf-8" , function(err,filedata){
     res.render('show' , {filename:req.params.filename , filedata:filedata});
    });
    })  
app.post('/create' , function(req,res){
    // create a route post whenever clicked on readMore with the fileName entered in form and rendering the data entered in the text-area
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details , function(err){
//    console.log(req.body);
   res.redirect("/"); // redirect to initial route after creation of file.
    });
});


    app.post('/delete/:filename' , function(req,res){
        fs.unlink(`./files/${req.params.filename}` , function(err){
            // console.log(`${req.params.filename}`); 
            
            // console.log(req.body.title);
            // console.log(req.body.details);  
            if (err) {
                console.error('Error clearing the file:', err);
                return res.status(500).send('Failed to clear the file');
            }
            // console.log(`File ${filename} cleared successfully`);
            
            
    //    console.log(req.body);
       res.redirect("/"); // redirect to initial route after creation of file.
        });
    });
 // main code ends here 

app.listen(3000);
// initializing server 