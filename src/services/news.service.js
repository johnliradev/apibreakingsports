import { News } from "../models/News.js";

export const createService = (body) => News.create(body)
export const findAllService = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");
export const countNewsService = () => News.countDocuments()
export const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user")
export const findNewsByIdService = (id) => News.findOne({ _id: id }).populate("user")
export const findByTitleService = (title) => News.find({ title: { $regex: `${title || ""}`, $options: "i" } }).sort({ _id: -1 }).populate("user")
export const findNewsByUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user")
export const updateNewsService = (id, title, text, banner) => News.findOneAndUpdate({ _id: id }, { title, text, banner }, { rawResult: true })
export const eraseNewsService = (id) => News.findOneAndDelete({ _id: id })
export const likeNewsService = (idNews, userId) => News.findOneAndUpdate({ _id: idNews, "likes.userId": { $nin: [userId] } }, { $push: { likes: { userId, created: new Date() } } })
export const deleteLikeNewsService = (idNews, userId) => News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } })
export const commentNewsService = (idNews, comment, userId) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36)
  return News.findOneAndUpdate(
    { _id: idNews },
    {
      $push: {
        comments: { idComment, userId, comment, createdAt: new Date() }
      }
    },
  );

}
export const deleteCommentNewsService = (idNews, idComment, userId) => {
  return News.findOneAndUpdate(
    { _id: idNews },
    {
      $pull: {
        comments: { idComment, userId }
      }
    },
  );

}