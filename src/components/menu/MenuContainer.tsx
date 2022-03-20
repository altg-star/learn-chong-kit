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
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Box pb={4} sx={{ height: "30vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h2" component="h2">{props.title}</Typography>
            </Box>
            <Grid container spacing={2}>
                {
                    props.data.map((item) => {
                        return (
                            <MenuCard title={item.title} href={item.href} Icon={item.icon} action={item.action} />
                        )
                    })
                }
            </Grid>
        </Container>
    )
})

export default MenuContainer;