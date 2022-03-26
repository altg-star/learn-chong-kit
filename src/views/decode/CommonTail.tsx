import React, { useRef, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
//ui
import { Container, Typography } from "@mui/material";
//components
import BaseContainer from "../../components/base/BaseContainer";

//static
import keysMapping from "../../constants/keys-mapping.json";
import CommonTailPracticeQuestion from "../../constants/question/common-tail-practice-question.json";
const possibleCharactersList = "abcdefghijklmnopqrstuvwxy";
const MAX_INPUT = 3;
const questions = CommonTailPracticeQuestion as Array<{ q: string, a: string }>

const keyTransalte = (keyMap: Array<string>): Array<{ en: string, zh: string }> => {
    return keyMap.map((item) => {
        const mapping = keysMapping.find(({ en }: { en: string }) => en === item);
        return mapping ? mapping : { en: item, zh: item }
    });
}

type CommonTailContentProps = {
    currentKey?: string;
}
const CommonTailContent: React.FunctionComponent<CommonTailContentProps> = ({ currentKey }: CommonTailContentProps) => {
    const theme = useTheme();
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const currentQuestion = useRef<string>(randomQuestion.q);
    const currentAnswer = useRef<string>(randomQuestion.a);
    const currentInput = useRef<string>("");

    useEffect(() => {
        if (currentKey === "backspace") {
            currentInput.current = currentInput.current.slice(0, -1);
        } else if (currentKey === "space") {
            //check answer
            if (currentInput.current === currentAnswer.current) {
                //next question
                const nextQuestion = questions[Math.floor(Math.random() * questions.length)];
                currentQuestion.current = nextQuestion.q;
                currentAnswer.current = nextQuestion.a;
            }
            currentInput.current = "";
        } else if (currentInput.current.length < MAX_INPUT && currentKey && possibleCharactersList.indexOf(currentKey) !== -1) {
            currentInput.current = currentInput.current.concat(currentKey);
        }
    }, [currentKey]);

    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h4" sx={{ flex: "none", height: "50%", display: "flex", alignItems: "end"  }}>{currentQuestion.current}</Typography>
            <Typography variant="h4" sx={{
                minWidth: theme.typography.htmlFontSize * 8 + 12,
                height: theme.typography.htmlFontSize * 3,
                padding: "4px 16px 4px 16px",
                marginTop: "16px",
                borderStyle: "solid"
            }}>
                {keyTransalte(currentInput.current.split("")).map(({ zh }) => zh)}
            </Typography>
        </Container>
    )
}
const CommonTail: React.FunctionComponent = () => {
    return (
        <BaseContainer title="常用字身練習" subtitle="請輸入字身對應的倉頡碼（一至三位）" backOnClick="/decode">
            <CommonTailContent></CommonTailContent>
        </BaseContainer>
    )
}

export default CommonTail;