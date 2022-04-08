import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//ui
import { styled } from "@mui/system";
import { Container, IconButton } from "@mui/material";
//components
import MenuBar from "../components/menu/MenuBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
//data
import associate from "../constants/question/associate-code-practice-question.json";
const associateCode = associate as { [key: string]: Array<string> };
const mappingLeft: { [key: string]: string } = {
    "A": "日",
    "B": "月",
    "C": "金",
    "D": "木",
    "E": "水",
    "F": "火",
    "G": "土",
    "H": "竹",
    "I": "戈",
    "J": "十",
    "K": "大",
    "L": "中",
    "M": "一",
}

const mappingRight: { [key: string]: string } = {
    "N": "弓",
    "O": "人",
    "P": "心",
    "Q": "手",
    "R": "口",
    "S": "尸",
    "T": "廿",
    "U": "山",
    "V": "女",
    "W": "田",
    "Y": "卜",
    "X": "難",
    "Z": "重",
}
const Base = styled('div')`
    display: flex;
    justify-content: center;
    padding-top: 16px;
    gap: 16px;
    table {
        border-collapse: collapse;
        width: 40%;
    }
    td,
    th {
        border: 1px solid #ddd;
        text-align: left;
        padding: 8px;
    }
    td > div {
        display: flex;
        gap: 4px;
    }
`;

const Tutorial: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const [pageIndex, setPageIndex] = useState<number>(0);
    const pageTitle = useRef("字母表");
    const changePage = (value: number) => {
        setPageIndex(current => {
            if (current + value >= 0 && current + value <= 1) {
                return current + value;
            } else return current;
        });
    }
    return (
        <Container maxWidth="md" disableGutters sx={{ height: "100vh", maxHeight: "-webkit-fill-available", position: "relative", display: "flex", flexDirection: "column" }}>
            <MenuBar title="基礎教學" subtitle={pageTitle.current} backOnClick={() => navigate("/")}>
                <IconButton component="span" onClick={() => changePage(-1)}>
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton component="span" onClick={() => changePage(1)}>
                    <ChevronRightIcon />
                </IconButton>
            </MenuBar>

            {pageIndex === 0 ?
                <Base>
                    <table>
                        <thead>
                            <tr>
                                <th>英文字母</th>
                                <th>倉頡字母</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(mappingLeft).map((key: string) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{mappingLeft[key]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th>英文字母</th>
                                <th>倉頡字母</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(mappingRight).map((key: string) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{mappingRight[key]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Base>
                : pageIndex === 1 ?
                    <Base>
                        <table>
                            <thead>
                                <tr>
                                    <th>倉頡字母</th>
                                    <th>輔助字型</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(associateCode).slice(0, 11).map((key: string) => (
                                    <tr key={key}>
                                        <td>{associateCode[key][0]}</td>
                                        <td><div>
                                            {associateCode[key].map((item) =>
                                                item.indexOf(".png") === -1 ? <span key={item}>{item}</span>: <img key={item} src={`/assets/characters/${item}`}></img>
                                            )}
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th>倉頡字母</th>
                                    <th>輔助字型</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(associateCode).slice(11, 23).map((key: string) => (
                                    <tr key={key}>
                                        <td>{associateCode[key][0]}</td>
                                        <td><div>
                                            {associateCode[key].map((item) =>
                                                item.indexOf(".png") === -1 ? <span key={item}>{item}</span> : <img key={item} src={`/assets/characters/${item}`}></img>
                                            )}
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Base>
                    : {}
            }
        </Container>
    )
}

export default Tutorial;