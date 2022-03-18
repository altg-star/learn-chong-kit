import React from "react";
import { Grid } from "@mui/material";
import KeyButton from "./KeyButton";
import keysMapping from "../constants/keys-mapping.json";

const firstRowKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const secondRowKeys = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const thirdRowKeys = ["z", "x", "c", "v", "b", "n", "m"]

interface KeyboardLayoutProps {
    currentKey: string,
    color?: string,
    lightColor?: string,
    lightSet: Set<string>,
}

const KeyboardLayout: React.FunctionComponent<KeyboardLayoutProps> = ({ currentKey, color, lightColor, lightSet }: KeyboardLayoutProps) => {
    return (
        <>
<<<<<<< HEAD
            <Grid container spacing={2}>
                <Grid item container spacing={2}>
=======
            <Grid container spacing={2} justify="center">
                <Grid item container spacing={1} justify="center">
>>>>>>> eb4ec2e54a9aec5ec1bd0980af452527e5fa53cd
                    {
                        firstRowKeys.map((key) => {
                            return <Grid key={key} item xs={1}>
                                <KeyButton key={key} code={lightSet.has(key) ? lightColor || "#dce775" : color || "#64b5f6"}>
                                    {lightSet.has(key) ? keysMapping?.find(({ en }) => en === key)?.zh || key : ""}
                                </KeyButton>
                            </Grid>
                        })
                    }
                </Grid>
                <Grid item container spacing={1} justify="center">
                    {
                        secondRowKeys.map((key) => {
                            return <Grid key={key} item xs={1} >
                                <KeyButton key={key} code={lightSet.has(key) ? lightColor || "#dce775" : color || "#64b5f6"}>
                                    {lightSet.has(key) ? keysMapping?.find(({ en }) => en === key)?.zh || key : ""}
                                </KeyButton>
                            </Grid>
                        })
                    }
                    <Grid item style={{ paddingRight: "24px" }}></Grid>
                </Grid>
                <Grid item container spacing={1} justify="center">
                    {
                        thirdRowKeys.map((key) => {
                            return <Grid key={key} item xs={1}>
                                <KeyButton key={key} code={lightSet.has(key) ? lightColor || "#dce775" : color || "#64b5f6"}>
                                    {lightSet.has(key) ? keysMapping?.find(({ en }) => en === key)?.zh || key : ""}
                                </KeyButton>
                            </Grid>
                        })
                    }
                    <Grid item style={{ paddingRight: "56px" }}></Grid>
                    <Grid item style={{ paddingRight: "56px" }}></Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default KeyboardLayout;