const { Blog, Like, Comment } = require('../models')

async function index(req, res) {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function create(req, res) {
  try {
		req.body.ownerId = req.user.profile.id
    const blog = await Blog.create(req.body)
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function show(req, res) {
  try {
    const blog = await Blog.findOne({
      where: {id: req.params.id},
      include: [
        { model: Comment, as: "commentReceived" },
        { model: Like, as: "likeReceived" },
      ],
    })
    res.status(200).json(blog)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function update(req, res) {
  try {
    const blog = await Blog.findByPk(req.params.id)
    await blog.update(req.body)
    res.json(blog)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function deleteBlog(req, res) {
  try {
    const numberOfRowsRemoved = await Blog.destroy(
      { where: { id: req.params.id } }
    )
    res.status(200).json(numberOfRowsRemoved)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

module.exports = {
  index,
  create,
  show,
  update,
  delete: deleteBlog
}