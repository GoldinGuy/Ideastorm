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
        idea.title = body.title
        idea.description = body.description
        idea.tags = body.tags
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

updateStormcount = async (req, res) => {
    const body = req.body
    console.log("attempting to update stomrcount")

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a stormcount to update',
        })
    }

    Idea.findOne({ _id: req.params.id }, (err, idea) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Idea not found!',
            })
        }
        idea.s_count = body.s_count;
        idea.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: idea._id,
                    message: 'Stormcount updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Stormcount not updated!',
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
                .json({ success: false, error: `Ideas not found` })
        }
        return res.status(200).json({ success: true, data: ideas })
    }).catch(err => console.log(err))
}

getIdeasByTag = async (req, res) => {
    await Idea.find({ tags: { $in: req.params.tags }}, (err, ideas) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!ideas.length) {
            return res
                .status(404)
                .json({ success: false, error: `Ideas not found` })
        }
        return res.status(200).json({ success: true, data: ideas })
    }).catch(err => console.log(err))
}

getIdeasByText = async (req, res) => {
    await Idea.find({
            $or: [
            {
                title: { $regex: req.params.text, $options: 'i' },
            }, {
                description: { $regex: req.params.text, $options: 'i' },
            },{
                    tags: { $regex: req.params.text, $options: 'i' },
             }
          ]
}, (err, ideas) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!ideas.length) {
            return res
                .status(404)
                .json({ success: false, error: `Ideas not found` })
        }
        return res.status(200).json({ success: true, data: ideas })
    }).catch(err => console.log(err))
}


getLatestIdeas = async (req, res) => {
    await Idea.find({}, null, {sort: {$natural: -1}},  (err, ideas) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!ideas.length) {
            return res
                .status(404)
                .json({ success: false, error: `Ideas not found` })
        }
        return res.status(200).json({ success: true, data: ideas })
    }).catch(err => console.log(err))
}

// TODO: figure out what trending means 
getTrendingIdeas = async (req, res) => {
    await Idea.find({}, null, {sort: {$natural: -1}, limit: 18, },  (err, ideas) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!ideas.length) {
            return res
                .status(404)
                .json({ success: false, error: `Ideas not found` })
        }
        return res.status(200).json({ success: true, data: ideas })
    }).catch(err => console.log(err))
}
// getTrendingIdeas = async (req, res) => {
//     await Idea.find({}, {limit:18}, {sort:{$natural:-1}}, {limit: 18}, (err, ideas) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }
//         if (!ideas.length) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Ideas not found` })
//         }
//         return res.status(200).json({ success: true, data: ideas })
//     }).catch(err => console.log(err))
// }

getTrendingTags = async (req, res) => {
    await Idea.aggregate([
        // Unwind the array
        { "$unwind": "$tags" },
        // Group on tags with a count
        { "$group": {
            "_id": "$tags",
            "count": { "$sum": 1 }
        }},
        // Optionally sort the tags by count descending
        { "$sort": { "_id": -1 } },
        // Optionally limit to the top "n" results. Using 10 results here
        { "$limit": 10 }

    ], function (err, tags) {
        console.log(err);
        console.log(tags);
        if (!tags.length) {
        return res
                .status(404)
                .json({ success: false, error: `Tags not found` })
        }
        return res.status(200).json({ success: true, data: tags })
    }).catch(err => console.log(err))
}

renameField = async (req, res) => {
   await Idea.updateMany({}, { $rename: { "name": req.params.fieldName } });
}


module.exports = {
    createIdea,
    updateIdea,
    deleteIdea,
    getIdeas,
    getIdeaById,
    getIdeasByTag,
    getLatestIdeas,
    getTrendingIdeas,
    getIdeasByText,
    getTrendingTags,
    renameField,
    updateStormcount
}