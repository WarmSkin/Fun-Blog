const router = require('express').Router()
const blogsCtrl = require('../controllers/blogs.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, blogsCtrl.create)


module.exports = router