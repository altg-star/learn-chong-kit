import React from "react";
<<<<<<< HEAD
// import styled from "@mui/styled-engine";

// const StyledKey = styled.div`
//     text-align: center;
//     position: relative;
//     width: 48px;
//     height: 48px;
//     font-size: 18px;
//     border-style: solid;
//     border-width: 1px;
//     border-radius: 4px;
//     background: ${(props: { code: string }) => props.code ? props.code : "#FFFFFF"};
//     & > p { 
//         margin: 0;
//         position: absolute;
//         top: 14px;
//         left: 15px;
//     }
// `

const KeyButton = (props: { code: string, children: string }): React.ReactElement => {
    // return <div code={props.code} ><p>{props.children}</p></div>
    return <div><p>{props.children}</p></div>
=======
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
>>>>>>> eb4ec2e54a9aec5ec1bd0980af452527e5fa53cd
}

export default KeyButton;
