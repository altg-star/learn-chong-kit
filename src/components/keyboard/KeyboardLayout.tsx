import React from "react";
import { useTheme } from '@mui/material/styles';
// ui
import { Grid, Box, Typography } from "@mui/material";
// components
import KeyButton from "./KeyButton";

import keysMapping from "../../constants/keys-mapping.json";

const keyTransalte = (keyMap: Array<string>): Array<{ en: string, zh: string }> => {
    return keyMap.map((item) => {
        const mapping = keysMapping.find(({ en }: { en: string }) => en === item);
        return mapping ? mapping : { en: item, zh: item }
    });
}

const firstRowKeys = keyTransalte(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]);
const secondRowKeys = keyTransalte(["/", "a", "s", "d", "f", "g", "h", "j", "k", "l", "/"]);
const thirdRowKeys = keyTransalte(["*", "z", "x", "c", "v", "b", "n", "m", "*", "backspace"]);
const spaceRowKeys = keyTransalte(["*", "*", "space", "*", "*"]);

type KeyLineGridProps = { keys: Array<{ en: string, zh: string }>, changeKey: (item: string) => void, currentKey?: string }
const KeyLineGrid: React.FunctionComponent<KeyLineGridProps> = (props: KeyLineGridProps) => {
    return (
        <Grid item xs={12} sx={{ display: "flex", jutifiyContent: "center", gap: "4px", padding: "2px 0 2px 0" }}>
            {
                props.keys.map((item: { en: string, zh: string }, index: number) => {
                    return (
                        <KeyButton light={props.currentKey === item.en} key={index} item={item} onClick={props.changeKey}></KeyButton>
                    )
                })
            }
        </Grid>
    )
}

type KeyboardLayoutProps = {
    currentKey?: string;
    currentKeyList?: Array<string>;
    typing?: boolean;
    changeKey: (item: string) => void;
}
const KeyboardLayout: React.FunctionComponent<KeyboardLayoutProps> = (props: KeyboardLayoutProps) => {
    const theme = useTheme();
    return (
        <>
            <Grid container sx={{ padding: "4px" }}>
                {
                    props.typing && (
                        <Box mb={1} sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
                            <Typography sx={{
                                fontSize: theme.typography.htmlFontSize,
                                fontWeight: theme.typography.fontWeightMedium,
                                minWidth: theme.typography.htmlFontSize * 5 + 12,
                                height: theme.typography.htmlFontSize * 2,
                                padding: "4px",
                                borderStyle: "solid"
                            }}>
                                {props.currentKeyList && keyTransalte(props.currentKeyList).map(({zh}) => zh).join("")}
                            </Typography>
                        </Box>
                    )
                }
                <KeyLineGrid keys={firstRowKeys} changeKey={props.changeKey} currentKey={props.currentKey}></KeyLineGrid>
                <KeyLineGrid keys={secondRowKeys} changeKey={props.changeKey} currentKey={props.currentKey}></KeyLineGrid>
                <KeyLineGrid keys={thirdRowKeys} changeKey={props.changeKey} currentKey={props.currentKey}></KeyLineGrid>
                <KeyLineGrid keys={spaceRowKeys} changeKey={props.changeKey} currentKey={props.currentKey}></KeyLineGrid>
            </Grid>
        </>
    )
}

export default KeyboardLayout;