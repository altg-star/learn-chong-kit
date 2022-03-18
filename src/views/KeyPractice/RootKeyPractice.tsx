import React, { useState, useRef, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Container, Paper, Typography } from "@mui/material";
import { KeyboardLayout, InfoBox, Header, RootQuestionBox } from "../../components";


const findPermutations = (str: string): Array<string> | string => {
    if (str.length < 2) {
        return str
    }
    let permutationsArray = [];
    for (let i = 0; i < str.length; i++) {
        let char = str[i]
        let remainingChars = str.slice(0, i) + str.slice(i + 1, str.length)
        for (let permutation of findPermutations(remainingChars)) {
            permutationsArray.push(char + permutation)
        }
    }
    return permutationsArray
}

const getRandomQuestion = (str: string): Array<string> => {
    const permutation = findPermutations(str);
    if (typeof permutation === "string") return [permutation];
    else {
        const data = permutation.slice(0, 15);
        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = data[i];
            data[i] = data[j];
            data[j] = temp;
        }
        return data
    }
}

const PressKeyPractice: React.FunctionComponent = () => {
    const { question } = useParams<{ question: string }>();
    const [currentInput, setCurrentInput] = useState<string>("");
    const [questionIterator, setQuestionIterator] = useState<number>(0);
    const lineRef = useRef<number>(0);

    //init
    const randomQuestion = useMemo((): string[] => getRandomQuestion(question || ""), [question]);
    const lightSet = useMemo((): Set<string> => {
        const tempLightSet = new Set<string>();
        if (question && question.length > 0) {
            const lightCharacters = Array.from(question);
            lightCharacters.forEach((item) => {
                tempLightSet.add(item);
            })
        } else tempLightSet.clear();
        return tempLightSet;
    }, [question])


    //key handler
    const handleKeyOnDown = (key: string, e: KeyboardEvent) => {
        const nextCorrectInput = randomQuestion[questionIterator].substr(currentInput.length, 1);
        if (key === nextCorrectInput) {
            const nextInput = currentInput.concat(key);
            setCurrentInput(nextInput);
            if (nextInput === randomQuestion[questionIterator]) {
                lineRef.current = lineRef.current + 1;
                setCurrentInput("");
            }
            if (lineRef.current === 3 && questionIterator < randomQuestion.length) {
                setQuestionIterator(questionIterator + 1)
                lineRef.current = 0;
                setCurrentInput("");
            }
        }

    }

    useEffect(() => {
        if (questionIterator === randomQuestion.length) {
            console.log("done")
        }
    }, [questionIterator, randomQuestion])



    return (
        <>
            <KeyboardEventHandler
                handleKeys={Array.from(question || "")}
                handleEventType="keydown"
                onKeyEvent={(key: string, e: KeyboardEvent) => handleKeyOnDown(key, e)} />
            <Container fixed style={{ padding: "36px" }}>
                <Paper elevation={2}>
                    <Header>字根輸入練習</Header>
                    <InfoBox><Typography>請重覆輸入字根三次</Typography></InfoBox>
                    <RootQuestionBox question={randomQuestion[questionIterator] || ""} currentInput={currentInput} line={lineRef.current}></RootQuestionBox>
                    <KeyboardLayout currentKey={currentInput} lightSet={lightSet}></KeyboardLayout>
                </Paper>
            </Container>
        </>
    )
}

export default PressKeyPractice;