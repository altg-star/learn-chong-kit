import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ui
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";

// icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type MenuBarProps = {
    children?: React.ReactNode;
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
                <Box sx={{ paddingRight: 3 }}>
                    {props.children}
                </Box>
            </Toolbar>
            {
                props.subtitle && (<Typography variant="subtitle2" component="div" sx={{ flexGrow: 1, ml: 3 }}>
                    {props.subtitle}
                </Typography>)
            }
        </AppBar>
    )
});

export default MenuBar;