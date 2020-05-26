import React, { useState } from "react";
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import './student.css';

const GradeDropdown = React.memo((props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    var [dropdownDisplay, setdropdownDisplay] = useState(null);
    const displayAndGrade = event => {
        props.gradeStudentN(event.target.id, event.target.name, event.target.value, event.target.getAttribute("subject"))
        setdropdownDisplay(event.target.value)
        dropdownDisplay = event.target.value;
        console.log(dropdownDisplay)
    }
    return (
        <>
            <Dropdown style={{ margin: "auto", width: 100 }} isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle color="info" caret>
                    {dropdownDisplay}
                </DropdownToggle>
                <DropdownMenu>
                    {props.gradeLetters.map((letter, index) => (

                        <DropdownItem id={props.studentID} subject={props.subjectTitle} name={props.assignmentTitle} onClick={displayAndGrade} value={letter}>{letter}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </>
    );
});



export default GradeDropdown;
