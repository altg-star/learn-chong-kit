import React from "react";

// components
import MenuContainer from "../components/menu/MenuContainer";
// icons
import MenuBookIcon from "@mui/icons-material/MenuBook"; // tutorial;
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined"; //key-practice
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"; //decode-practice
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined"; //article-practice
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined"; //speed-test
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'; //setting

const linkList = [
    { "title": "基礎教學", "href": "/tutorial", "icon": MenuBookIcon },
    { "title": "按鍵練習", "href": "/press-key", "icon": KeyboardOutlinedIcon },
    { "title": "折碼練習", "href": "/decode-practice", "icon": TranslateOutlinedIcon },
    { "title": "文章練習", "href": "/article-practice", "icon": ArticleOutlinedIcon },
    { "title": "速度測試", "href": "/tutorial", "icon": SpeedOutlinedIcon },
    { "title": "設定", "href": "/setting", "icon": SettingsOutlinedIcon },
]

const Home: React.FunctionComponent = () => {
    return (
        <MenuContainer title="學倉頡" data={linkList} />
    )
}

export default Home;