import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material"
import { styled, useTheme } from '@mui/material/styles';
import { Theme } from "@mui/system";

const KeyBox = styled(Box)((props: { theme: Theme, item: string }) => ({
    width: props.item === "/" ? "22px" : props.item === "space" ? "308px" : "48px",
    height: "48px",
    [props.theme.breakpoints.up('sm')]: {
        width: props.item === "/" ? "41px" : props.item === "space" ? "536px" : "86px",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderStyle: "solid",
    borderColor: props.theme.palette.grey["700"],
    borderRadius: props.theme.shape.borderRadius,
    background: props.theme.palette.grey["900"],
}));

type KeybuttonProps = {
    item: string
}

const KeyButton: React.FunctionComponent<KeybuttonProps> = React.memo((props: KeybuttonProps) => {
    const theme = useTheme();
    return (
        <KeyBox theme={theme} item={props.item}>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>{props.item !== "/" && props.item !== "space" && props.item}</Typography>
        </KeyBox>
    )
});

export default KeyButton;