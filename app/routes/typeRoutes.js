var express = require('express');
var { index, view_create, action_create, view_edit, action_edit, action_delete } = require('../controller/typeController')
var router = express.Router();

router.get('/', index)
router.get('/create', view_create)
router.post('/create', action_create)
router.get('/edit/:id', view_edit)
router.put('/edit/:id', action_edit)
router.delete('/delete/:id', action_delete)

module.exports = router;