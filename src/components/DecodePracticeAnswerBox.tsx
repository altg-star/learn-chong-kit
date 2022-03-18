import React from "react";
import { Paper, Typography } from "@mui/material";

interface DecodePracticeAnswerBoxProps {
    answer: string,
}

const DecodePracticeAnswerBox = (props: DecodePracticeAnswerBoxProps): React.ReactElement => {
    return (
        <Paper>
            {
                props.answer ? <Typography variant="h5">{props.answer}</Typography> : null
            }
        </Paper>
    )
}

export default DecodePracticeAnswerBox;
