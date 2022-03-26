import React from "react";
// ui
import { Container, Typography, Grid, Box } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
// components
import MenuCard from "./MenuCard";

// props
type MenuContainerProps = {
    title: string,
    data: Array<
        {
            title: string,
            href?: string,
            action?: Function,
            icon?: SvgIconComponent
        }
    >
}

const MenuContainer: React.FunctionComponent<MenuContainerProps> = React.memo((props: MenuContainerProps) => {
    return (
        <Container maxWidth="md" sx={{ height: "100vh", maxHeight: "-webkit-fill-available", position: "relative", display: "flex", flexDirection: "column" }}>
            <Box sx={{ height: "20vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h2" component="h2">{props.title}</Typography>
            </Box>
            <Grid container spacing={2} sx={{ height: "60vh" }}>
                {
                    props.data.map((item) => {
                        return (
                            <MenuCard key={item.title} title={item.title} href={item.href} Icon={item.icon} action={item.action} />
                        )
                    })
                }
            </Grid>
        </Container>
    )
})

export default MenuContainer;