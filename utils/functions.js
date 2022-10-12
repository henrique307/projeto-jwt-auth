
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

module.exports = { checkAuthentication, checkNotAuthentication }