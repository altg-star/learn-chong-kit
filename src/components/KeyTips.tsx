import React, { ReactNode, useState } from 'react';
import { Snackbar, Slide, Grid, SlideProps } from "@mui/material";
import KeyboardEventHandler from "react-keyboard-event-handler";
import keysMapping from "../constants/keys-mapping.json";
//question
import AssociateCodePracticeQuestion from "../constants/question/associate-code-practice-question.json";
const question = AssociateCodePracticeQuestion as {
    [key: string]: Array<string>
};

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" style={{ justifyContent: "center" }} />;
}


const KeyTips = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [key, setKey] = useState<string>("");
    const [content, setContent] = useState<ReactNode>("");
    const handleKeyOnDown = (key: string, e: KeyboardEvent) => {
        setKey(question[key.slice(4)][0]);
        setContent(question[key.slice(4)].map((item) => item.indexOf(".") !== -1 ? <img src={`/assets/characters/${item}`} alt="n/a"></img> : <span>{item}</span>));
        setOpen(true)
    }
    return (
        <>
            <KeyboardEventHandler
                handleKeys={keysMapping.filter(({ en }) => en !== 'x' && en !== 'z').map(({ en }) => `alt+${en}`)}
                handleEventType="keydown"
                onKeyEvent={(key: string, e: KeyboardEvent) => handleKeyOnDown(key, e)} />
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={5000}
                TransitionComponent={SlideTransition}
                message={
                    <Grid container>
                        <Grid item xs={3}>
                            字根
                        </Grid>
                        <Grid item xs={9}>
                            輔助字型
                        </Grid>
                        <Grid item xs={3}>
                            {key}
                        </Grid>
                        <Grid item xs={9}>
                            {content}
                        </Grid>
                    </Grid>
                }
                key="key-tips"
            />
        </>
    )
}

export default KeyTips