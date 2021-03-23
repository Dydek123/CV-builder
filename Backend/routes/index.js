const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.json({'key':'Hello'});
});

router.post('/login', async (req, res) => {
  const body = req.body;
  let status = '';
  let errors = [];
  const { login, password } = body;
  if(!login){
    status = 'error';
    errors.push('Login is invalid');
  }
  else if(!password){
    status = 'error';
    errors.push('Password is invalid');
  }
  else{
    await User.checkLogin(login, password)
        .then((user) => {
          if(user !== null) {
            status = 'success';
            //TODO start session
          }
          else {
            status = 'error';
            errors.push('User does not exist');
          }
        })
        .catch(err => {
          errors.push(err.message);
          status = 'error';
        })
  }
  res.json({status, errors});
})

router.post('/register', async (req, res, next) => {
  const body = req.body;
  let status = '';
  let errors = [];
  let {login, password, email} = body;
  if(!login){
    status = 'error';
    errors.push('Login is invalid');
  }
  else if(!password){
    status = 'error';
    errors.push('Password is invalid');
  }
  else if(!email){
    status = 'error';
    errors.push('Email is invalid');
  }
  else{
    await User.create({
      login, password, email,
    })
        .then(() => {
          status = 'success';
        })
        .catch(err => {
          errors.push(err.message);
          status = 'error';
        })
  }
  res.json({status, errors});
});

module.exports = router;
