import React from "react";
import { Alert } from "reactstrap"

const GradeAlert = (props) => {

    return (
        <>
            <Alert color="info">November grade: {props.assignmentgrade}</Alert>
        </>
    )
}

export default GradeAlert;