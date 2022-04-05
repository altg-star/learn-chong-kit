import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { Container, Box, Typography, List, ListItem } from "@mui/material";
//hooks
import useBreakpoint from "../../hooks/useBreakpoint";
//components
import BaseContainer from "../../components/base/BaseContainer";
import Dialog from "../../components/general/Dialog";
//static
import articlesJSON from "../../constants/article/article.json";
import useCountDown from "../../hooks/Countdown";
const articles = articlesJSON as [{ name: string, content: string }];

type SpeedContentProps = {
    currentKey?: string,
    character?: { content: string },
    emptyKeyList?: boolean,
    finishTime: boolean,
    setFinishArticle: React.Dispatch<React.SetStateAction<boolean>>,
    setEndData: React.Dispatch<React.SetStateAction<{ total: number, wrong: number }>>
}
const SpeedContent: React.FunctionComponent<SpeedContentProps> = ({ currentKey, character, emptyKeyList, finishTime, setFinishArticle, setEndData }: SpeedContentProps) => {
    const theme = useTheme();
    const breakpoints = useBreakpoint();
    const PER_PAGE = breakpoints === "xs" || breakpoints === "sm" ? 3 : 5;
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
        if ((inputLines.length > articleLines.current.length && inputLines[inputLines.length - 2].length === articleLines.current[articleLines.current.length - 1].length) || finishTime) {
            let total = 0;
            let wrong = 0;
            inputLines.forEach((item: string, index: number) => {
                const inputs = item.split("");
                total = total + inputs.length;
                for (let i = 0; i < inputs.length; i++) {
                    if (articleLines.current[index][i] !== inputs[i]) {
                        wrong++;
                    }
                }
            });
            setEndData({ total, wrong });
            if (!finishTime) setFinishArticle(true);
        }
    }, [inputLines, inputLines.length, articleLines, finishTime, setEndData, setFinishArticle]);

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
                <Box sx={{ display: "flex" }}>
                    {inputLines[i] &&
                        inputLines[i].split("").map(((item, index) =>
                            articleLines.current[i][index] === item ?
                                (<Typography key={index}>{item}</Typography>) :
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
    const navigate = useNavigate();
    const [settingDialogOnOff, setSettingDialogOnoff] = useState<boolean>(true);
    const [selectedTime, setSelectedTime] = useState<number>(0);
    const [timeLeft, setTimeLeft, timerEnable, start] = useCountDown(0);
    const [finishTime, setFinishTime] = useState<boolean>(false);
    const [finishArticle, setFinishArticle] = useState<boolean>(false);
    const [endData, setEndData] = useState({ total: 0, wrong: 0 });

    useEffect(() => {
        if (selectedTime && !timeLeft && start) {
            setFinishTime(true);
            timerEnable(false);
        } else if (start && finishArticle) {
            timerEnable(false);
        }
    }, [selectedTime, timeLeft, start, timerEnable, finishArticle])

    const settingDialogOnSubmit = useCallback(() => {
        setTimeLeft(selectedTime * 60);
        timerEnable(true);
        setSettingDialogOnoff(false);
    }, [selectedTime, timerEnable, setTimeLeft]);

    const settingDialogOnClose = useCallback(() => {
        setSettingDialogOnoff(false);
    }, []);

    return (
        <>
            {!settingDialogOnOff &&
                <BaseContainer title="速度測試" subtitle="" backOnClick="/" typing leftMenu={<h2>{timeLeft}</h2>}>
                    <SpeedContent finishTime={finishTime} setEndData={setEndData} setFinishArticle={setFinishArticle}></SpeedContent>
                </BaseContainer>
            }
            <Dialog open={settingDialogOnOff && (!finishTime && !finishArticle)} title="請選擇測試時間" onSubmit={settingDialogOnSubmit} onClose={settingDialogOnClose}>
                <List sx={{ pt: 0 }}>
                    <ListItem button onClick={() => setSelectedTime(1)} selected={selectedTime === 1}>
                        1 分鐘
                    </ListItem>
                    <ListItem button onClick={() => setSelectedTime(2)} selected={selectedTime === 2}>
                        2 分鐘
                    </ListItem>
                    <ListItem button onClick={() => setSelectedTime(10)} selected={selectedTime === 10}>
                        10 分鐘
                    </ListItem>
                </List>
            </Dialog>
            <Dialog open={finishTime || finishArticle} title="成績" onSubmit={() => { navigate("/") }} closeButton={false} onClose={() => { }}>
                <List sx={{ pt: 0 }}>
                    <ListItem>
                        時　間： {(selectedTime * 60 - timeLeft) < 60 ? `${selectedTime * 60 - timeLeft} 秒` : `${Math.floor((selectedTime * 60 - timeLeft) / 60)} 分 ${(selectedTime * 60 - timeLeft) % 60} 秒`}
                    </ListItem>
                    <ListItem>
                        準確度： {Math.round((endData.total - endData.wrong) / endData.total * 100.00 * 100) / 100}%
                    </ListItem>
                    <ListItem>
                        速度： 每分鐘 {Math.floor((endData.total - endData.wrong) / (selectedTime * 60 - timeLeft) * 60)} 字
                    </ListItem>
                </List>
            </Dialog >
        </>
    )
}

export default Speed;