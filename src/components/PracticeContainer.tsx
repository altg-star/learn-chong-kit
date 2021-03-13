import { ReactChildren, ReactNode } from "react"
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Container, Paper, Typography } from "@material-ui/core";
import styled from "styled-components";
import { KeyboardLayout, InfoBox, Header } from ".";
import keysMapping from "../constants/keys-mapping.json";

const PaperContainer = styled(Paper)`
    height: auto%;
    width: 100%;
    padding: 16px;
`

interface PracticeContainerProps {
    children?: ReactChildren | ReactNode,
    title: string,
    previousPath: string,
    instruction: string,
    currentKey: string,
    handleKeys?: Array<string>,
    lightSet?: Set<string>,
    handleKeyOnDown(key: string, e?: KeyboardEvent): any,
    handleSpaceOnDown(key?: string, e?: KeyboardEvent): any,
    handleBackSpaceOnDown?(key?: string, e?: KeyboardEvent): any,
}

const PracticeContainer = (props: PracticeContainerProps): React.ReactElement => {
    const handleSpaceOnDown = async (key: string, e: KeyboardEvent) => {
        await props.handleSpaceOnDown(key, e);
    }

    const handleBackSpaceOnDown = async (key: string, e: KeyboardEvent) => {
        if (props.handleBackSpaceOnDown)
            await props.handleBackSpaceOnDown(key, e)
    }

    const handleKeyOnDown = async (key: string, e: KeyboardEvent) => {
        await props.handleKeyOnDown(key, e);
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
                onKeyEvent={(key: string, e: KeyboardEvent) => handleBackSpaceOnDown(key, e)} />
            <KeyboardEventHandler
                handleKeys={props.handleKeys || keysMapping.map(({ en }) => en)}
                handleEventType="keydown"
                onKeyEvent={(key: string, e: KeyboardEvent) => handleKeyOnDown(key, e)} />
            <Container fixed style={{ padding: "36px" }}>
                <PaperContainer elevation={2}>
                    <Header previousPath={props.previousPath}>{props.title}</Header>
                    <InfoBox><Typography>{props.instruction}</Typography></InfoBox>
                    {props.children}
                    <KeyboardLayout currentKey={props.currentKey} lightSet={props.lightSet || new Set<string>()}></KeyboardLayout>
                </PaperContainer>
            </Container>
        </>
    )
}

export default PracticeContainer;