const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const userRoutes = express.Router();
const PORT = 4001;

let User = require('./user.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/users", { useNewUrlParser : true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB databse");
});

userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if(err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
})

userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

userRoutes.route('/update/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(!user) {
            res.status(400).send("This user does not exist, unfortunately!");
        } else {
            user.user_email = req.body.user_email;
            user.user_password = req.body.user_password;

            user.save().then(user => {
                res.json("User updated");
            })
            .catch(err => {
                res.status(400).send("Update failed");
            });
        }
    })
});

userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user' : 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send("adding new user failed")
        })
})

app.use('/users', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});