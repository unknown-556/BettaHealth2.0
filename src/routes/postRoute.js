import express from 'express'

import { addArticle, addComment, getAllPosts, getArticleById, getPostsByCategory, getPostsByUsername, getRelated, replyToComment } from '../controllers/postController.js'
import auth from '../middlewares/auth.js'
import upload from '../config/cloudinary.js'
import role from '../middlewares/role.js'
import { checkUserStatus } from '../controllers/admin.js'


const   router = express.Router()

router.post('/create', auth, role(['Writer']), checkUserStatus(['Active']), upload.single('image'), addArticle)
router.post('/comment/:articleId', auth, upload.single('image'), addComment)
router.post('/reply/:articleId/:commentId', auth, upload.single('image'), replyToComment);
router.get('/all', getAllPosts)
router.get('/single/:_id', getArticleById)
router.get('/catrgory/:category', getPostsByCategory)
router.get('/article/:_id', getPostsByUsername)
router.get('/related/:categories', getRelated)

export default router
