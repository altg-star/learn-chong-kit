import React from "react";
import { Paper, Typography } from "@mui/material";

interface DecodePracticeQuestionBoxProps {
    question: string,
    tips?: string,
}

const DecodePracticeQuestionBox = (props: DecodePracticeQuestionBoxProps): React.ReactElement => {
    return (
        <Paper>
            {
                props.question ? ((props.question.indexOf('.') === -1) ? (<Typography variant="h5">{props.question}</Typography>)
                    : <img src={`/assets/characters/${props.question}`} alt="找不到題目"></img>)
                    : (<Typography variant="h5">找不到題目</Typography>)
            }
            {props.tips ? <Typography variant="subtitle2" >{props.tips}</Typography> : null}
        </Paper>
    )
}

export default DecodePracticeQuestionBox;
