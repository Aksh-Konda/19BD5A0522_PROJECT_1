const mongoose = require('mongoose');

const Users = require('./models/users');

const url = 'mongodb://localhost:27017/hospitalManagement';
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
});

connect.then(db => {
    Users.create({
        username: "admin",
        firstname: "akash",
        lastname: "konda",
        email: "aksh.konda@gmail.com",
        password: "Kmit123$"
    }).then(resp => {
        console.log("User Created Successfully!");
        console.log({ user: resp });
    });
});