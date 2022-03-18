import React, { useState, useEffect } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
<<<<<<< HEAD:src/views/PressKeyPractice.tsx
import { Container } from "@mui/material";
import keysMapping from "../constants/keys-mapping.json";
import { KeyboardLayout } from "../components";
=======
import { Container, Paper, Typography } from "@material-ui/core";
import keysMapping from "../../constants/keys-mapping.json";
import { KeyboardLayout, InfoBox, Header } from "../../components";
import styled from "styled-components";

const PaperContainer = styled(Paper)`
    height: 576px;
    width: auto;
    padding: 16px;
`
>>>>>>> eb4ec2e54a9aec5ec1bd0980af452527e5fa53cd:src/views/KeyPractice/BasicKeyPractice.tsx

const PressKeyPractice: React.FunctionComponent = () => {
    // key process
    const [currentKey, setCurrentKey] = useState<string>("");
    const [lightSet, setLightSet] = useState<Set<string>>(new Set<string>());
    const [nonRandomSet, setNonRandomSet] = useState<Set<string>>(new Set<string>());
    const handleKeyOnUp = () => {
        setCurrentKey("");
    }
    const handleKeyOnDown = (key: string, e: KeyboardEvent) => {

        if (lightSet.has(key)) {
            nonRandomSet.delete(key);
            setNonRandomSet(nonRandomSet);
            lightSet.delete(key);
            setLightSet(lightSet);
        }
        setCurrentKey(key.toLowerCase());
    }

    // timer
    const [timeLeft, setTimeLeft] = useState(60);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (nonRandomSet.size !== 26) {
                let randomCharacter = Math.floor(Math.random() * 26);
                while (nonRandomSet.has(keysMapping[randomCharacter].en)) {
                    randomCharacter = Math.floor(Math.random() * 26);
                }
                nonRandomSet.add(keysMapping[randomCharacter].en);
                setNonRandomSet(nonRandomSet);
                lightSet.add(keysMapping[randomCharacter].en);
                setLightSet(lightSet);
            }
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
    });
    return (
        <>
            <KeyboardEventHandler
                handleKeys={keysMapping.map(({ en }) => en)}
                handleEventType="keyup"
                onKeyEvent={() => handleKeyOnUp()} />
            <KeyboardEventHandler
                handleKeys={keysMapping.map(({ en }) => en)}
                handleEventType="keydown"
                onKeyEvent={(key: string, e: KeyboardEvent) => handleKeyOnDown(key, e)} />
            <Container fixed style={{ padding: "36px" }}>
                <PaperContainer elevation={2}>
                    <Header previousPath="/key-practice">入門練習</Header>
                    <InfoBox><Typography>在倉頡碼出現時，請按下對應的英文字符</Typography></InfoBox>
                    <KeyboardLayout currentKey={currentKey} lightSet={lightSet}></KeyboardLayout>
                </PaperContainer>
            </Container>
        </>
    )
}

export default PressKeyPractice;