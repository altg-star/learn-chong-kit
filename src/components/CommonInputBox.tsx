import React, { useState, useMemo } from "react";
import styled from "styled-components";
import * as R from "ramda";
import keyTranslation from "../utils/keyTranslation";
import KeyboardEventHandler from "react-keyboard-event-handler";

import characterMapping from "../constants/character-mapping.json";
import keysMapping from "../constants/keys-mapping.json";
const cp = characterMapping as any;

const StyledContainer = styled.div`
    margin: 16px;
    text-align: center;
    width: auto;
`

const InputBox = styled.span`
    font-size: 20px;
    text-align: left;
    border-style: ridge;
    min-width: 100px;
    max-width: 100px;
    min-height: 24px;
`
const SelectInput = styled.span`
    font-size: 20px;
    min-height: 24px;
    text-align: left;
    border-style: ridge;
    width: 100%
`

const CenterBox = styled.div`
    display: flex;
    justify-content: center;
    padding: 4px;
`

interface CommonInputBoxProps {
    setCharacter(character: string): void,
    handleBackSpaceOnDown?(): void,
}



const CommonInputBox = (props: CommonInputBoxProps): React.ReactElement => {
    const [input, setInput] = useState<string>("");
    const [selection, setSelection] = useState<Array<string>>([]);
    const [mapping, setMapping] = useState<any>();
    const inputValue = useMemo(
        (): string => keyTranslation(input),
        [input]
    )
    const selectValue = useMemo(
        (): Array<string> => selection.map((item) => String.fromCharCode(parseInt(item))),
        [selection]
    )

    //key handling
    const handleSpaceOnDown = async (key: string, e: KeyboardEvent) => {
        if (mapping !== undefined && mapping["+"] !== undefined) {
            if (mapping["+"][0] !== undefined) {
                if (mapping["+"].length === 1) {
                    const character = String.fromCharCode(mapping["+"][0]);
                    await props.setCharacter(character);
                } else {
                    setSelection(mapping["+"])
                }
            }
        }
        setInput("");
        setMapping(undefined);
    }

    const handleBackSpaceOnDown = async () => {
        if (input.length > 0) {
            const newInput = input.slice(0, input.length - 1);
            setInput(newInput);
            setMapping(R.pathOr(undefined, Array.from(newInput))(cp));
        } else if (props.handleBackSpaceOnDown)
            await props.handleBackSpaceOnDown();
    }

    const handleKeyOnDown = async (key: string, e: KeyboardEvent) => {
        if (input.length === 0) {
            setInput(input.concat(key));
            if (cp[`${key}`] !== undefined) {
                setMapping(cp[`${key}`]);
            }
        } else if (input.length < 5) {
            setInput(input.concat(key));
            if (mapping !== undefined && mapping[`${key}`] !== undefined) {
                setMapping(mapping[`${key}`])
            } else setMapping(undefined);
        }
    }

    const handleNumberOnDown = async (key: string) => {
        if (selection[parseInt(key) - 1] !== undefined) {
            const character = String.fromCharCode(parseInt(selection[parseInt(key) - 1]));
            await props.setCharacter(character);
            setSelection([]);
        }
    }

    return (
        <>
            <KeyboardEventHandler
                handleKeys={["space"]}
                handleEventType="keydown"
                onKeyEvent={(key: string, e: KeyboardEvent) => handleSpaceOnDown(key, e)} />
            <KeyboardEventHandler
                handleKeys={["backspace"]}
                handleEventType="keydown"
                onKeyEvent={() => handleBackSpaceOnDown()} />
            <KeyboardEventHandler
                handleKeys={keysMapping.map(({ en }) => en)}
                handleEventType="keydown"
                onKeyEvent={(key: string, e: KeyboardEvent) => handleKeyOnDown(key, e)} />
            <KeyboardEventHandler
                handleKeys={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                handleEventType="keydown"
                onKeyEvent={(key: string) => handleNumberOnDown(key)} />
            <StyledContainer>
                <CenterBox><SelectInput>{selectValue.map((item, i) => `${i + 1}:${item}`).join(" ")}</SelectInput></CenterBox>
                <CenterBox><InputBox>{inputValue}</InputBox></CenterBox>
            </StyledContainer>
        </>
    )
}

export default CommonInputBox;
