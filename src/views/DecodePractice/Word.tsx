import React, { useState, useEffect } from "react";
import * as R from "ramda";
import { PracticeContainer, DecodePracticeInputBox, DecodePracticeQuestionBox, DecodePracticeAnswerBox } from "../../components";
import keysMapping from "../../constants/keys-mapping.json";
import characterMapping from "../../constants/character-mapping.json";

//question
import WordQuestion from '../../constants/question/word-practice-question.json';
const question = WordQuestion as Array<string>;
const cp = characterMapping as any;

const fullLightSet = (): Set<string> => {
    const lightSet = new Set<string>();
    keysMapping.forEach(({ en }) => lightSet.add(en));
    return lightSet;
}

const Word: React.FunctionComponent = () => {
    const [currentQuestion, setCurrentQuestion] = useState<string>("");
    const [currentAnswer, setCurrentAnswer] = useState<string>("");
    const [currentInput, setCurrentInput] = useState<string>("");
    const [currentMapping, setCurrentMapping] = useState<any>();

    const handleSpaceOnDown = () => {
        if (currentMapping !== undefined && currentMapping["+"] !== undefined) {
            if (currentMapping["+"][0] !== undefined) {
                const newAnswer = currentAnswer.concat(String.fromCharCode(currentMapping["+"][0]))
                setCurrentAnswer(newAnswer)
                if (currentQuestion.length === newAnswer.length) {
                    setCurrentAnswer("");
                    if (currentQuestion === newAnswer) {
                        randomQuestion();
                    }
                }
            }
        }
        setCurrentInput("");
        setCurrentMapping(undefined);
    }

    const handleBackSpaceOnDown = () => {
        if (currentInput.length > 0) {
            const newInput = currentInput.slice(0, currentInput.length - 1)
            setCurrentInput(newInput);
            setCurrentMapping(R.pathOr(undefined, Array.from(newInput))(cp))
        }
    }

    const handleKeyOnDown = (key: string) => {
        if (currentInput.length === 0) {
            setCurrentInput(currentInput.concat(key));
            if (cp[`${key}`] !== undefined) {
                setCurrentMapping(cp[`${key}`]);
            }
        } else if (currentInput.length < 5) {
            setCurrentInput(currentInput.concat(key));
            if (currentMapping !== undefined && currentMapping[`${key}`] !== undefined) {
                setCurrentMapping(currentMapping[`${key}`])
            } else setCurrentMapping(undefined);
        }
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
            <PracticeContainer
                title="詞組練習"
                previousPath="/decode-practice"
                instruction="請輸入對應詞組"
                currentKey={currentInput}
                handleKeyOnDown={(key) => handleKeyOnDown(key)}
                handleSpaceOnDown={() => handleSpaceOnDown()}
                handleBackSpaceOnDown={() => handleBackSpaceOnDown()}
                lightSet={fullLightSet()}
            >
                <DecodePracticeQuestionBox question={currentQuestion}></DecodePracticeQuestionBox>
                <DecodePracticeAnswerBox answer={currentAnswer}></DecodePracticeAnswerBox>
                <DecodePracticeInputBox input={currentInput} />
            </PracticeContainer>
        </>
    )
}

export default Word