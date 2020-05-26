import React from "react";
import { Alert } from "reactstrap"

const GradeAlert = (props) => {
    return (
        <>
            <Alert color="info">November grade: {props.assignmentgrade}
            {props.updateStudent === true ?
            ` > ${props.assignmentgrade}`
            : null    
        }
            </Alert>
        </>
    )
}

export default GradeAlert;