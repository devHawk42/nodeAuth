const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req,res,next) => {
    res.render('index');
});

//Signup
router.get('/signup', (req, res, next) => {
    res.render('signup')
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

//Login
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/signin', (req, res, next) => {
    res.render('signin')
});

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/')
})

router.use((req, res , next) => {
    isAuthenticated(req, res, next);
    next();
});

//profile
router.get('/profile', (req, res, next) => {
    res.render('profile');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

module.exports = router;