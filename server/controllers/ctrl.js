const Idea = require('../models/idea')

createIdea = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a idea',
        })
    }

    const idea = new Idea(body)

    if (!idea) {
        return res.status(400).json({ success: false, error: err })
    }

    idea
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: idea._id,
                message: 'Idea created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Idea not created!',
            })
        })
}

updateIdea = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Idea.findOne({ _id: req.params.id }, (err, idea) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Idea not found!',
            })
        }
        idea.name = body.name
        idea.time = body.time
        idea.rating = body.rating
        idea
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: idea._id,
                    message: 'Idea updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Idea not updated!',
                })
            })
    })
}

deleteIdea = async (req, res) => {
    await Idea.findOneAndDelete({ _id: req.params.id }, (err, idea) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!idea) {
            return res
                .status(404)
                .json({ success: false, error: `Idea not found` })
        }

        return res.status(200).json({ success: true, data: idea })
    }).catch(err => console.log(err))
}

getIdeaById = async (req, res) => {
    await Idea.findOne({ _id: req.params.id }, (err, idea) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!idea) {
            return res
                .status(404)
                .json({ success: false, error: `Idea not found` })
        }
        return res.status(200).json({ success: true, data: idea })
    }).catch(err => console.log(err))
}

getIdeas = async (req, res) => {
    await Idea.find({}, (err, ideas) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!ideas.length) {
            return res
                .status(404)
                .json({ success: false, error: `Idea not found` })
        }
        return res.status(200).json({ success: true, data: ideas })
    }).catch(err => console.log(err))
}

module.exports = {
    createIdea,
    updateIdea,
    deleteIdea,
    getIdeas,
    getIdeaById,
}