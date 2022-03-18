import React from 'react';
import { Paper, IconButton, Typography } from '@mui/material';
import { ArrowBackIos } from "@mui/icons-material";

interface HeaderProps {
    children: React.ReactChild,
}

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => {
    return (
        <Paper variant="outlined">
            <IconButton aria-label="delete">
                <ArrowBackIos />
            </IconButton>
            <Typography style={{ padding: "12px" }}>{props.children}</Typography>
        </Paper>
    )
}

export default Header;