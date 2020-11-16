const express = require('express')

const IdeaCtrl = require('../controllers/ctrl')

const router = express.Router()

router.post('/idea', IdeaCtrl.createIdea)
router.put('/idea/:id', IdeaCtrl.updateIdea)
router.delete('/idea/:id', IdeaCtrl.deleteIdea)
router.get('/idea/:id', IdeaCtrl.getIdeaById)
router.get('/ideas', IdeaCtrl.getIdeas)
router.get('/ideasByTag/:tags', IdeaCtrl.getIdeasByTag)
router.get('/latestIdeas', IdeaCtrl.getLatestIdeas)
router.get('/trendingIdeas', IdeaCtrl.getTrendingIdeas)
router.get('/ideasByText/:text', IdeaCtrl.getIdeasByText)


module.exports = router