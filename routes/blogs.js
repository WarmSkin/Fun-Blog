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
router.post('/:id/comment', checkAuth, blogsCtrl.leaveComment)
router.put('/:id', checkAuth, blogsCtrl.update)
router.delete('/:id', checkAuth, blogsCtrl.delete)
router.delete('/:id/like/:lId', checkAuth, blogsCtrl.removeLike)
router.delete('/:id/comment/:cId', checkAuth, blogsCtrl.deleteComment)



module.exports = router