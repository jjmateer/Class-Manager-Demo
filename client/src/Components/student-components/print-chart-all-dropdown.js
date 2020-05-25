import React, { useState } from "react";
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import './student.css';

const PrintChartAllDropdown = React.memo((props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <Dropdown style={{ margin: "auto", marginLeft: 50, marginTop: 50, marginBottom:50 }} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle style={{margin:"auto"}} caret>
                {props.month < 6 ? "May" : "November"}
            </DropdownToggle>
            <DropdownMenu style={{margin:"auto"}}>
                <DropdownItem id="month" onClick={props.handleInputChange} value="11">November
                            </DropdownItem>
                <DropdownItem id="month" onClick={props.handleInputChange} value="5">May
                            </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
});



export default PrintChartAllDropdown;
