import React, { useState, useEffect } from "react";
import { PracticeContainer, DecodePracticeQuestionBox, DecodePracticeInputBox, KeyTips } from "../../components";
import keysMapping from "../../constants/keys-mapping.json";
//question
import CommonTailPracticeQuestion from "../../constants/question/common-tail-practice-question.json";

//constant
const MAX_INPUT = 3;
const question = CommonTailPracticeQuestion as Array<{ q: string, a: string }>

const fullLightSet = (): Set<string> => {
    const lightSet = new Set<string>();
    keysMapping.forEach(({ en }) => lightSet.add(en));
    return lightSet;
}

const CommonTail: React.FunctionComponent = () => {
    const [currentInput, setCurrentInput] = useState<string>("");
    const [currentQuestion, setCurrentQuestion] = useState<{ q: string, a: string }>({ q: "", a: "" });

    const handleSpaceOnDown = () => {
        if (currentInput === currentQuestion.a) {
            randomQuestion();
        }
        setCurrentInput('');
    }

    const handleKeyOnDown = (key: string) => {
        if (currentInput.length < MAX_INPUT)
            setCurrentInput(currentInput.concat(key));
    }

    const randomQuestion = () => {
        const n = Math.floor(Math.random() * question.length)
        setCurrentQuestion(question[n]);

    }
    useEffect(() => {
        randomQuestion()
    }, [])
    return (
        <>
            <KeyTips />
            <PracticeContainer
                title="常用字身練習"
                previousPath="/decode-practice"
                instruction="請輸入字身對應的倉頡碼（一至三位）"
                currentKey={currentInput}
                handleKeyOnDown={(key) => handleKeyOnDown(key)}
                handleSpaceOnDown={() => handleSpaceOnDown()}
                handleBackSpaceOnDown={() => setCurrentInput(currentInput.slice(0, currentInput.length - 1))}
                lightSet={fullLightSet()}
            >
                <DecodePracticeQuestionBox question={currentQuestion.q}></DecodePracticeQuestionBox>
                <DecodePracticeInputBox input={currentInput}></DecodePracticeInputBox>
            </PracticeContainer>
        </>
    )
}

export default CommonTail;