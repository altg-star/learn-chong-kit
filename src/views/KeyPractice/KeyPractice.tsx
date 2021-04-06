import React from "react";
import { IndexContainer } from "../../components";

const linkList = [
    { "title": "入門練習", "href": "/key-practice/basic" },
    { "title": "字根練習（日尸木火）", "href": "/key-practice/root/asdf" },
    { "title": "字根練習（十大中）", "href": "/key-practice/root/jkl" },
    { "title": "字根練習（土竹）", "href": "/key-practice/root/asdf" },
    { "title": "字根練習（手田水口）", "href": "/key-practice/root/qwer" },
    { "title": "字根練習（山戈人心）", "href": "/key-practice/root/uiop" },
    { "title": "字根練習（廿卜）", "href": "/key-practice/root/ty" },
    { "title": "字根練習（金女月弓一）", "href": "/key-practice/root/cvbnm" },
    { "title": "字根練習（重難）", "href": "/key-practice/root/zx" },
    { "title": "回首頁", "href": "/" },
]

const KeyPractice: React.FunctionComponent = () => {
    return (
        <IndexContainer title="按鍵練習" linkList={linkList} />
    )
}

export default KeyPractice;