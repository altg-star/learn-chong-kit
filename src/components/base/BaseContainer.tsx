import React, { useCallback, useState, useRef, useEffect } from "react";
import * as R from "ramda";
import { useTheme } from '@mui/material/styles';
import KeyboardEventHandler from "react-keyboard-event-handler";
import keysMapping from "../../constants/keys-mapping.json";
import characterMapping from "../../constants/character-mapping.json";
// ui
import { Container, Box, Typography, ButtonGroup, Button } from "@mui/material";
// components
import MenuBar from "../menu/MenuBar";
import KeyboardLayout from "../keyboard/KeyboardLayout";

//constant
const constantKeys = keysMapping.map(({ en }: { en: string }) => en);
const cp = characterMapping as any;

const keyTranslate = (keyMap: Array<string>): Array<{ en: string, zh: string }> => {
    return keyMap.map((item) => {
        const mapping = keysMapping.find(({ en }: { en: string }) => en === item);
        return mapping ? mapping : { en: item, zh: item }
    });
}

type BaseContainerProps = {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    backOnClick?: string | Function;
    typing?: boolean;
}

const BaseContainer: React.FunctionComponent<BaseContainerProps> = React.memo((props: BaseContainerProps) => {
    const theme = useTheme();
    const [currentKey, setCurrentKey] = useState<string>("");
    const [currentKeyList, setCurrentKeyList] = useState<Array<string>>([]);
    const [selectCharacters, setSelectCharacters] = useState<Array<string>>([]);
    const currentMapping = useRef<any>(null);
    const [character, setCharacter] = useState<{ content: string }>({ content: "" });
    const emptyKeyList = useRef<boolean>(false);
    useEffect(() => {
        emptyKeyList.current = currentKeyList.length === 0;
    }, [currentKeyList.length])
    //select character
    const handleNumberOnDown = useCallback((key: string | number) => {
        const k = typeof key === 'string' ? parseInt(key) : key + 1;
        if (!props.typing) return;
        if (selectCharacters.length === 0 || selectCharacters.length < k - 1) return;
        setCharacter({ content: selectCharacters[k - 1] });
        //reset
        setSelectCharacters([]);
        currentMapping.current = null;
    }, [props.typing, selectCharacters]);
    const handleKeyOnUp = () => {
        setCurrentKey("");
    }
    const handleKeyOnDown = useCallback((key: string) => {
        if(key === "/" || key === "*") return;
        setCurrentKey(key.toLowerCase());
        //typing
        if (!props.typing) return;
        if (selectCharacters.length > 0) return;
        if (key === "space") {
            //enter
            if (currentMapping.current && currentMapping.current["+"]) {
                if (currentMapping.current["+"].length === 1) {
                    setCharacter({ content: String.fromCharCode(currentMapping.current["+"][0]) });
                } else {
                    setSelectCharacters(currentMapping.current["+"].map((item: number) => String.fromCharCode(item)));
                }
            }
            currentMapping.current = null;
            setCurrentKeyList([]);
        } else if (key === "backspace") {
            //delete
            const newInput = currentKeyList.slice(0, -1);
            setCurrentKeyList(newInput);
            currentMapping.current = R.pathOr(null, Array.from(newInput))(cp);
        } else {
            if (currentKeyList.length === 0) {
                setCurrentKeyList(current => [...current, key]);
                if (cp[`${key}`]) {
                    currentMapping.current = cp[`${key}`];
                }
            } else if (currentKeyList.length < 5) {
                setCurrentKeyList(current => [...current, key]);
                if (currentMapping.current && currentMapping.current[`${key}`]) {
                    currentMapping.current = currentMapping.current[`${key}`]
                } else {
                    currentMapping.current = null;
                }
            }
        }
    }, [props.typing, selectCharacters.length, currentKeyList]);
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
                <Container sx={{ display: "flex", height: "80vh" }}>{addPropsToChildren(props.children, { currentKey, character: character, emptyKeyList: emptyKeyList.current })}</Container>
                {props.typing && (
                    <Box mb={1} sx={{ display: "flex", width: "100%" }}>
                        <Box sx={{ flex: "none", width: "40%", display: "flex" }}>
                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                {
                                    selectCharacters && keyTranslate(selectCharacters).map(({ zh }, index) => (
                                        <Button key={zh} onClick={() => handleNumberOnDown(index)} sx={{
                                            fontSize: theme.typography.htmlFontSize,
                                            fontWeight: theme.typography.fontWeightMedium,
                                            minWidth: theme.typography.htmlFontSize * 6,
                                            height: theme.typography.htmlFontSize * 2,
                                        }}>
                                            {`${index + 1}.${zh}`}
                                        </Button>
                                    ))
                                }
                            </ButtonGroup>
                        </Box>
                        <Box sx={{ flex: "none", width: "20%", display: "flex", justifyContent: "center" }}>
                            <Typography sx={{
                                fontSize: theme.typography.htmlFontSize,
                                fontWeight: theme.typography.fontWeightMedium,
                                minWidth: theme.typography.htmlFontSize * 6,
                                height: theme.typography.htmlFontSize * 2,
                                padding: "4px",
                                borderStyle: "solid"
                            }}>
                                {currentKeyList && currentKeyList.length > 0 && keyTranslate(currentKeyList).map(({ zh }) => zh).join("")}
                            </Typography>
                        </Box>
                    </Box>
                )}
                <Container disableGutters><KeyboardLayout currentKey={currentKey} changeKey={handleKeyOnDown} handleKeyOnUp={handleKeyOnUp} /></Container>
            </Container>
            {props.typing && (
                <KeyboardEventHandler
                    handleKeys={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                    handleEventType="keydown"
                    onKeyEvent={(key: string) => handleNumberOnDown(key)}
                />
            )}
            <KeyboardEventHandler
                handleKeys={[...constantKeys, "space", "backspace"]}
                handleEventType="keyup"
                onKeyEvent={() => handleKeyOnUp()}
            />
            <KeyboardEventHandler
                handleKeys={[...constantKeys, "space", "backspace"]}
                handleEventType="keydown"
                onKeyEvent={(key: string) => handleKeyOnDown(key)}
            />
        </>
    )
});

export default BaseContainer;