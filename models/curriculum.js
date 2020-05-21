const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const curriculumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    assignments: [{
        title: {
            type: String,
            required: true
        },
        gradeN: {
            type: String,
        },
        gradeM: {
            type: String,
        }
    }],
    curriculumCreated: {
        type: Date,
        default: Date.now
    }
});
const Curriculum = mongoose.model("Curriculum", curriculumSchema);
module.exports = Curriculum;