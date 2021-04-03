import React, { useState, useCallback, useEffect } from "react";
import * as R from "ramda";
import { ArticleContainer } from "../../components";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

const wine = `君不見黃河之水天上來，奔流到海不復回。
君不見高堂明鏡悲白髮，朝如青絲暮成雪。
人生得意須盡歡，莫使金樽空對月。
天生我材必有用，千金散盡還復來。
烹羊宰牛且爲樂，會須一飲三百杯。
岑夫子，丹丘生。將進酒，杯莫停。
與君歌一曲，請君爲我側耳聽。
鐘鼓饌玉不足貴，但願長醉不願醒。
古來聖賢皆寂寞，惟有飲者留其名。
陳王昔時宴平樂，斗酒十千恣讙謔。
主人何為言少錢？徑須沽取對君酌。
五花馬，千金裘。呼兒將出換美酒，與爾同銷萬古愁。`

const Line = styled(Typography)`
    font-size: 24px;
    min-height: 36px;
`

function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
        setTick(tick => tick + 1);
    }, [])
    return update;
}


const ArticlePracticeIndex: React.FunctionComponent = () => {
    const articleArray = wine.split("\n");
    const [character, setCharacter] = useState<string>("");
    const [inputArray, setInputArray] = useState<Array<string>>(articleArray.map(() => ""));
    const [currentLine, setCurrentLine] = useState<number>(0);
    const forceUpdate = useForceUpdate();

    const handleNextLine = (nextCharacter: string) => {
        inputArray[currentLine] = inputArray[currentLine].concat(nextCharacter)
        setInputArray(inputArray)
        if (inputArray[currentLine].length === articleArray[currentLine].length)
            setCurrentLine(currentLine + 1);
    }

    const handleBackSpaceOnDown = () => {
        if (inputArray[currentLine].length > 0) {
            inputArray[currentLine] = inputArray[currentLine].slice(0, inputArray[currentLine].length - 1);
            setInputArray(inputArray);
            forceUpdate();
        }
    }

    //update
    useEffect(() => {
        handleNextLine(character);
        forceUpdate();
    }, [character]);

    return (
        <ArticleContainer
            title="文章練習"
            previousPath="/"
            setCharacter={(str) => setCharacter(str)}
            handleBackSpaceOnDown={() => handleBackSpaceOnDown()}
        >
            <div style={{ paddingLeft: "16px" }}>
                {
                    articleArray.map((item, i) =>
                        <React.Fragment key={i}>
                            <Line>{item}</Line>
                            <Line>{inputArray[i]}</Line>
                        </React.Fragment>
                    )
                }
            </div>
        </ArticleContainer>
    )
}

export default ArticlePracticeIndex;