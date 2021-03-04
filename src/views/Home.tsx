import React from "react";
import { IndexContainer } from "../components";

const linkList = [
    { "title": "基礎教學", "href": "/tutorial" },
    { "title": "按鍵練習", "href": "/key-practice" },
    { "title": "折碼練習", "href": "/tutorial" },
    { "title": "詞組練習", "href": "/tutorial" },
    { "title": "文章練習", "href": "/tutorial" },
    { "title": "速度測試", "href": "/tutorial" },
]

const Home: React.FunctionComponent = () => {
    return (
        <IndexContainer title="學倉頡" linkList={linkList} />
    )
}

export default Home;