import { ReactChildren, ReactNode } from "react"
import { Container, Paper } from "@mui/material";
import { Header, CommonInputBox } from ".";

interface PracticeContainerProps {
    children?: ReactChildren | ReactNode,
    title: string,
    handleKeys?: Array<string>,
    setCharacter(character: string): void,
    handleBackSpaceOnDown?(): void,
}

const PracticeContainer = (props: PracticeContainerProps): React.ReactElement => {
    return (
        <>

            <Container fixed style={{ padding: "36px" }}>
                <Paper elevation={2}>
                    <Header>{props.title}</Header>
                    {props.children}
                    <CommonInputBox handleBackSpaceOnDown={props.handleBackSpaceOnDown} setCharacter={props.setCharacter} ></CommonInputBox>
                </Paper>
            </Container>
        </>
    )
}

export default PracticeContainer;