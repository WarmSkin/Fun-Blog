const router = require('express').Router()
const blogsCtrl = require('../controllers/blogs.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, blogsCtrl.index)
router.post('/', checkAuth, blogsCtrl.create)
router.get('/:id', checkAuth, blogsCtrl.show)
router.post('/:id/like', checkAuth, blogsCtrl.giveLike)
router.put('/:id', checkAuth, blogsCtrl.update)
router.delete('/:id', checkAuth, blogsCtrl.delete)
router.delete('/:id/like/:lId', checkAuth, blogsCtrl.removeLike)



module.exports = router