import React from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";

const StyledPaper = styled(Paper)`
    text-align: center;
    padding: 8px;
    margin: 16px;
`

const InfoBox = (props: { children: React.ReactChild }): React.ReactElement => {
    return <StyledPaper>{props.children}</StyledPaper>
}

export default InfoBox;
