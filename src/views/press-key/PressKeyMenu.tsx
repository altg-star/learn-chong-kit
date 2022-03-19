import React from "react";

// components
import MenuContainer from "../../components/menu/MenuContainer";


const PressKeyMenuList = [
    { "title": "入門練習", "href": "/press-key/basic" },
    { "title": "字根練習", "action": () => {} },
    { "title": "返回", "href": "/" },
]

const rootLinkList = [
    { "title": "字根練習（日尸木火）", "href": "/press-key/root/asdf" },
    { "title": "字根練習（十大中）", "href": "/press-key/root/jkl" },
    { "title": "字根練習（土竹）", "href": "/press-key/root/asdf" },
    { "title": "字根練習（手田水口）", "href": "/press-key/root/qwer" },
    { "title": "字根練習（山戈人心）", "href": "/press-key/root/uiop" },
    { "title": "字根練習（廿卜）", "href": "/press-key/root/ty" },
    { "title": "字根練習（金女月弓一）", "href": "/press-key/root/cvbnm" },
    { "title": "字根練習（重難）", "href": "/press-key/root/zx" },
    { "title": "返回", "action": () => {} },
]

const KeyPractice: React.FunctionComponent = () => {
    return (
        <MenuContainer title="按鍵練習" data={PressKeyMenuList} />
    )
}

export default KeyPractice;