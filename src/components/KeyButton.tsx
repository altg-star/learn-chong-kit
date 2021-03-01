import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const StyledKey = styled(Button)`
    text-align: center;
    position: relative;
    min-width: 48px;
    max-width: 48px;
    min-height: 48px;
    max-height: 48px;
    font-size: 18px;
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;
    background: ${(props: { code: string }) => props.code ? props.code : "#FFFFFF"};
`

const KeyButton = (props: { code: string, children: string }): React.ReactElement => {
    return <StyledKey code={props.code} >{props.children}</StyledKey>
}

export default KeyButton;
