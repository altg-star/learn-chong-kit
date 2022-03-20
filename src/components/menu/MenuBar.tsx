import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ui
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

// icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type MenuBarProps = {
    title?: string;
    subtitle?: string;
    backOnClick?: string | Function;
}

const MenuBar: React.FunctionComponent<MenuBarProps> = React.memo((props: MenuBarProps) => {
    const navigate = useNavigate();
    const handleOnClick = useCallback((path?: string | Function) => {
        if (path) {
            if (typeof (path) === "string") {
                navigate(path);
            } else {
                path();
            }
        }
    }, [navigate]);
    return (
        <AppBar position="static" color="transparent" sx={{ padding: 0 }}>
            <Toolbar disableGutters>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, ml: 1 }}
                    onClick={() => props.backOnClick ? handleOnClick(props.backOnClick) : {}}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {props.title}
                </Typography>

            </Toolbar>
            {
                props.subtitle && (<Typography variant="subtitle2" component="div" sx={{ flexGrow: 1, ml: 1 }}>
                    {props.subtitle}
                </Typography>)
            }
        </AppBar>
    )
});

export default MenuBar;