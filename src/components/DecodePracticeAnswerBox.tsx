import React from "react";
import styled from "styled-components";
import { Paper, Typography } from "@material-ui/core";

const StyledPaper = styled(Paper)`
    text-align: center;
    padding: 16px;
    margin: 16px;
    min-height: 24px;
`

interface DecodePracticeAnswerBoxProps {
    answer: string,
}

const DecodePracticeAnswerBox = (props: DecodePracticeAnswerBoxProps): React.ReactElement => {
    return (
        <StyledPaper>
            {
                props.answer ? <Typography variant="h5">{props.answer}</Typography> : null
            }
        </StyledPaper>
    )
}

export default DecodePracticeAnswerBox;
