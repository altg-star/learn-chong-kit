import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Paper, Typography } from "@material-ui/core";
import { keyTranslation } from '../utils';

const StyledPaper = styled(Paper)`
    text-align: center;
    padding: 16px;
    margin: 16px;
    min-height: 152px;
`

const StyledAnswer = styled(Typography)`
    text-align: left;
    width: 120px;
`

const FlexBox = styled.div`
    display: flex;
    justify-content: center;
`

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
        <StyledPaper>
            <FlexBox><Typography variant="h5">{keyTranslation(props.question)}</Typography></FlexBox>
            {
                props.question ? input.map((str, i) => (<FlexBox><StyledAnswer key={i} variant="h5">{keyTranslation(str)}</StyledAnswer></FlexBox>)) : (<StyledAnswer variant="h5">找不到題目</StyledAnswer>)
            }
        </StyledPaper>
    )
}

export default RootQuestionBox;
