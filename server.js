if(process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const dependencies = require('./dependencies')
const express = dependencies.express

dependencies.initialize(
    dependencies.passport,
    email => users.find(user => email === user.email),
    id => users.find(user => user.id === id)
)

const app = dependencies.express();

app.set("view-engine", "ejs");
app.use(express.urlencoded({extended: true}))
app.use(dependencies.flash())
app.use(dependencies.MOR('_method'))
app.use(dependencies.session({
    secret: "sd8fg9s9df8gs9dfg",
    /**
     * the default would be storing this in a enviroment variable,
     * but i figured it would be just easier to store the "secret"
     * like this since im not really gonna use this authentication
     * sistem.
     */
    resave:false,
    saveUninitialized:false
}))
app.use(dependencies.passport.initialize())
app.use(dependencies.passport.session())

const users = []

function checkAuthentication(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}


function checkNotAuthentication(req, res, next) {
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    
    next()
}

app.get("/", checkAuthentication ,(req, res) => {
    console.log(req.user)
	res.render('index.ejs', {...req.user});
});

app.get("/login",checkNotAuthentication , (req, res) => {
	res.render('login.ejs');
});

app.get("/register",checkNotAuthentication , (req, res) => {
	res.render('register.ejs');
});

app.post("/register",checkNotAuthentication , async (req, res) => {
    try {
        const hashPassword = await dependencies.bcrypt.hash(req.body.password, 10)
        users.push({
            "id": Date.now().toString(),
            "name": req.body.name,
            "email": req.body.email,
            "password": hashPassword
        })
        res.redirect("/login")
    } catch(e) {
        throw new Error(e)
    }
    console.log(users)
});

app.post("/login",checkNotAuthentication , dependencies.passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.delete('/logOut', (req, res) => {
    req.logOut({keepSessionInfo:true}, () => {})
    res.redirect('/login')
})

app.listen(3000);
