import React, { useState } from "react";
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert
} from 'reactstrap';
import './student.css';

const GradeDropdown = React.memo((props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    let [dropdownDisplay, setdropdownDisplay] = useState(null);
    let [GradeStatusLabel, setGradeStatusLabel] = useState(true);
    let colorChange = [];
    // let changeGradeMessage1 = true;
    // let changeGradeMessage2 = true;
    // let changeGradeMessage3 = false;
    const displayAndGrade = event => {
        props.gradeStudentN(event.target.id, event.target.name, event.target.value, event.target.getAttribute("subject"))
        setdropdownDisplay(event.target.value)
        colorChange.push(`${props.studentID}${props.assignmentTitle}${props.month}${props.subjectTitle}`)
        setGradeStatusLabel(false);
        console.log(colorChange)
        console.log(`${props.studentID}${props.assignmentTitle}${props.month}${props.subjectTitle}`)
    }
    return (
        <>
            <Alert
                color={colorChange.includes(`${props.studentID}${props.assignmentTitle}${props.month}${props.subjectTitle}`) ?
                    "warning"
                    :
                    "info"}>
                        <Alert color={GradeStatusLabel === true ? "info" : "warning"}>
                {GradeStatusLabel === true ? "Current Grade: " : "Previous Grade: "} {props.currentGrade}
                </Alert>
                <Alert color={GradeStatusLabel === true ? "info" : "warning"}>
                {GradeStatusLabel === true ? null : "New Grade: "}
            <Dropdown style={{ margin: "auto", width: 100 }} isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle color={GradeStatusLabel === true ? "primary" : "warning"} caret>
                    {dropdownDisplay === null ? "Edit" : dropdownDisplay}
                </DropdownToggle>
                <DropdownMenu>
                    {props.gradeLetters.map((letter, index) => (
                        <DropdownItem
                            key={`${letter}${index}${props.studentID}${props.subjectTitle}${props.month}`}
                            id={props.studentID}
                            subject={props.subjectTitle}
                            name={props.assignmentTitle}
                            onClick={displayAndGrade}
                            month={props.month}
                            value={letter === null ? null : letter}>
                            {letter === null ? "Erase" : letter}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            </Alert>
            </Alert>
        </>
    );
});



export default GradeDropdown;
