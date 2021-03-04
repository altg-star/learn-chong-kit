import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Container, List, ListItem, Typography } from "@material-ui/core";
import { ListItemProps } from "@material-ui/core";
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

interface IndexContainerProps {
    title: string;
    linkList: Array<{ href: string, title: string }>
}

const IndexContainer: React.FunctionComponent<IndexContainerProps> = (props: IndexContainerProps) => {
    const classes = useStyles();
    return (
        <Container fixed className={classes.container}>
            <Typography variant="h2">{props.title}</Typography>
            <List className={classes.list}>
                {
                    props.linkList.map(({ href, title }) => {
                        return (
                            <ListItemLink href={href}>{title}</ListItemLink>
                        )
                    })
                }
            </List>
        </Container>
    )
}

export default IndexContainer;