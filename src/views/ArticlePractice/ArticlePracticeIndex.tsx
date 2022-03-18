import React, { useState, useCallback, useEffect, useMemo } from "react";
import { ArticleContainer } from "../../components";
import { Typography } from "@mui/material";

const wine = `君不見黃河之水天上來，奔流到海不復回。
君不見高堂明鏡悲白髮，朝如青絲暮成雪。
人生得意須盡歡，莫使金樽空對月。
天生我材必有用，千金散盡還復來。
烹羊宰牛且為樂，會須一飲三百杯。
岑夫子，丹邱生，將進酒，君莫停。
與君歌一曲，請君為我傾耳聽。
鐘鼓饌玉不足貴，但願長醉不用醒。
古來聖賢皆寂寞，唯有飲者留其名。
陳王昔時宴平樂，斗酒十千恣歡謔。
主人何為言少錢，徑須沽取對君酌。
五花馬，千金裘，
呼兒將出換美酒，與爾同銷萬古愁。`

function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
        setTick(tick => tick + 1);
    }, [])
    return update;
}


const ArticlePracticeIndex: React.FunctionComponent = () => {
    const articleArray = wine.split("\n");
    const totalPage = Math.ceil(articleArray.length / 5);
    const [character, setCharacter] = useState<string>("");
    const [inputArray, setInputArray] = useState<Array<string>>(articleArray.map(() => ""));
    const [currentLine, setCurrentLine] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const forceUpdate = useForceUpdate();

    const content = useMemo(
        (): React.ReactNode => {
            const data = [];
            for (let i = 0; i < 5; i++) {
                data.push(
                    <React.Fragment key={i + currentPage * 5}>
                        <Typography>{articleArray[i + currentPage * 5]}</Typography>
                        <Typography>{inputArray[i + currentPage * 5]}</Typography>
                    </React.Fragment>
                )
            }
            return data;
        },
        [articleArray, inputArray, currentPage]
    )

    const handleNextLine = (nextCharacter: string) => {
        inputArray[currentLine] = inputArray[currentLine].concat(nextCharacter)
        setInputArray(inputArray)
        if (inputArray[currentLine].length === articleArray[currentLine].length) {
            setCurrentLine(currentLine + 1);
            console.log(currentLine)
            if (currentLine + 1 === (currentPage + 1) * 5) {
                setCurrentPage(currentPage + 1)
                forceUpdate();
            }
        }
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
            setCharacter={(str) => {
                if (str === character) {
                    handleNextLine(str);
                    forceUpdate();
                } else {
                    setCharacter(str);
                }
            }}
            handleBackSpaceOnDown={() => handleBackSpaceOnDown()}
        >
            <div style={{ paddingLeft: "16px" }}>
                {content}
            </div>
        </ArticleContainer>
    )
}

export default ArticlePracticeIndex;