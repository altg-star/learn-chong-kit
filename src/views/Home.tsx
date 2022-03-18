import React from "react";
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

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

const Home: React.FunctionComponent = () => {
    const classes = useStyles();
    return (
        <Container fixed className={classes.container}>
            <Typography variant="h2">開開心心學倉頡</Typography>
            <List className={classes.list}>
                <ListItemLink href="/tutorial">基礎教學</ListItemLink>
                <ListItemLink href="/press-key-practice">按鍵練習</ListItemLink>
                <ListItemLink href="/tutorial">折碼練習</ListItemLink>
                <ListItemLink href="/tutorial">詞組練習</ListItemLink>
                <ListItemLink href="/tutorial">文章練習</ListItemLink>
                <ListItemLink href="/tutorial">速度測試</ListItemLink>
            </List>
        </Container>
    )
}

export default Home;