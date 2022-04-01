import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { Container, Box, Typography } from "@mui/material";
//hooks
import useBreakpoint from "../../hooks/useBreakpoint";
//components
import BaseContainer from "../../components/base/BaseContainer";

//static
import articlesJSON from "../../constants/article/article.json";
const articles = articlesJSON as [{ name: string, content: string }];
type SpeedContentProps = {
    currentKey?: string,
    character?: { content: string },
    emptyKeyList?: boolean,
}

const SpeedContent: React.FunctionComponent<SpeedContentProps> = ({ currentKey, character, emptyKeyList }: SpeedContentProps) => {
    const theme = useTheme();
    const breakpoints = useBreakpoint();
    const PER_PAGE = breakpoints === "xs" || breakpoints === "sm" ? 3 : 5;
    const navigate = useNavigate();
    const [inputLines, setInputLines] = useState<Array<string>>([]);
    const articleLines = useRef<Array<string>>(articles[Math.floor(Math.random() * articles.length)].content.split("\n"));
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        if (!character) return;
        setInputLines(lines => {
            if (lines.length === 0) {
                lines[0] = character.content;
                return lines;
            }
            const lastIndex = lines.length - 1;
            const currentLine = lines[lastIndex];
            if (currentLine.length < articleLines.current[lastIndex].length) {
                lines[lastIndex] = currentLine.concat(character.content);
                if ((lines[lastIndex].length === articleLines.current[lastIndex].length)) {
                    lines[lastIndex + 1] = "";
                    if ((lastIndex + 1) % PER_PAGE === 0) {
                        //go to next page
                        setCurrentPage(previous => previous + 1);
                    }
                }
                return lines;
            } else {
                //new
                lines[lastIndex + 1] = character.content;
                return lines;
            }
        });
    }, [character, PER_PAGE]);

    useEffect(() => {
        if(inputLines.length > articleLines.current.length && inputLines[inputLines.length - 2].length === articleLines.current[articleLines.current.length - 1].length) {
            navigate("/");
        }
    }, [inputLines, inputLines.length, articleLines, navigate])

    useEffect(() => {
        //backspace
        if (currentKey === "backspace" && emptyKeyList) {
            setInputLines(lines => {
                if (lines.length === 0 || lines[0] === "") return lines; //empty
                let lastIndex = lines.length - 1;
                const currentLine = lines[lastIndex];
                if (currentLine.length === 0) {
                    //no character of currentLine
                    if ((lastIndex) % PER_PAGE === 0) {
                        //go to previous page
                        setCurrentPage(previous => previous - 1);
                    }
                    lines = lines.slice(0, -1);
                    lastIndex--;
                    lines[lastIndex] = lines[lastIndex].slice(0, -1);
                    return lines;
                }
                lines[lastIndex] = lines[lastIndex].slice(0, -1);
                return lines;
            })
        }
    }, [currentKey, emptyKeyList, PER_PAGE])

    //view
    let rows = [];
    for (let i = (currentPage * PER_PAGE); i < ((currentPage + 1) * PER_PAGE); i++) {
        rows.push(
            <Box key={i}>
                <Typography>{articleLines.current[i]}</Typography>
                <Box sx={{ display: "flex"}}>
                    {inputLines[i] &&
                        inputLines[i].split("").map(((item, index) =>
                            articleLines.current[i][index] === item ?
                                (<Typography key={index}>{item}</Typography>):
                                (<Typography key={index} sx={{ color: "#FF0000" }}>{item}</Typography>)
                        ))
                    }
                </Box>
            </Box>
        )
    }

    return (
        <Container
            sx={{
                paddingTop: "16px",
                display: "grid",
                gap: "8px",
                gridTemplateRows: "16% 16% 16% 16% 16%",
                [theme.breakpoints.down('sm')]: {
                    gridTemplateRows: "30% 30% 30%"
                },
                justifyContent: "center"
            }}
        >
            {rows}
        </Container>
    )
}
const Speed: React.FunctionComponent = () => {
    return (
        <BaseContainer title="文章練習" subtitle="" backOnClick="/" typing>
            <SpeedContent></SpeedContent>
        </BaseContainer>
    )
}

export default Speed;