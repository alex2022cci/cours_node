const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtsecret = 'secretABCD1234';

exports.register = async (req, res, next) => {
    const { username, password } = req.body;
    if (password.length < 6) {
        return res.status(400).json({
            message: '6 caractères minimum pour le mot de passe'
        });
    };
    bcrypt.hash(password, 10)
        .then(asynch(hash) =>
            {
                await User.create({
                    username,
                    password: hash
                })
                    .then((User) => {
                        const maxAge = 3 * 60 * 60; // 3h
                        const token = jwt.signing({ id: User._id, username, role: User.role }, jwtsecret, { expiresIn: maxAge });
                        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                        res.status(201).json({
                            message: 'Utilisateur créé',
                            user: User._id, role: User.role
                        })
                    })
            })
        .catch((err) => {
            res.status(400).json({
                message: 'Erreur lors de la création de l\'utilisateur',
                error: err.message,
            })
        })
};


            exports.login = async (req, res, next) => {

            };

            exports.update = async (req, res, next) => {

            };

            exports.delete = async (req, res, next) => {
            };

            exports.getUsers = async (req, res, next) => {
            };

