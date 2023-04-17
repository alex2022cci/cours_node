const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtsecret = 'secretABCD1234';

exports.register = async (req, res, next) => { // Création d'un nouvel utilisateur
    const {username, password} = req.body; // Récupération des données du formulaire
    if(password.length < 6) { // Vérification de la longueur du mot de passe
        return res.status(400).json({ // Si le mot de passe est inférieur à 6 caractères, on renvoie une erreur
            message: 'Le mot de passe doit contenir au moins 6 caractères.'
        }); // On renvoie une erreur
    }
    bcrypt.hash(password, 10).then(async (hash) => { // On hash le mot de passe
        await User.create({ // On crée l'utilisateur
            username, 
            password:hash // On stocke le hash du mot de passe
        })
        .then((User) => { // Si l'utilisateur est créé avec succès
            const maxAge = 3*60*60; // Durée de vie du token
            const token = jwt.signing({id: User._id, username, role: User.role}, jwtsecret, {expiresIn: maxAge}); // Création du token
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000}); // On stocke le token dans un cookie
            res.status(201).json({ // On renvoie un message de succès
                message: 'Utilisateur créé avec succès.', // Message de succès
                user: User._id, role: User.role, // On renvoie l'id de l'utilisateur et son rôle
            });
        })
        .catch((error) => { // Si l'utilisateur n'a pas pu être créé
            res.status(400).json({ // On renvoie une erreur
                message: 'L\'utilisateur existe déjà.', // Message d'erreur
                error: error.message, // Message d'erreur
            })
        });
    });
};

// on vérifie 
            exports.login = async (req, res, next) => {
                const {username, password} = req.body; // Récupération des données du formulaire
                if(!username || !password)
                {
                    return res.status(400).json({ // Si le mot de passe est incorrect, on renvoie une erreur
                        message: 'Veuillez saisir un nom d\'utilisateur et un mot de passe.'
                    }); // On renvoie une erreur
                }
                try {
                    const user = await User.findOne({username});
                    if(!user){
                        res.status(400).json({
                            message: 'L\'utilisateur n\'existe pas.',
                            error: error.message, // Message d'erreur
                        });
                    }
                    else {
                        bcrypt.compare(password, user.password).then( function (result)  { // On compare le mot de passe
                            if(result) {
                                const maxAge = 3*60*60; // Durée de vie du token
                                const token = jwt.signing({id: user._id, username, role: user.role}, jwtsecret, {expiresIn: maxAge}); // Création du token
                             
                              }
                              else {
                                res.status(400).json({
                                    message: "Votre identifiant est incorrect",
                                    error: error.message, // Message d'erreur
                                });
                              }
                            });
                        }
                } catch (err) {
                     res.status(400).json({ // Si le mot de passe est incorrect, on renvoie une erreur
                        message: 'une erreur est survenue',
                        error: err.message, // Message d'erreur
                    })
                }
            };

            exports.update = async (req, res, next) => {
                const { role, id } = req.body;
                // Verifying if role and id is presnt
                if (role && id) {
                  // Verifying if the value of role is admin
                  if (role === "admin") {
                    // Finds the user with the id
                    await User.findById(id)
                      .then((user) => {
                        // Verifies the user is not an admin
                        if (user.role !== "admin") {
                          user.role = role;
                          user.save((err) => {
                            //Monogodb error checker
                            if (err) {
                              return res
                                .status("400")
                                .json({ message: "An error occurred", error: err.message });
                              process.exit(1);
                            }
                            res.status("201").json({ message: "Update successful", user });
                          });
                        } else {
                          res.status(400).json({ message: "User is already an Admin" });
                        }
                      })
                      .catch((error) => {
                        res
                          .status(400)
                          .json({ message: "An error occurred", error: error.message });
                      });
                  } else {
                    res.status(400).json({
                      message: "Role is not admin",
                    });
                  }
                } else {
                  res.status(400).json({ message: "Role or Id not present" });
                }
              };
        
            exports.delete = async (req, res, next) => {
                const {id} = req.body;
                await User.findById(id)
                    .then((user) => {
                        user.remove();
                    })
                    .then(() => {
                        res.status(200).json({ 
                            message: "User effacé avec succès",
                            
                        });
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: "Une erreur est survenue",
                            error: err.message,
                        })

                    } );

                /*await User.findByIdAndDelete(req.params.id)
                    .then((user) => {
                        res.status(200).json({ message: "User deleted", user: user });
                    }
                    )
                    .catch((err) =>
                        res.status(401).json({ message: "Not successful", error: err.message })
                    );*/
            };

            exports.getUsers = async (req, res, next) => {
                await User.find({})
                  .then((users) => {
                    const userFunction = users.map((user) => {
                      const container = {};
                      container.username = user.username;
                      container.role = user.role;
                      container.id = user._id;
              
                      return container;
                    });
                    res.status(200).json({ user: userFunction });
                  })
                  .catch((err) =>
                    res.status(401).json({ message: "Not successful", error: err.message })
                  );
              };



       

