const Curriculum = require("../../models/curriculum");
const Student = require("../../models/student");
const router = require("express").Router();
const mongoose = require('mongoose');
router.post("/new-subject/:title", (req, res) => {
    console.log("firing")
    const newCurriculum = {
        title: req.params.title
    }
    Curriculum.create(newCurriculum)
        .then(() => {
            Student.updateMany(
                {},
                {
                    $push: {
                        grades: {
                            title: req.params.title,
                            assignments: []
                        }
                    }
                }
            ).then(() => { res.status(200).json({ msg: "Subject added to database." }) })
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})
router.get("/get-all", (req, res) => {
    Curriculum.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})

router.put("/add-assignment/:title", (req, res) => {
    console.log(parseInt(req.body.addIndex))
    Curriculum.findOneAndUpdate(
        { title: req.params.title },
        {
            $push: {
                assignments: {
                    $each: [{
                        _id: new mongoose.Types.ObjectId(),
                        title: req.body.data,
                        gradeN: null,
                        gradeM: null
                    }],
                    $position: parseInt(req.body.addIndex)
                },
            }
        }
    )
        .then(data => {
            console.log(data)
            Student.updateMany(
                { "grades.title": req.params.title },
                {
                    $push: {
                        "grades.$.assignments": {
                            $each: [{
                                _id: new mongoose.Types.ObjectId(),
                                title: req.body.data,
                                gradeN: null,
                                gradeM: null
                            }],
                            $position: parseInt(req.body.addIndex)
                        }
                    }
                }).then(data => { console.log(data) })
            res.status(200).json({ msg: data })
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})

router.put("/edit-assignment", (req, res) => {
    let newData = {};
    Curriculum.findOne({ title: req.body.subject })
        .then(data => {
            for (let i = 0; i < data.assignments.length; i++) {
                if (data.assignments[i].title === req.body.assignment) {
                    data.assignments[i].title = req.body.newName;
                    newData = data.assignments;
                }
            }
            Curriculum.findOneAndUpdate(
                { title: req.body.subject },
                {
                    $set: {
                        assignments: newData
                    }
                }
            ).then(() => {
                console.log("Edit assignment success.")
            })
        })
    Student.findOneAndUpdate(
        { grades: { $elemMatch: { title: req.body.subject } } },

    ).then(data5 => { console.log(`DATA5${data5}`) })
})
router.get("/view/:subject", (req, res) => {
    Curriculum.findOne({ title: req.params.subject })
        .then(data => {
            res.status(200).json(data)
            console.log(data)
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})
router.delete("/delete-subject/:id/:title", (req, res) => {
    Curriculum.deleteOne(
        { _id: req.params.id }
    )
        .then(data => {
            Student.updateMany(
                {},
                {
                    $pull: {
                        grades: { title: req.params.title }
                    }
                }
            ).then(data => { console.log(data) })
            res.status(200).json({ msg: "Subject deleted from database." })
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})
router.put("/delete-assignment/:id/:assignment", (req, res) => {
    Curriculum.updateOne(
        { _id: req.params.id },
        { $pull: { "assignments": { "title": req.params.assignment } } }
    ).then(() => {
        // res.status(200).json({ msg: "Assignment deleted." });
    })
    Student.updateMany(
        {},
        {
            $pull: {
                "grades.$[].assignments": {
                    "title": req.params.assignment
                }
            }
        },
    ).then(() => { console.log("Assignment deleted.") })
})


module.exports = router;