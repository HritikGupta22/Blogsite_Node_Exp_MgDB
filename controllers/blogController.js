const Blog = require('../models/blogs');

const blog_index = (req,res)=>{
    Blog.find().sort( {createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'All Blogs',blogs : result});
    })
    .catch((err)=>{
        console.log(err);
    });
}

const blog_create_post = (req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
    .then(()=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    })

}


const blog_create_get = (req,res)=>{
    res.render('create',{title:'Create ur blog'});
}

const blog_details = (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('details',{title:'Blog Details',blog:result});
    })
    .catch((err)=>{
        
        res.status(404).render('404' , {title:'4O4'});
    
    });
}


const blog_delete = (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/blogs'});
    })
    .catch((err)=>console.log(err));

}

module.exports = {
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_details,
    blog_delete
}
