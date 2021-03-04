import React from "react";
import { IndexContainer } from "../../components";

const linkList = [
    { "title": "入門練習", "href": "/key-practice/basic" },
    { "title": "字根輸入練習", "href": "/key-practice/root/asdf" },
    { "title": "回首頁", "href": "/" },
]

const KeyPractice: React.FunctionComponent = () => {
    return (
        <IndexContainer title="按鍵練習" linkList={linkList} />
    )
}

export default KeyPractice;