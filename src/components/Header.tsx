import React from 'react';
import { Paper, IconButton, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
//style
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';

const StyledHeader = styled(Paper)`
    margin: 16px;
    display: flex;
`

interface HeaderProps {
    children: React.ReactChild,
    previousPath: string,
}

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => {
    const history = useHistory();
    const backButtonOnClick = () => {
        history.push(props.previousPath);
    }
    return (
        <StyledHeader variant="outlined">
            <IconButton aria-label="delete" onClick={backButtonOnClick}>
                <ArrowBackIcon />
            </IconButton>
            <Typography style={{ padding: "12px" }}>{props.children}</Typography>
        </StyledHeader>
    )
}

export default Header;