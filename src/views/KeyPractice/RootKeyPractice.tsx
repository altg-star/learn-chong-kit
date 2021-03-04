import React, { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Container, Paper, Typography } from "@material-ui/core";
import { KeyboardLayout, InfoBox, Header, RootQuestionBox } from "../../components";
import styled from "styled-components";

//question
import questionData from "../../constants/question/root-key-practice-question.json";

const PaperContainer = styled(Paper)`
    height: 576px;
    width: auto;
    padding: 16px;
`

interface QuestionDataInterface {
    [key: string]: Array<string>
}

const PressKeyPractice: React.FunctionComponent = () => {
    const history = useHistory();
    const { questionId } = useParams<{ questionId: string }>();
    const [currentInput, setCurrentInput] = useState<string>("");
    const [questionIterator, setQuestionIterator] = useState<number>(0);
    //const questionIteratorRef = useRef<number>(0);
    const lineRef = useRef<number>(0);
    const lightSet = new Set<string>();

    //init
    const data: QuestionDataInterface = questionData;
    const questionList = useMemo(
        (): string[] => {
            if (questionId in data)
                return data[questionId];
            else return []
        },
        [data, questionId]
    )
    let keyArray: Array<string> = [];
    if (questionList && questionList.length > 0) {
        keyArray = Array.from(questionId);
        keyArray.forEach((item) => {
            lightSet.add(item);
        })
    } else lightSet.clear();

    //key handler
    const handleKeyOnDown = (key: string, e: KeyboardEvent) => {
        const nextCorrectInput = questionList[questionIterator].substr(currentInput.length, 1);
        if (key === nextCorrectInput) {
            const nextInput = currentInput.concat(key);
            setCurrentInput(nextInput);
            if (nextInput === questionList[questionIterator]) {
                lineRef.current = lineRef.current + 1;
                setCurrentInput("");
            }
            if (lineRef.current === 3 && questionIterator < questionList.length) {
                setQuestionIterator(questionIterator + 1)
                lineRef.current = 0;
                setCurrentInput("");
            }
        }

    }

    useEffect(() => {
        if (questionIterator === questionList.length) {
            history.push("/");
        }
    }, [history, questionIterator, questionList])



    return (
        <>
            <KeyboardEventHandler
                handleKeys={keyArray}
                handleEventType="keydown"
                onKeyEvent={(key: string, e: KeyboardEvent) => handleKeyOnDown(key, e)} />
            <Container fixed style={{ padding: "36px" }}>
                <PaperContainer elevation={2}>
                    <Header previousPath="/key-practice">字根輸入練習</Header>
                    <InfoBox><Typography>請重覆輸入字根三次</Typography></InfoBox>
                    <RootQuestionBox question={questionList[questionIterator] || ""} currentInput={currentInput} line={lineRef.current}></RootQuestionBox>
                    <KeyboardLayout currentKey={currentInput} lightSet={lightSet}></KeyboardLayout>
                </PaperContainer>
            </Container>
        </>
    )
}

export default PressKeyPractice;