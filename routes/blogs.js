const router = require('express').Router()
const blogsCtrl = require('../controllers/blogs.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, blogsCtrl.index)
router.get('/:id', checkAuth, blogsCtrl.show)
router.post('/', checkAuth, blogsCtrl.create)
router.post('/:id/like', checkAuth, blogsCtrl.giveLike)
router.post('/:id/comment', checkAuth, blogsCtrl.leaveComment)
router.put('/:id', checkAuth, blogsCtrl.update)
router.put('/:id/add-photo', checkAuth, blogsCtrl.addPhoto)
router.delete('/:id', checkAuth, blogsCtrl.delete)
router.delete('/:lId/like', checkAuth, blogsCtrl.removeLike)
router.delete('/:cId/comment', checkAuth, blogsCtrl.deleteComment)



module.exports = router