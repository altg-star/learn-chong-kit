import React, { useState, useEffect } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Container, Typography } from "@material-ui/core";
import keysMapping from "../constants/keys-mapping.json";
import { KeyboardLayout, InfoBox } from "../components";

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
            <Container fixed style={{ paddingTop: "25%" }}>
                <InfoBox><Typography>在倉頡碼出現時，請按下對應的英文字符</Typography></InfoBox>
                <KeyboardLayout currentKey={currentKey} lightSet={lightSet}></KeyboardLayout>
            </Container>
        </>
    )
}

export default PressKeyPractice;