import React, { useState, useEffect, useRef } from "react";
import { PracticeContainer, AssociateKeyQuestionBox } from "../../components";
import keysMapping from "../../constants/keys-mapping.json";

//question
import AssociateCodePracticeQuestion from "../../constants/question/associate-code-practice-question.json";
const question = AssociateCodePracticeQuestion as {
    [key: string]: Array<string>
};
const possibleCharactersList = "abcdefghijklmnopqrstuvwy";

const fullLightSet = (): Set<string> => {
    const lightSet = new Set<string>();
    keysMapping.forEach(({ en }) => lightSet.add(en));
    return lightSet;
}

const AssociateCode: React.FunctionComponent = () => {
    const [currentInput, setCurrentInput] = useState<string>("");
    const [currentQuestion, setCurrentQuestion] = useState<string>("");
    const currentAnswer = useRef<string>("");

    const handleKeyOnDown = (key: string) => {
        setCurrentInput(key);
        if (key === currentAnswer.current) {
            randomQuestion();
        }
        else console.log('wrong')
    }

    const randomQuestion = () => {
        const randomKey = possibleCharactersList.charAt(Math.floor(Math.random() * possibleCharactersList.length));
        currentAnswer.current = randomKey;
        const pickUpKey = Math.floor(Math.random() * question[randomKey].length)
        //console.log(question[randomKey]);
        //console.log("pk", pickUpKey);
        setCurrentQuestion(question[randomKey][pickUpKey]);

    }
    useEffect(() => {
        randomQuestion()
    }, [])
    return (
        <PracticeContainer
            title="輔助字型練習"
            previousPath="/decode-practice"
            instruction="請輸入輔
            助字型對應的倉頡碼"
            currentKey={currentInput}
            handleKeyOnDown={(key) => handleKeyOnDown(key)}
            lightSet={fullLightSet()}
        >
            <AssociateKeyQuestionBox question={currentQuestion}></AssociateKeyQuestionBox>
        </PracticeContainer >
    )
}

export default AssociateCode;