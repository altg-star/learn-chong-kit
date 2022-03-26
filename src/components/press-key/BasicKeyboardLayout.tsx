import React from "react";

// ui
import { Grid, } from "@mui/material";
// components
import BasicKeyButton from "./BasicKeyButton";

import keysMapping from "../../constants/keys-mapping.json";

const keyTransalte = (keyMap: Array<string>): Array<{ en: string, zh: string }> => {
    return keyMap.map((item) => {
        const mapping = keysMapping.find(({ en }: { en: string }) => en === item);
        return mapping ? mapping : { en: item, zh: item }
    });
}

const firstRowKeys = keyTransalte(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]);
const secondRowKeys = keyTransalte(["/", "a", "s", "d", "f", "g", "h", "j", "k", "l", "/"]);
const thirdRowKeys = keyTransalte(["*", "z", "x", "c", "v", "b", "n", "m", "*", "*"]);

type KeyLineGridProps = { keys: Array<{ en: string, zh: string }>; currentKey?: string; lightSet: Set<string> }
const KeyLineGrid: React.FunctionComponent<KeyLineGridProps> = (props: KeyLineGridProps) => {
    return (
        <Grid item xs={12} sx={{ display: "flex", jutifiyContent: "center", gap: "4px", padding: "2px 0 2px 0" }}>
            {
                props.keys.map((item: { en: string, zh: string }, index: number) => {
                    return (
                        <BasicKeyButton light={props.currentKey === item.en} key={index} item={item.zh} appear={props.lightSet.has(item.en)}></BasicKeyButton>
                    )
                })
            }
        </Grid>
    )
}

type BasicKeyboardLayoutProps = {
    currentKey?: string;
    lightSet: Set<string>;
}
const BasicKeyboardLayout: React.FunctionComponent<BasicKeyboardLayoutProps> = (props: BasicKeyboardLayoutProps) => {
    return (
        <Grid container>
            <KeyLineGrid keys={firstRowKeys} currentKey={props.currentKey} lightSet={props.lightSet}></KeyLineGrid>
            <KeyLineGrid keys={secondRowKeys} currentKey={props.currentKey} lightSet={props.lightSet}></KeyLineGrid>
            <KeyLineGrid keys={thirdRowKeys} currentKey={props.currentKey} lightSet={props.lightSet}></KeyLineGrid>
        </Grid>
    )
}

export default BasicKeyboardLayout;