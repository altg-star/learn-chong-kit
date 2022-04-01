import React, { useRef, useEffect, useState } from "react";
//ui
import { Container, Typography } from "@mui/material";
//components
import BaseContainer from "../../components/base/BaseContainer";

//static
import WordQuestion from "../../constants/question/word-practice-question.json";
const questions = WordQuestion as Array<string>;

type WordContentProps = {
    currentKey?: string,
    character?: { content: string },
    emptyKeyList?: boolean,
}
const WordContent: React.FunctionComponent<WordContentProps> = ({ currentKey, character, emptyKeyList }: WordContentProps) => {
    const currentQuestion = useRef<string>(questions[Math.floor(Math.random() * questions.length)]);
    const [characters, setCharacters] = useState<string>("");
    useEffect(() => {
        if (!character || character.content === "") return;
        setCharacters(item => {
            if (item.length < currentQuestion.current.length) {
                return item.concat(character.content)
            } else {
                return item;
            }
        });
    }, [character]);

    useEffect(() => {
        if(currentKey === "backspace" && emptyKeyList) {
            setCharacters(char => char.slice(0, -1));
        }
    }, [currentKey, emptyKeyList])

    useEffect(() => {
        //check answer
        if (characters.length === 0 || currentQuestion.current.length === 0) return;
        if (characters.length < currentQuestion.current.length) return;
        if (characters === currentQuestion.current) {
            // correct
            currentQuestion.current = questions[Math.floor(Math.random() * questions.length)];
        }
        setCharacters("");
    }, [characters])

    return (
        <Container sx={{ display: "grid", gap: "16px", justifyContent: "center", gridTemplateRows: "50% 50%" }}>
            <Typography variant="h4" sx={{ display: "grid", alignItems: "end"}}>{currentQuestion.current}</Typography>
            <Typography variant="h4" sx={{}}>{characters}</Typography>
        </Container>
    )
}
const Word: React.FunctionComponent = () => {
    return (
        <BaseContainer title="詞組練習" subtitle="請輸入對應詞組" backOnClick="/decode" typing>
            <WordContent></WordContent>
        </BaseContainer>
    )
}

export default Word;