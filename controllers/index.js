
const db= require('../util/database');
const { validationResult } = require('express-validator/check');


exports.coralHome = (req, res, next) => {
  res.render('index', {
    path: '/',
    pageTitle: 'Coral Home',
    errorMessage:'',
    success:'',
    oldInput: {
      email: '',
      password: '',
      name:'',
      phone:''
    },
    validationErrors: []
  });
};

exports.coralHomePost = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const date= new Date().toISOString().slice(0, 19).replace('T', ' ');


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('index', {
      path: '/',
      pageTitle: 'Coral Home',
      errorMessage: errors.array()[0].msg,
      success: '',
      oldInput: {
        email: email,
        password: password,
        name:name,
        phone:phone,
      },
      validationErrors: errors.array(),
    });
  }

  db.execute('select * from userData where emailId= ?' , [email])
    .then(([user]) => {
      if (user.length==0) {
        db.execute('insert into userData(userName,emailId,phoneNo,password,dateTime) values(?,?,?,?,?)',[name,email,phone,password,date]).
        then(([user])=> {
          return res.render('index', {
            path: '/',
            pageTitle: 'Coral Home',
            errorMessage: '',
            success: 'Successfully inserted the data into userData table',
            oldInput: {
              email: '',
              password: '',
              phone:'',
              name:''
            },
            validationErrors: []
          });
        });
      }

      else {
        db.execute('update userData set userName= ?, password= ?, phoneNo= ? ,dateTime=?  where emailId=?',[name,password,phone,date,email])
        .then(([user])=>{
          return res.render('index', {
            path: '/',
            pageTitle: 'Coral Home',
            errorMessage: '',
            success: 'Success. Email already existed. So updated userName, password, phoneNo and dateTime column',
            oldInput: {
              email: '',
              password: '',
              phone:'',
              name:''
            },
            validationErrors: []
          });
        }
        );
      }
    })
        .catch(err => {
          console.log(err);
          res.redirect('/');
        });
    };


