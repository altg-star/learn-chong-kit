import React from "react";

// ui
import { Container } from "@mui/material";
// components
import MenuBar from "../menu/MenuBar";
import KeyboardLayout from "../keyboard/KeyboardLayout";

type BaseContainerProps = {
    children: React.ReactChild;
    title: string;
    subtitle: string;
    backOnClick?: string | Function;
}

const BaseContainer: React.FunctionComponent<BaseContainerProps> = React.memo((props: BaseContainerProps) => {
    return (
        <Container maxWidth="md" disableGutters sx={{ height: "100vh", maxHeight: "-webkit-fill-available", position: "relative", display: "flex", flexDirection: "column" }}>
            <MenuBar title={props.title} subtitle={props.subtitle} backOnClick={props.backOnClick} />
            <Container sx={{ display: "flex", height: "80vh" }}>{props.children}</Container>
            <Container disableGutters sx={{ display: "flex" }}><KeyboardLayout /></Container>
        </Container>
    )
});

export default BaseContainer;