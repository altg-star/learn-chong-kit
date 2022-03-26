import React, { useRef, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
//ui
import { Container, Typography, Box } from "@mui/material";
//components
import BaseContainer from "../../components/base/BaseContainer";

//static
import keysMapping from "../../constants/keys-mapping.json";
import SingleCharacterQuestion from "../../constants/question/single-character-question.json";
import StructureTipsJson from "../../constants/structure-tips.json";
const possibleCharactersList = "abcdefghijklmnopqrstuvwxy";
const MAX_INPUT = 5;
const questions = SingleCharacterQuestion as Array<{ q: string, a: string, s: string }>
const structureTips = StructureTipsJson as { [key: string]: string }
const keyTransalte = (keyMap: Array<string>): Array<{ en: string, zh: string }> => {
    return keyMap.map((item) => {
        const mapping = keysMapping.find(({ en }: { en: string }) => en === item);
        return mapping ? mapping : { en: item, zh: item }
    });
}

type SingleCharacterContentProps = {
    currentKey?: string;
}
const SingleCharacterContent: React.FunctionComponent<SingleCharacterContentProps> = ({ currentKey }: SingleCharacterContentProps) => {
    const theme = useTheme();
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const currentQuestion = useRef<string>(randomQuestion.q);
    const currentAnswer = useRef<string>(randomQuestion.a);
    const currentTips = useRef<string>(randomQuestion.s);
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
                currentTips.current = nextQuestion.s;
            }
            currentInput.current = "";
        } else if (currentInput.current.length < MAX_INPUT && currentKey && possibleCharactersList.indexOf(currentKey) !== -1) {
            currentInput.current = currentInput.current.concat(currentKey);
        }
    }, [currentKey]);

    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h4" sx={{ flex: "none", height: "40%", display: "flex", alignItems: "end"  }}>{currentQuestion.current}</Typography>
            <Box sx={{ display: "flex", marginTop: "16px" }}>
                <Typography variant="h6" sx={{ paddingRight: "16px" }}>取碼數目：{currentAnswer.current.length}</Typography>
                <Typography variant="h6" sx={{  }}>結構：{structureTips[currentTips.current]}</Typography>
            </Box>
            <Typography variant="h4" sx={{
                minWidth: theme.typography.htmlFontSize * 13,
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
const SingleCharacter: React.FunctionComponent = () => {
    return (
        <BaseContainer title="單字練習" subtitle="請輸入字對應的倉頡碼" backOnClick="/decode">
            <SingleCharacterContent></SingleCharacterContent>
        </BaseContainer>
    )
}

export default SingleCharacter;