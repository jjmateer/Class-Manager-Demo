const Student = require("../../models/student");
const Curriculum = require("../../models/curriculum");
const router = require("express").Router();

router.post("/new", (req, res) => {
    const { firstName, lastName } = req.body;
    Student.findOne({ firstName: firstName, lastName: lastName })
        .then(student => {
            if (!student) {
                Student.create({
                    firstName: firstName,
                    lastName: lastName,
                    grades: []
                }).then(data => {
                    res.status(200).json({ data, msg: { msg: "Student added to database." } })
                    Curriculum.find({})
                        .then(subjects => {
                            Student.findOneAndUpdate({ firstName: firstName, lastName: lastName },
                                { $set: { grades: subjects } }).then(() => { console.log("Subjects added to new student.") })
                        })
                })
            } else {
                res.status(400).json({ msg: "Student already exists." })
            }
        })
});

router.get("/all", (req, res) => {
    Student.find({}).sort({ lastName: 1 })
        .then(data => {
            res.status(200).json({ students: data });
        })
})

router.put("/delete/:id", (req, res) => {
    Student.findOneAndDelete({ _id: req.params.id })
        .then(res.status(200).json({ msg: "Student removed from database." }))
        .catch(err => {
            res.status(400).json({ msg: "Cannot delete student from database." });
        })
})

router.put("/update/:id", (req, res) => {
    const { firstName, lastName } = req.body;
    
    Student.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                firstName: firstName,
                lastName: lastName
            }
        }
    )
        .then(data => {
            res.status(200).json(data)
        })
        .catch(() => {
            res.status(400).json({ msg: "Student info update failed." });
        })
})

router.put("/grade-studentN", (req, res) => {
    let newData;
    const { student, assignment, value, subject } = req.body;
    Student.findOne({ _id: student })
        .then(studentData => {
            for (let i = 0; i < studentData.grades.length; i++) {
                for (let j = 0; j < studentData.grades[i].assignments.length; j++) {
                    if (studentData.grades[i].assignments[j].title === assignment && studentData.grades[i].title === subject) {
                        studentData.grades[i].assignments[j].gradeN = value;
                        newData = studentData;
                    }
                }
            }
        })
        .then(() => {
            Student.findOneAndUpdate({ _id: student },
                { $set: { grades: newData.grades } })
                .then(() => {
                    // console.log(data.grades)
                    // console.log(newData)
                    res.status(200).json(newData.sdata);
                })
        })

})

router.put("/grade-studentM", (req, res) => {
    // console.log("FIRING")
    let newData;
    const { student, assignment, value, subject } = req.body;
    Student.findOne({ _id: student })
        .then(studentData => {
            for (let i = 0; i < studentData.grades.length; i++) {
                for (let j = 0; j < studentData.grades[i].assignments.length; j++) {
                    if (studentData.grades[i].assignments[j].title === assignment && studentData.grades[i].title === subject) {
                        studentData.grades[i].assignments[j].gradeM = value;
                        newData = studentData;
                    }
                }
            }
        })
        .then(() => {
            Student.findOneAndUpdate({ _id: student },
                { $set: { grades: newData.grades } })
                .then(data => {
                    res.status(200).json(data);
                })
        })

})

router.get("/view/:id/:subject", (req, res) => {
    Student.findOne({ _id: req.params.id })
        .then(data => {
            res.status(200).json({ sdata: data, subject: req.params.subject });
            console.log(data)
        })
        .catch(() => {
            res.status(400).json({ msg: "Could not view student." })
        })
})

router.get("/view/:id", (req, res) => {
    Student.findOne({ _id: req.params.id })
        .then(data => {
            res.status(200).json({ sdata: data });43
        })
        .catch(() => {
            res.status(400).json({ msg: "Could not view student." })
        })
})
module.exports = router;