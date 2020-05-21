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

const ViewStudent = React.memo((props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const togglemodal = () => setModal(!modal);
  const [modal, setModal] = useState(false);

  return (
    <>
      <Button color="info" id={props.id} onClick={togglemodal}>Grades</Button>
      <Modal size="xl" isOpen={modal} toggle={togglemodal}>
        <ModalHeader toggle={togglemodal}>{props.student.firstName} {props.student.lastName}</ModalHeader>
        <ModalHeader>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="info" caret>
              {props.view_subject ? props.view_subject : "Subjects"}
            </DropdownToggle>
            <DropdownMenu>
              {props.student.grades.map((subject, index) => {
                return (
                  <DropdownItem key={`subject.title${index}`} id="view_subject" onClick={props.handleInputChange} value={subject.title}>{subject.title}
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
          {/* <Link to="/print-chart-rc" key={props.student._id} onClick={props.viewStudentRC} id={props.student._id}>Report card</Link> */}
        </ModalHeader>
        {
          props.student.grades.map((subject, index) => subject.title === props.view_subject && subject.assignments ? (
            <div className="table-responsive" key={`${subject.title}${index}`}>
              <Link to="/print-chart" style={{width:"100%",display:"block",textAlign:"center"}} key={props.student._id} name={subject.title} onClick={props.viewStudent} id={props.student._id}>Spreadsheet</Link>
              <Table className="table">
                <thead>
                  <tr>
                    <th style={{ padding: 0 }}>Assignment</th>
                    <th style={{ padding: 0 }}>November grade</th>
                    <th style={{ padding: 0 }}> May grade</th>
                  </tr>
                </thead>
                <tbody>
                  {subject.assignments.map((assignment, index) =>
                    <tr key={`${assignment._id}${index}`}>
                      <td>{assignment.title}</td>
                      <td>
                        <Alert color="info">November grade: {assignment.gradeN}</Alert>
                        <ButtonGroup>
                          <Button color="info" onClick={props.gradeStudentN} id={props.student._id} subject={subject.title} type="button" name={assignment.title} value={"L"} >L</Button>
                          <Button color="info" onClick={props.gradeStudentN} id={props.student._id} subject={subject.title} type="button" name={assignment.title} value={"P"}>P</Button>
                          <Button color="info" onClick={props.gradeStudentN} id={props.student._id} subject={subject.title} type="button" name={assignment.title} value={"M"}>M</Button>
                        </ButtonGroup>
                      </td>
                      <td>
                        <Alert color="info">May grade: {assignment.gradeM}</Alert>
                        <ButtonGroup>
                          <Button color="info" onClick={props.gradeStudentM} id={props.student._id} subject={subject.title} type="button" name={assignment.title} value={"L"} >L</Button>
                          <Button color="info" onClick={props.gradeStudentM} id={props.student._id} subject={subject.title} type="button" name={assignment.title} value={"P"}>P</Button>
                          <Button color="info" onClick={props.gradeStudentM} id={props.student._id} subject={subject.title} type="button" name={assignment.title} value={"M"}>M</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          ) : null
          )
        }
      </Modal>
    </>
  );
});



export default ViewStudent;
