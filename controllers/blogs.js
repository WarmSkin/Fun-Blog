const { Blog, Like, Comment, Profile } = require('../models')
const cloudinary = require('cloudinary').v2

async function index(req, res) {
  try {
    const blogs = await Blog.findAll(
      {
        include: [
          { model: Profile, as: "owner" },
          { model: Comment, as: "commentReceived", include: {model: Profile, as: "owner"} },
          { model: Like, as: "likeReceived", include: {model: Profile, as: "owner"} },
        ],
        order: [['updatedAt', 'DESC']]
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
    const blog = await Blog.findByPk(
      req.params.id,
      {
        include: [
          { model: Profile, as: "owner" },
          { model: Comment, as: "commentReceived", include: {model: Profile, as: "owner"} },
          { model: Like, as: "likeReceived", include: {model: Profile, as: "owner"} },
        ],
      }
    )
    if(req.user.profile.id === blog.ownerId)
      await blog.update(req.body)
    res.json(blog)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function deleteBlog(req, res) {
  try {
    const blog = await Blog.findByPk(req.params.Id)
    if(blog.ownerId === req.user.profile.id){
      const numberOfRowsRemoved = await Blog.destroy(
        { where: { id: req.params.id } }
      )
      res.status(200).json(numberOfRowsRemoved)
    }
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
    const like = await Like.findByPk(req.params.lId)
    if(like.profileId === req.user.profile.id){
      const numberOfRowsRemoved = await Like.destroy(
        { where: { id: req.params.lId } }
      )
      res.status(200).json(numberOfRowsRemoved)
    }
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function leaveComment(req, res) {
  try {
		req.body.profileId = req.user.profile.id
    req.body.blogId = req.params.id
    const comment = await Comment.create(req.body)
    const newComment = await Comment.findByPk(
      comment.id,
      {include:{model:Profile, as: "owner"}}
      )
    res.status(200).json(newComment)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function deleteComment(req, res) {
  try {
    const comment = await Comment.findByPk(req.params.cId)
    if(comment.profileId === req.user.profile.id){
      const numberOfRowsRemoved = await Comment.destroy(
        { where: { id: req.params.cId } }
      )
      res.status(200).json(numberOfRowsRemoved)
    }
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const blog = await Blog.findByPk(req.params.id)
    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    blog.photo = image.url
    await blog.save()
    res.status(201).json(blog.photo)
  } catch (error) {
    console.log(error)
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
  leaveComment,
  deleteComment,
  addPhoto
}