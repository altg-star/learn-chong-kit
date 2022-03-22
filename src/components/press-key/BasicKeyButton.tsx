import React from "react";
import { Typography, ButtonBase } from "@mui/material"
import { styled, useTheme } from '@mui/material/styles';
import { Theme } from "@mui/system";

const KeyBox = styled(ButtonBase)((props: { theme: Theme, item: string, light: number }) => ({
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
    background: props.light ? props.theme.palette.grey["700"] : props.theme.palette.grey["900"],
}));

type KeybuttonProps = {
    item: string;
    light: boolean;
    appear: boolean;
}

const KeyButton: React.FunctionComponent<KeybuttonProps> = React.memo((props: KeybuttonProps) => {
    const theme = useTheme();
    console.log(props.light);
    return (
        <KeyBox theme={theme} item={props.item} light={props.light ? 1 : 0}>
            <Typography
                sx={{ fontSize: theme.typography.htmlFontSize, fontWeight: theme.typography.fontWeightMedium }}
            >
                {props.item !== "/" && props.item !== "*" && props.item !== "space" && props.appear && props.item}
            </Typography>
        </KeyBox>
    )
});

export default KeyButton;