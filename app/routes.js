const app = require('./config')
const { checkAuthentication, checkNotAuthentication } = require('../utils/functions')
const { passport, bcrypt } = require('../dependencies')
const initialize = require('../passport-config')

const users = []

initialize(
    passport,
    email => users.find(user => email === user.email),
    id => users.find(user => user.id === id)
)

app.get("/", checkAuthentication ,(req, res) => {
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
        const hashPassword = await bcrypt.hash(req.body.password, 10)
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
});

app.post("/login",checkNotAuthentication , passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.delete('/logOut', (req, res) => {
    req.logOut({keepSessionInfo:true}, () => {})
    res.redirect('/login')
})

module.exports = app