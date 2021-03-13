import React, { useMemo } from "react";
import styled from "styled-components";
import keyTranslation from "../utils/keyTranslation";

const StyledContainer = styled.div`
    margin: 16px;
    text-align: center;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`

const InputBox = styled.span`
    font-size: 20px;
    text-align: left;
    border-style: ridge;
    min-width: 100px;
    min-height: 24px;
`

interface DecodePracticeInputBoxProps {
    input: string,
    maxInput?: number,
}



const DecodePracticeInputBox = ({ input, maxInput = 5 }: DecodePracticeInputBoxProps): React.ReactElement => {
    const value = useMemo(
        (): string => keyTranslation(input),
        [input]
    )
    return (
        <StyledContainer>
            <InputBox>{value}</InputBox>
        </StyledContainer>
    )
}

export default DecodePracticeInputBox;
