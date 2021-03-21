import React, { useState, useEffect } from "react";
import { PracticeContainer, DecodePracticeQuestionBox, DecodePracticeInputBox, KeyTips } from "../../components";
import keysMapping from "../../constants/keys-mapping.json";
import StructureTips from "../../constants/structure-tips.json";
//question
import SingleCharacter from "../../constants/question/single-character-practice-question.json";

//constant
const MAX_INPUT = 5;
const question = SingleCharacter as Array<{ q: string, a: string, s: string }>
const st = StructureTips as { [key: string]: string }

const fullLightSet = (): Set<string> => {
    const lightSet = new Set<string>();
    keysMapping.forEach(({ en }) => lightSet.add(en));
    return lightSet;
}

const CommonHead: React.FunctionComponent = () => {
    const [currentInput, setCurrentInput] = useState<string>("");
    const [currentQuestion, setCurrentQuestion] = useState<{ q: string, a: string }>({ q: "", a: "" });
    const [currentTips, setCurrentTips] = useState<string>("");

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
        setCurrentTips(`取碼數目：${question[n].a.length}　結構：${st[`${question[n].s}`]}`)
    }

    useEffect(() => {
        randomQuestion()
    }, [])
    return (
        <>
            <KeyTips />
            <PracticeContainer
                title="常用字首練習"
                previousPath="/decode-practice"
                instruction="請輸入單字對應的倉頡碼"
                currentKey={currentInput}
                handleKeyOnDown={(key) => handleKeyOnDown(key)}
                handleSpaceOnDown={() => handleSpaceOnDown()}
                handleBackSpaceOnDown={() => setCurrentInput(currentInput.slice(0, currentInput.length - 1))}
                lightSet={fullLightSet()}
            >
                <DecodePracticeQuestionBox question={currentQuestion.q} tips={currentTips}></DecodePracticeQuestionBox>
                <DecodePracticeInputBox input={currentInput}></DecodePracticeInputBox>
            </PracticeContainer>
        </>
    )
}

export default CommonHead;