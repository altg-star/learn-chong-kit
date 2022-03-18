import React from "react";
import { Paper, Typography } from "@mui/material";

const InfoBox = (props: { children: React.ReactChild }): React.ReactElement => {
    return <Paper><Typography>{props.children}</Typography></Paper>
}

export default InfoBox;
