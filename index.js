/**
 * This simple app demonstrate the life sycle of a node app and the single thread node's concept.
 */

 const express = require('express'); // require the express framework, dependencie for the project
 const path = require('path'); // require path module.
 
 const app = express(); // set the app const to refer the express itself
 
 app.engine('html', require('ejs').renderFile); // set the html engine to render through ejs.
 app.set('view engine', 'html'); // set the view engine to be html
 app.use('/public', express.static(path.join(__dirname, 'public'))); // configure the public directory that will contain all the static files like css, images, etc.
 app.set('views', path.join(__dirname, '/views')); // configure the path to the views on our project
 
 app.use(express.json()); // to support JSON-encoded bodies
 app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies
 
 var tasks = ["clean the house", "do the vehicle maintenance", "cut the grass"];
 
 
 // configure the first route and render the index.html from the view path
 app.get('/', (req, res)=>{
 
     res.render('index', {tasksList: tasks});
 
 });
 
 // configure the post route to insert new tasks
 app.post('/', (req, res)=>{
 
     tasks.push(req.body.task);
     res.render('index', {tasksList: tasks});
 
 });
 
 // configure the delete task item route
 app.get('/delete/:id', (req, res)=>{
 
     //console.log(req.params.id);
     tasks = tasks.filter(function (val, index) {
         
            if(index != req.params.id){
                 return val;
            }
 
     });
 
     res.redirect('/');
 
 });
 
 app.listen(5000, ()=>{ 
 
     console.log('server running on port: 5000');
 
 }); // create the server with its callback