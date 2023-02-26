const { Blog, Like, Comment, Profile } = require('../models')

async function index(req, res) {
  try {
    const blogs = await Blog.findAll(
      {
        include: [
          { model: Profile, as: "owner" },
          { model: Comment, as: "commentReceived" },
          { model: Like, as: "likeReceived" },
        ],
      }
    )
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
    const blog = await Blog.findByPk(req.params.id,
    {
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

async function giveLike(req, res) {
  try {
		req.body.profileId = req.user.profile.id
    req.body.blogId = req.params.id
    const like = await Like.create(req.body)
    res.status(200).json(like)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function removeLike(req, res) {
  try {
    const numberOfRowsRemoved = await Like.destroy(
      { where: { id: req.params.lId } }
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
  delete: deleteBlog,
  giveLike,
  removeLike,
}