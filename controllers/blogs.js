const { Blog } = require('../models')

async function create(req, res) {
  try {
		req.body.ownerId = req.user.profile.id
    const blog = await Blog.create(req.body)
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

module.exports = {
  create
}