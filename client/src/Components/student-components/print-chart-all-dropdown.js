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

const PrintChartAllDropdown = React.memo((props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const months = ["november", "may"];
    return (
        <Dropdown style={{ margin: "auto", width: "80vw", marginTop: 50, marginBottom:50 }} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle style={{width: "80vw"}} caret>
                {props.month < 6 ? "May" : "November"}
            </DropdownToggle>
            <DropdownMenu style={{width: "80vw"}}>
                <DropdownItem style={{width: "80vw"}} id="month" onClick={props.handleInputChange} value="11">November
                            </DropdownItem>
                <DropdownItem style={{width: "80vw"}} id="month" onClick={props.handleInputChange} value="5">May
                            </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
});



export default PrintChartAllDropdown;
