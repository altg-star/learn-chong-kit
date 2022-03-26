import React, { useCallback, useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import keysMapping from "../../constants/keys-mapping.json";
// ui
import { Container } from "@mui/material";
// components
import MenuBar from "../menu/MenuBar";
import KeyboardLayout from "../keyboard/KeyboardLayout";

//constant
const constantKeys = keysMapping.map(({ en }: { en: string }) => en)

type BaseContainerProps = {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    backOnClick?: string | Function;
    typing?: boolean;
}

const BaseContainer: React.FunctionComponent<BaseContainerProps> = React.memo((props: BaseContainerProps) => {
    const [currentKey, setCurrentKey] = useState<string>("");
    const [currentKeyList, setCurrentKeyList] = useState<Array<string>>([]);
    const handleKeyOnUp = () => {
        setCurrentKey("");
    }
    const handleKeyOnDown = (key: string, e: KeyboardEvent) => {
        setCurrentKey(key.toLowerCase());
        //typing
        if (props.typing) {
            if (key === "space") {
                //enter
            } else if (key === "backspace") {
                //delete
                const newKeyList = currentKeyList.slice(0, -1);
                setCurrentKeyList(newKeyList);
            } else {
                if (currentKeyList.length < 5) {
                    const newKeyList = [...currentKeyList, key];
                    setCurrentKeyList(newKeyList);
                }
            }
        }
    }
    const handleChangeKey = (key: string) => {
        setCurrentKey(key);
        //typing
        if (props.typing) {
            if (key === "space") {
                //enter
            } else if (key === "backspace") {
                //delete
                const newKeyList = currentKeyList.slice(0, -1);
                setCurrentKeyList(newKeyList);
            } else if (key !== "") {
                if (currentKeyList.length < 5) {
                    const newKeyList = [...currentKeyList, key];
                    setCurrentKeyList(newKeyList);
                }
            }
        }
    };
    const addPropsToReactElement = (element: React.ReactNode, props: any) => {
        if (React.isValidElement(element)) {
            return React.cloneElement(element, props);
        }
        return element
    }
    const addPropsToChildren = (children: React.ReactNode, props: any) => {
        if (!Array.isArray(children)) {
            return addPropsToReactElement(children, props)
        }
        return children.map(childElement =>
            addPropsToReactElement(childElement, props)
        )
    }
    return (
        <>
            <Container maxWidth="md" disableGutters sx={{ height: "100vh", maxHeight: "-webkit-fill-available", position: "relative", display: "flex", flexDirection: "column" }}>
                <MenuBar title={props.title} subtitle={props.subtitle} backOnClick={props.backOnClick} />
                <Container sx={{ display: "flex", height: "80vh" }}>{addPropsToChildren(props.children, { currentKey })}</Container>
                <Container disableGutters sx={{ display: "flex" }}><KeyboardLayout currentKey={currentKey} changeKey={handleChangeKey} currentKeyList={currentKeyList} typing={props.typing} /></Container>
            </Container>
            <KeyboardEventHandler
                handleKeys={[...constantKeys, "space", "backspace"]}
                handleEventType="keyup"
                onKeyEvent={() => handleKeyOnUp()}
            />
            <KeyboardEventHandler
                handleKeys={[...constantKeys, "space", "backspace"]}
                handleEventType="keydown"
                onKeyEvent={(key: string, e: KeyboardEvent) => handleKeyOnDown(key, e)}
            />
        </>
    )
});

export default BaseContainer;