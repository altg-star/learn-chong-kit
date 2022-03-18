import React from "react";
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
}

export default KeyButton;
