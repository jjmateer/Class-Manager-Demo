import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  Table,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert
} from 'reactstrap';
import { Link } from "react-router-dom";
import './student.css';

const ViewStudentDropdown = React.memo((props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <>
          <Dropdown style={{margin:"auto", width:100}} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="info" caret>
              {props.view_subject ? props.view_subject : "Subjects"}
            </DropdownToggle>
            <DropdownMenu>
              {props.view_student.sdata.grades.map((subject, index) => {
                return (
                  <DropdownItem key={`subject.title${index}`} id="view_subject" onClick={props.handleInputChange} value={subject.title}>{subject.title}
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
    </>
  );
});



export default ViewStudentDropdown;
