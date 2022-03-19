import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// components
import { Typography, Grid, Box } from "@mui/material";
import { Card, CardActionArea, CardContent } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

type MenuCardProps = {
    title: string;
    href?: string;
    action?: Function;
    Icon?: SvgIconComponent;
}
const MenuCard: React.FunctionComponent<MenuCardProps> = React.memo((props: MenuCardProps) => {
    const navigate = useNavigate();
    const handleOnClick = useCallback((path?: string | Function) => {
        if(path) {
            if(typeof(path) === "string") {
                navigate(path);
            } else {
                path();
            }
        } 
    }, [navigate]);
    return (
        <Grid item xs={6} md={4} sx={{ display: "flex", justifyContent: "space-around", alignItems: "stretch" }}>
            <Card sx={{ display: "flex", width: "100%" }}>
                <CardActionArea onClick={() => handleOnClick(props.href || props.action)}>
                    <CardContent>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            {props.Icon && (
                                <props.Icon fontSize="large" />
                            )}
                            <Typography gutterBottom variant="h5" component="div" pt={1}>
                                {props.title}
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
});

export default MenuCard;