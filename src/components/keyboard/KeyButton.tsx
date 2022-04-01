import React from "react";
import { Typography, ButtonBase } from "@mui/material"
import { styled, useTheme } from '@mui/material/styles';
import { Theme } from "@mui/system";

// icon
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const KeyBox = styled(ButtonBase)((props: { theme: Theme, item: string, light: number }) => ({
    width: props.item === "/" ? "18px" : props.item === "space" ? "308px" : "36px",
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
    item: { en: string, zh: string };
    light: boolean;
    onClick: (item: string) => void;
    handleKeyOnUp: () => void;
}

const KeyButton: React.FunctionComponent<KeybuttonProps> = React.memo((props: KeybuttonProps) => {
    const theme = useTheme();
    return (
        <KeyBox theme={theme} item={props.item.zh} light={props.light ? 1 : 0} onMouseDown={() => props.onClick(props.item.en)} onMouseUp={() => props.handleKeyOnUp()}>
            <Typography sx={{ fontSize: theme.typography.htmlFontSize, fontWeight: theme.typography.fontWeightMedium }}>
                {
                    (props.item.en !== "/" && props.item.en !== "*" && props.item.en !== "space") ? props.item.en === "backspace" ? (<KeyboardBackspaceIcon sx={{ marginTop: "4px" }}></KeyboardBackspaceIcon>) : props.item.zh : ""
                }
            </Typography>
        </KeyBox>
    )
});

export default KeyButton;