const User = require('../modules/users');
const crypt = require('bcryptjs');

//log in 
exports.getlogin=(req,res,next)=>{
console.log(req.session.logedin);
res.render('auth/login',{
 isauthenticated:req.session.logedin,
 user:req.session.user,
 csrftoken: req.csrfToken()
});

}
exports.postlogin = (req, res, next) => {
    const email = req.body.Email;
    const password = req.body.password;
    
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log(' User not found');
                return res.redirect('/sign-up');
            }
            
            return crypt.compare(password, user.password)
                .then(match => {
                    if (!match) {
                        console.log('❌ Password incorrect');
                        return res.redirect('/log-in');
                    }
                    
                    req.session.logedin = true;
                    req.session.user = {
                        _id: user._id.toString(),  
                        email: user.email,
                        name: user.name || user.email
                    };
                    
                    return req.session.save(() => {
                        console.log('✅ User logged in:', user.email);
                        res.redirect('/admin/admin-products');
                    });
                });
        })
        .catch(err => {
            console.log('❌ Error:', err);
            res.redirect('/log-in');
        });
};

//log out 
exports.postlogout=(req,res,next)=>{
    req.session.destroy(err=>{
        console.log(err);
    })
res.redirect('/');
}



// sign up 
exports.getsignup=(req,res,next)=>{
    res.render('auth/signup',{csrftoken: req.csrfToken()});
}
exports.postsignup=(req,res,next)=>{
    const email= req.body.Email;
    const password=req.body.password;
    User.findOne({email:email}).then()
    .then(userdoc=>{
        if(userdoc){
            return res.redirect('/');
        }
         return crypt.hash(password,6).then(hashedpassword=>{
        const user = new User({
                email:email,
                password:hashedpassword,
                cart: {items:[]}
            });
           return user.save();
    })
    .then(result=>{
        res.redirect('/log-in');
    })
    })
    .catch(err=>{console.log(err)})
}