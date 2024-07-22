import { Router } from "express";
import { create, getAll, topNews, findNewsById, findByTitle, findNewsByUser, updateNews, eraseNews, likeNews, commentNews, deleteCommentNews } from "../controllers/news.controllers.js"
import { authMiddleware } from "../middlewares/auth.middlewares.js";
export const newsRouter = Router()

newsRouter.post("/news", authMiddleware, create)
newsRouter.get("/news", getAll)
newsRouter.get("/news/top", topNews)
newsRouter.get("/news/search", findByTitle)
newsRouter.get("/news/byuser", authMiddleware, findNewsByUser)
newsRouter.get("/news/:id", authMiddleware, findNewsById)
newsRouter.patch("/news/:id", authMiddleware, updateNews)
newsRouter.delete("/news/:id", authMiddleware, eraseNews)
newsRouter.patch("/news/like/:id", authMiddleware, likeNews)
newsRouter.patch("/news/comment/:id", authMiddleware, commentNews)
newsRouter.patch("/news/comment/:idNews/:idComment", authMiddleware, deleteCommentNews)