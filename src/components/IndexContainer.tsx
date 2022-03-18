import React from "react";
import { Container, List, ListItem, Typography } from "@mui/material";
import { ListItemProps } from "@mui/material";

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

interface IndexContainerProps {
    title: string;
    linkList: Array<{ href: string, title: string }>
}

const IndexContainer: React.FunctionComponent<IndexContainerProps> = (props: IndexContainerProps) => {
    return (
        <Container fixed>
            <Typography variant="h2">{props.title}</Typography>
            <List>
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