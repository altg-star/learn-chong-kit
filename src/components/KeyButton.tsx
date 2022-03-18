import React from "react";

const KeyButton = (props: { code: string, children: string }): React.ReactElement => {
    // return <div code={props.code} ><p>{props.children}</p></div>
    return <div><p>{props.children}</p></div>
}

export default KeyButton;
