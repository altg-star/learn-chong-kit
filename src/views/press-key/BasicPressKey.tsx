import React, { useState, useEffect, useMemo } from "react";
import keysMapping from "../../constants/keys-mapping.json";

// ui

// components
import BaseContainer from "../../components/base/BaseContainer";
import BasicKeyboardLayour from "../../components/press-key/BasicKeyboardLayout";
type BasicPressKeyContentProps = {
    currentKey?: string;
}

const BasicPressKeyContent: React.FunctionComponent<BasicPressKeyContentProps> = ({currentKey}: BasicPressKeyContentProps) => {
        // key process
        const [lightSet, setLightSet] = useState<Set<string>>(new Set<string>());
        // characters that can be random
        const randomSet = useMemo<Set<string>>(() => new Set<string>(keysMapping.map(({en}) => en)), []);
        // timer
        const [timeLeft, setTimeLeft] = useState(60);
        useEffect(() => {
            const timer = setTimeout(() => {
                if(randomSet.size > 0) {
                    const randomItems = Array.from(randomSet);
                    const randomItem = randomItems[Math.floor(Math.random() * randomItems.length)];
                    randomSet.delete(randomItem);
                    lightSet.add(randomItem);
                    setLightSet(lightSet);
                }
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        });
        // monitor change or current key input
        useEffect(() => {
            if(currentKey && currentKey !== "") {
                randomSet.add(currentKey);
                lightSet.delete(currentKey);
                setLightSet(lightSet);
            }
        }, [currentKey, randomSet, lightSet]);

    return (
        <BasicKeyboardLayour currentKey={currentKey} lightSet={lightSet}></BasicKeyboardLayour>
    )
}

const BasicPressKey: React.FunctionComponent = () => {
    return (
        <BaseContainer title="入門練習" subtitle="在倉頡碼出現時，請按下對應的英文字符" backOnClick="/press-key">
            <BasicPressKeyContent></BasicPressKeyContent>
        </BaseContainer>
    )
}

export default BasicPressKey;