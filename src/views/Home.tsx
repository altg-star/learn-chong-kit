import React from "react";
<<<<<<< HEAD
import { makeStyles, createStyles } from "@mui/styles";
import { Container, List, ListItem, Typography } from "@mui/material";
import { ListItemProps } from "@mui/material";
const useStyles = makeStyles(() =>
    createStyles({
        container: {
            paddingTop: "48px",
            paddingBottom: "48px",
            textAlign: "center",
            justifyContent: "center"
        },
        list: {
            width: "100%",
            "& .MuiListItem-root": {
                justifyContent: "center"
            }
        },
    }),
);
=======
import { IndexContainer } from "../components";
>>>>>>> eb4ec2e54a9aec5ec1bd0980af452527e5fa53cd

const linkList = [
    { "title": "基礎教學", "href": "/tutorial" },
    { "title": "按鍵練習", "href": "/key-practice" },
    { "title": "折碼練習", "href": "/decode-practice" },
    { "title": "文章練習", "href": "/article-practice" },
    { "title": "速度測試", "href": "/tutorial" },
]

const Home: React.FunctionComponent = () => {
    return (
        <IndexContainer title="學倉頡" linkList={linkList} />
    )
}

export default Home;