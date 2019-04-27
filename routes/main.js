
const { check, body } = require('express-validator/check');
const express = require('express');

const coralController = require('../controllers/index');
const coralDelete = require('../controllers/delete');
const coralSearch = require('../controllers/search');

const router = express.Router();

router.get('/', coralController.coralHome);
router.post('/',  [
    body('email')
    .exists()
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be of min 5 letter')
      .exists()
      .isLength({ min: 5 })
      .trim(),
      body('name', 'please enter a user name and it should be alphanumeric')
      .exists()
      .isAlphanumeric()
      .trim(),
      body('phone', 'Please enter a valid phone no. it should be of length 10')
      .exists()
      .isLength({ min: 10, max:10})
      .isNumeric().withMessage('And your Phone number should only contain number')
      .trim(),

  ], coralController.coralHomePost);
  router.get('/deleteUser', coralDelete.deleteEmail);
  router.post('/deleteUser/:email', coralDelete.deleteEmailPost);
  router.get('/search', coralSearch.search);
  router.post('/search', coralSearch.postSearch);
  router.post('/search/:email', coralSearch.postSearchDelete);
  router.get('/s/search', coralSearch.searchS);
module.exports = router;
