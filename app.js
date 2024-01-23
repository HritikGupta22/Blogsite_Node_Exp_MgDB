//ejs veiws- when as parameter use it
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

//mongodb connection
const DBURL = "mongodb+srv://persondb:test1234@cluster0.nnoz5vy.mongodb.net/databaseofblogs?retryWrites=true&w=majority";
// mongoose.connect(DBURL,{serverSelectionTimeoutMS: 30000})
//     .then((result)=>console.log('connected to db'))
//     .catch((err)=>console.log(err));
async function connectToDatabase() {
    try {
        await mongoose.connect(DBURL, {serverSelectionTimeoutMS: 30000});
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}
connectToDatabase();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true})); // for encoded data from form.

app.listen(3000,(err)=>{
    if(!err) console.log("Server is running on port 3000");
});

//middleware for static files like css files make in public
app.use(express.static('public'));

app.get('/',(req,res)=>{

    res.redirect('/blogs');
})

app.get('/about',(req,res)=>{
   res.render('about',{title:'AboutUS'});
})

app.use('/blogs',blogRoutes);

//middleware
app.use((req,res)=>{
    res.status(404).render('404' , {title:'4O4'});
});
