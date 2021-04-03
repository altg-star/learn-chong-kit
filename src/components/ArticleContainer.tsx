import { ReactChildren, ReactNode } from "react"
import { Container, Paper } from "@material-ui/core";
import styled from "styled-components";
import { Header, CommonInputBox } from ".";


const PaperContainer = styled(Paper)`
    height: auto%;
    width: 100%;
    padding: 16px;
`

interface PracticeContainerProps {
    children?: ReactChildren | ReactNode,
    title: string,
    previousPath: string,
    handleKeys?: Array<string>,
    setCharacter(character: string): void,
    handleBackSpaceOnDown?(): void,
}

const PracticeContainer = (props: PracticeContainerProps): React.ReactElement => {
    return (
        <>

            <Container fixed style={{ padding: "36px" }}>
                <PaperContainer elevation={2}>
                    <Header previousPath={props.previousPath}>{props.title}</Header>
                    {props.children}
                    <CommonInputBox handleBackSpaceOnDown={props.handleBackSpaceOnDown} setCharacter={props.setCharacter} ></CommonInputBox>
                </PaperContainer>
            </Container>
        </>
    )
}

export default PracticeContainer;