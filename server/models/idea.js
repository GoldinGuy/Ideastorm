
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const Idea = new Schema(
//     {
//         name: { type: String, required: true },
//         time: { type: [String], required: true },
//         rating: { type: Number, required: true },
//     },
//     { timestamps: true },
// )
const Idea = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        tags: { type: [String], required: true },
        adv: {
            imgs: { type: [String], required: false },
        },
        meta: {
            uv: { type: String, required: false },
            dv: { type: String, required: false },
            suggestions: { type: [String], required: false },
        }
    },
    { timestamps: true },
)


module.exports = mongoose.model('ideas', Idea)