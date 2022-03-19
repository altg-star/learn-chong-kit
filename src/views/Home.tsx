import React from "react";

// components
import { Container, Typography, Grid, Box } from "@mui/material";
import { Card, CardActionArea, CardContent } from "@mui/material";
// icons
import { SvgIconComponent } from "@mui/icons-material";
import MenuBookIcon from "@mui/icons-material/MenuBook"; // tutorial;
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined"; //key-practice
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"; //decode-practice
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined"; //article-practice
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined"; //speed-test
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"; //about

const linkList = [
    { "title": "基礎教學", "href": "/tutorial", "icon": MenuBookIcon },
    { "title": "按鍵練習", "href": "/key-practice", "icon": KeyboardOutlinedIcon },
    { "title": "折碼練習", "href": "/decode-practice", "icon": TranslateOutlinedIcon },
    { "title": "文章練習", "href": "/article-practice", "icon": ArticleOutlinedIcon },
    { "title": "速度測試", "href": "/tutorial", "icon": SpeedOutlinedIcon },
    { "title": "關於", "href": "/about", "icon": InfoOutlinedIcon },
]

type MenuCardProps = {
    title: string;
    href: string;
    Icon: SvgIconComponent;
}

const MenuCard: React.FC<MenuCardProps> = React.memo((props: MenuCardProps) => {
    return (
        <Grid item xs={6} md={4}>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <props.Icon fontSize="large" />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {props.title}
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
});

const Home: React.FunctionComponent = () => {
    return (
        <Container maxWidth="sm" sx={{ paddingTop: "25%", display: "flex", flexDirection: 'column', justifyContent: "center", alignContent: "center" }}>
            <Box pb={4} sx={{ display: "flex", justifyContent: "center"}}>
                <Typography variant="h2" component="h2">學倉頡</Typography>
            </Box>
            <Grid container spacing={2}>
                {
                    linkList.map((item) => {
                        return (
                            <MenuCard title={item.title} href={item.href} Icon={item.icon} />
                        )
                    })
                }
            </Grid>
        </Container>
    )
}

export default Home;