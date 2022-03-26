import React, { useState, useRef, useEffect } from "react";
//ui
import { Container } from "@mui/material";
//components
import BaseContainer from "../../components/base/BaseContainer";

//static
import AssociateCodeQuestions from "../../constants/question/associate-code-practice-question.json";
const possibleCharactersList = "abcdefghijklmnopqrstuvwy";

const questions = AssociateCodeQuestions as {
    [key: string]: Array<string>
}

type AssociateCodeContentProps = {
    currentKey?: string;
}
const AssociateCodeContent: React.FunctionComponent<AssociateCodeContentProps> = ({ currentKey }: AssociateCodeContentProps) => {
    const [currentQuestion, setCurrentQuestion] = useState<string>("");
    const currentAnswer = useRef<string>("");
    //setup
    useEffect(() => {
        const nextQuestionCharacter = possibleCharactersList.charAt(Math.floor(Math.random() * possibleCharactersList.length));
        const nextQuestion = questions[nextQuestionCharacter];
        setCurrentQuestion(nextQuestion[Math.floor(Math.random() * nextQuestion.length)]);
        currentAnswer.current = nextQuestionCharacter;
    }, []);

    useEffect(() => {
        //check answer
        if (currentKey === currentAnswer.current) {
            // random next question
            const nextQuestionCharacter = possibleCharactersList.charAt(Math.floor(Math.random() * possibleCharactersList.length));
            const nextQuestion = questions[nextQuestionCharacter];
            setCurrentQuestion(nextQuestion[Math.floor(Math.random() * nextQuestion.length)]);
            currentAnswer.current = nextQuestionCharacter;
        }
    }, [currentKey]);

    return (
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {
                currentQuestion.indexOf(".png") === -1 ?
                    //normal character
                    (<h2>{currentQuestion}</h2>)
                : //image
                <img src={`/assets/characters/${currentQuestion}`} alt="找不到題目"></img>
            }
        </Container>
    )
}
const AssociateCode: React.FunctionComponent = () => {
    return (
        <BaseContainer title="輔助字型練習" subtitle="請輸入輔助字型對應的倉頡碼" backOnClick="/decode">
            <AssociateCodeContent></AssociateCodeContent>
        </BaseContainer>
    )
}

export default AssociateCode;