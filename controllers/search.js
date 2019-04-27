const url = require('url');
const db = require('../util/database');
const {
  validationResult
} = require('express-validator/check');


exports.search = (req, res, next) => {
  res.render('search', {
    user: [],
    reRender: false,
    pageTitle: 'Search',
    success: req.query.success || '',
  });
};

exports.searchS = (req, res, next) => {
  db.execute('SELECT emailId from userData Data where emailId like "%' + req.query.key + '%@_%" limit 10').then(([user]) => {
    if (user.length > 0) {
      var pData = [];
      for (i = 0; i < user.length; i++) {
        pData.push(user[i].emailId);
      }
      res.end(JSON.stringify(pData));
    } else {
      db.execute('SELECT emailId from userData where emailId  like "%' + req.query.key + '%" limit 10').then(([email]) => {
        var data = [];
        for (i = 0; i < email.length; i++) {
          data.push(email[i].emailId);
        }
        res.end(JSON.stringify(data));
      }).catch(err =>
        console.log(err))
    }
  }).catch(err =>
    console.log(err)
  )
};

exports.postSearch = (req, res, next) => {
  db.execute('SELECT * from userData where emailId= ?', [req.body.typeahead]).then(([data]) => {
    res.render('search', {
      user: data,
      reRender: true,
      pageTitle: 'Search',
      success:'',
    })
  }).catch(err =>
    console.log(err))
};

exports.postSearchDelete = (req, res, next) => {
  db.execute('Delete from userData where emailId= ?', [req.params.email]).then(([data]) => {
    res.redirect(url.format({
      pathname:"/search",
      query: {
         "success": "Data deleted Successfully.",
       }
    }));
  }).catch(err =>
    console.log(err))
};