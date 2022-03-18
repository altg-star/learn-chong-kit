import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { keyTranslation } from '../utils';

interface RootQuestionBoxProps {
    question: string,
    currentInput: string,
    line: number
}

const RootQuestionBox = (props: RootQuestionBoxProps): React.ReactElement => {
    const [input, setInput] = useState<Array<string>>([]);
    useEffect(() => {
        if (props.line === 3) {
            setInput([]);
            return;
        }
        let nextInput = [];
        for (let i = 0; i < props.line; i++) {
            nextInput.push(props.question);
        }
        nextInput[props.line] = props.currentInput;
        setInput(nextInput)
    }, [props.currentInput, props.line, props.question]);

    return (
        <Paper>
            <div><Typography variant="h5">{keyTranslation(props.question)}</Typography></div>
            {
                props.question ? input.map((str, i) => (<div><Typography key={i} variant="h5">{keyTranslation(str)}</Typography></div>)) : (<Typography variant="h5">找不到題目</Typography>)
            }
        </Paper>
    )
}

export default RootQuestionBox;
