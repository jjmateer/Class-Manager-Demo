const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    grades: {
        type:Array,
        required: true
    },
    studentCreated: {
        type: Date,
        default: Date.now
    }
});
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;