import React from "react";

// ui
import { Grid, } from "@mui/material";
// components
import KeyButton from "./KeyButton";

import keysMapping from "../../constants/keys-mapping.json";

const keyTransalte = (keyMap: Array<string>): Array<string> => {
    return keyMap.map((item) => {
        const mapping = keysMapping.find(({en}: {en: string}) => en === item);
        return mapping ? mapping.zh : item
    });
}

const firstRowKeys = keyTransalte(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]);
const secondRowKeys = keyTransalte(["/", "a", "s", "d", "f", "g", "h", "j", "k", "l", "/"]);
const thirdRowKeys = keyTransalte(["","z", "x", "c", "v", "b", "n", "m", "", ""]);
const spaceRowKeys = keyTransalte(["", "", "space", "", ""]);



interface KeyboardLayoutProps {
}

const KeyboardLayout: React.FunctionComponent<KeyboardLayoutProps> = (props: KeyboardLayoutProps) => {
    return (
        <>
            <Grid container sx={{ padding: "4px" }}>
                <Grid item xs={12} sx={{ display: "flex", jutifiyContent: "center", gap: "4px" }}>
                    {
                        firstRowKeys.map((item: string, index: number) => {
                            return (
                                <KeyButton key={index} item={item}></KeyButton>
                            )
                        })
                    }
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", jutifiyContent: "center", gap: "4px", paddingTop: "4px" }}>
                    {
                        secondRowKeys.map((item: string, index: number) => {
                            return (
                                <KeyButton key={index} item={item}></KeyButton>
                            )
                        })
                    }
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", jutifiyContent: "center", gap: "4px", paddingTop: "4px" }}>
                    {
                        thirdRowKeys.map((item: string, index: number) => {
                            return (
                                <KeyButton key={index} item={item}></KeyButton>
                            )
                        })
                    }
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", jutifiyContent: "center", gap: "4px", paddingTop: "4px" }}>
                    {
                        spaceRowKeys.map((item: string, index: number) => {
                            return (
                                <KeyButton key={index} item={item}></KeyButton>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default KeyboardLayout;