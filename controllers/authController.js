// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postRegister = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(
            password, 12
        );
        await User.create(username, hashedPassword);
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.render('register', {
            error: 'Erro ao registrar usuário'
        });
    }
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.render('login', {
                error: 'Login inválido'
            });
        }
        const isMatch = await bcrypt.compare(
            password, user.password
        );
        if (isMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(() => {
                res.redirect('/dashboard');
            });
        }
        res.render('login', {
            error: 'Login inválido'
        });
    } catch (err) {
        console.error(err);
        res.render('login', {
            error: 'Ocorreu um erro'
        });
    }
};

exports.getDashboard = (req, res) => {
    if (req.session.isLoggedIn) {
        res.render('dashboard', { username: req.session.user.username });
    } else {
        res.redirect('/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
};
