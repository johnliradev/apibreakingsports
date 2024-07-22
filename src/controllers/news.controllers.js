import { findAllService, createService, countNewsService, topNewsService, findNewsByIdService, findByTitleService, findNewsByUserService, updateNewsService, eraseNewsService, likeNewsService, deleteLikeNewsService, commentNewsService, deleteCommentNewsService } from "../services/news.service.js"
export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body
    if (!title || !text || !banner) {
      return res.status(400).send({
        message: "submit all fields for registration"
      })
    }
    await createService({
      title, text, banner, user: req.userId
    })
    res.status(201).send({ message: "Created" })
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
}
export const getAll = async (req, res) => {
  try {
    let { limit, offset } = req.query
    limit = Number(limit)
    offset = Number(offset)

    if (!limit) {
      limit = 5
    }
    if (!offset) {
      offset = 0
    }

    const news = await findAllService(offset, limit)
    const total = await countNewsService()
    const currentURL = req.baseUrl

    const next = offset + limit
    const nextURL = next < total ? `${currentURL}?limit=${limit}&offset=${next}` : null
    const previous = offset - limit < 0 ? null : offset - limit
    const previousURL = previous != null ? `${currentURL}?limit=${limit}&offset=${previous}` : null

    return res.status(200).send({
      nextURL, previousURL, limit, offset, total, result: news.map(newsItem => ({ id: newsItem._id, title: newsItem.title, text: newsItem.text, banner: newsItem.banner, likes: newsItem.likes, comments: newsItem.comments, name: newsItem.user.name, username: newsItem.user.username, userAvatar: newsItem.user.avatar }))
    })
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });

  }
}
export const topNews = async (req, res) => {
  try {
    const news = await topNewsService()
    if (!news) {
      return res.status(400).send({ message: "Not found news" })
    }
    return res.send({
      news: {
        id: news._id, title: news.title, text: news.text, banner: news.banner, likes: news.likes, comments: news.comments, name: news.user.name, username: news.user.username, userAvatar: news.user.avatar
      }
    })
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });

  }
}
export const findNewsById = async (req, res) => {
  try {
    const id = req.params.id
    const news = await findNewsByIdService(id)
    if (news.length === 0) {
      return res.status(400).send({ message: "Not exists news with this title" })
    }
    return res.send({
      news: {
        id: news._id, title: news.title, text: news.text, banner: news.banner, likes: news.likes, comments: news.comments, name: news.user.name, username: news.user.username, userAvatar: news.user.avatar
      }
    })
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });


  }
}
export const findByTitle = async (req, res) => {
  try {
    const { title } = req.query
    const news = await findByTitleService(title)
    if (!news) {
      return res.status(400).send({ message: "Not found news" })
    }
    return res.send({
      result: news.map(newsItem => ({ id: newsItem._id, title: newsItem.title, text: newsItem.text, banner: newsItem.banner, likes: newsItem.likes, comments: newsItem.comments, name: newsItem.user.name, username: newsItem.user.username, userAvatar: newsItem.user.avatar }))
    })

  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
}
export const findNewsByUser = async (req, res) => {
  try {
    const id = req.userId
    const news = await findNewsByUserService(id)
    if (!news) {
      return res.status(400).send({ message: "Not found news" })
    }
    return res.send({
      result: news.map(newsItem => ({ id: newsItem._id, title: newsItem.title, text: newsItem.text, banner: newsItem.banner, likes: newsItem.likes, comments: newsItem.comments, name: newsItem.user.name, username: newsItem.user.username, userAvatar: newsItem.user.avatar }))
    })
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
}
export const updateNews = async (req, res) => {
  try {
    const { title, text, banner } = req.body
    const { id } = req.params
    if (!title && !text && !banner) {
      return res.status(400).send({
        message: "Submit at least one field to update the post"
      })
    }
    const news = await findNewsByIdService(id)

    if (news.user._id.toString() !== req.userId.toString()) {
      return res.status(400).send({
        message: "You didn't update this post"
      })
    }

    await updateNewsService(id, title, text, banner)
    return res.send({ message: "Post successfully updated!" })
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
}
export const eraseNews = async (req, res) => {
  try {
    const { id } = req.params

    const news = await findNewsByIdService(id)

    if (news.user._id.toString() !== req.userId.toString()) {
      return res.status(400).send({
        message: "You didn't delete this post"
      })
    }

    await eraseNewsService(id)
    return res.send({ message: "Post successfully deleted!" })
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
}
export const likeNews = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId
    const newsLiked = await likeNewsService(id, userId)

    if (!newsLiked) {
      await deleteLikeNewsService(id, userId)
      return res.status(200).send({ message: "Liked successfully removed" })
    }
    return res.status(200).send({ message: "Like done successfully" })

  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });

  }
}
export const commentNews = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId
    const { comment } = req.body
    if (!comment) {
      return res.status(400).send({ message: "Write a message to comment" })
    }
    await commentNewsService(id, comment, userId)
    return res.send({
      message: "Comment successfully completed"
    })
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });

  }
}
export const deleteCommentNews = async (req, res) => {
  try {
    const { idNews, idComment } = req.params
    const userId = req.userId

    const commentDeleted = await deleteCommentNewsService(idNews, idComment, userId)
    const commentFinder = commentDeleted.comments.find(comment => comment.idComment === idComment)

    if (commentFinder.userId.toString() !== userId.toString()) {
      return res.status(400).send({ message: "You can't delete this comment" })
    }

    return res.send({
      message: "Comment successfully removed"
    })
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });

  }
}