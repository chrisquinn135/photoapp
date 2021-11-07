const express   = require('express');
const router    = express.Router();
const db        = require('../conf/database.js');

router.get('/getAllUsers', (req, res, next) => {
    db.query('SELECT * from users;', (err, results, fields) =>{
        console.log(results);
        res.send(results);
    })
});

router.post('/createUser', (req, res, next) => {
    console.log(req.body);
    let username    = req.body.username;
    let email       = req.body.email;
    let password    = req.body.password;
    
    //validate data in backend, if err send back response
    //res.redirect('/registration');

    let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?,?,?,now())';

    db.query(baseSQL, [username,email,password]).then(([results, fields]) => {
        if(results && results.affectedRows) {
            res.send('user was made');
        }
        else {
            res.send('user was not made');
        }
    })

})

module.exports = router;