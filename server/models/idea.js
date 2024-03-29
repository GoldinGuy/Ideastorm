
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Idea = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false },
        tags: { type: [String], required: true },
        s_count: { type: Number, required: false }
    },
    { timestamps: true },
)


// const Idea = new Schema(
//     {
//         name: { type: String, required: true },
//         description: { type: String, required: false },
//         tags: { type: [String], required: true },
//         adv: {
//             imgs: { type: [String], required: false },
//         },
//         meta: {
//             uv: { type: Number, required: false },
//             dv: { type: Number, required: false },
//             suggestions: { type: [String], required: false },
//             exists: { type: Boolean, required: false },
//         }
//     },
//     { timestamps: true },
// )


module.exports = mongoose.model('ideas', Idea)