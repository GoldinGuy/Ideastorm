const express = require('express')

const IdeaCtrl = require('../controllers/ctrl')

const router = express.Router()

// edit db 
router.post('/renameField/:fieldName', IdeaCtrl.renameField)

// add/edit ideas 
router.post('/idea', IdeaCtrl.createIdea)
router.put('/idea/:id', IdeaCtrl.updateIdea)
router.delete('/idea/:id', IdeaCtrl.deleteIdea)

router.put('/idea/s_count/:id', IdeaCtrl.updateStormcount)


// fetch ideas in bulk by category
router.get('/ideas', IdeaCtrl.getIdeas)
router.get('/trendingIdeas/:page', IdeaCtrl.getTrendingIdeas)
router.get('/latestIdeas/:page', IdeaCtrl.getLatestIdeas)

// fetch a specific idea 
router.get('/idea/:id', IdeaCtrl.getIdeaById)

// fetch ideas w/ filters 
router.get('/ideasByTag/:tags', IdeaCtrl.getIdeasByTag)
router.get('/ideasByText/:text', IdeaCtrl.getIdeasByText)

// fetch tags
router.get('/trendingTags', IdeaCtrl.getTrendingTags)

module.exports = router