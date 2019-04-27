const db = require('../util/database');


exports.deleteEmail = (req, res, next) => {
  const page = +req.query.page || 1;
  const ITEMS_PER_PAGE = 10;
  const start = ITEMS_PER_PAGE * (page - 1);
  db.execute('select count(emailId) as countEmail from userData').then(([count]) => {
      const totalItems = count[0].countEmail;
      db.execute('select * from userData limit ?, 10', [start]).then(([user]) => {
          res.render('delete', {
            pageTitle: 'Delete',
            user: user,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
          });
        }

      )
    })
    .catch(err =>
      console.log(err))

};

exports.deleteEmailPost = (req, res, next) => {
  const email = req.params.email;
  const page = req.query.page;
  db.execute('delete from userData where emailId= ?', [email]).then(([user]) => {
    res.redirect('/deleteUser?page=' + page);
  }).catch(err =>
    console.log(err))

};