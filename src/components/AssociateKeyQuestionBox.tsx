import React from "react";
import styled from "styled-components";
import { Paper, Typography } from "@material-ui/core";

const StyledPaper = styled(Paper)`
    text-align: center;
    padding: 16px;
    margin: 16px;
    min-height: 24px;
`

interface AssociateKeyQuestionBoxProps {
    question: string,
}

const AssociateKeyQuestionBox = (props: AssociateKeyQuestionBoxProps): React.ReactElement => {
    return (
        <StyledPaper>
            {
                props.question ? ((props.question.indexOf('.') === -1) ? (<Typography variant="h5">{props.question}</Typography>)
                    : <img src={`/assets/characters/${props.question}`} alt="找不到題目"></img>)
                    : (<Typography variant="h5">找不到題目</Typography>)
            }
        </StyledPaper>
    )
}

export default AssociateKeyQuestionBox;
