const express = require('express');
const router = express.Router();

const StatusController = require('../../controller/Status');

router.route('/status/create')
  // .get(UserController.findAll)
  .post(StatusController.create);

router.route('/status/active')
  .get(StatusController.find);

// router.route('/users/:id')
  // .get(UserController.find)
  // .put(UserController.upsert);
  // .delete(UserController.delete);

module.exports = router;