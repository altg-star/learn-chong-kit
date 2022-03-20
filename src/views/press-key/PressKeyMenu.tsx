import React, { useState } from "react";

// components
import MenuContainer from "../../components/menu/MenuContainer";

const KeyPractice: React.FunctionComponent = () => {
    const PressKeyMenuList = [
        { "title": "入門練習", "href": "/press-key/basic" },
        { "title": "字根練習", "action": () => setToggle('root') },
        { "title": "返回", "href": "/" },
    ]

    const rootLinkList = [
        { "title": "日尸木火", "href": "/press-key/root/asdf" },
        { "title": "十大中", "href": "/press-key/root/jkl" },
        { "title": "土竹", "href": "/press-key/root/asdf" },
        { "title": "手田水口", "href": "/press-key/root/qwer" },
        { "title": "山戈人心", "href": "/press-key/root/uiop" },
        { "title": "廿卜", "href": "/press-key/root/ty" },
        { "title": "金女月弓一", "href": "/press-key/root/cvbnm" },
        { "title": "重難", "href": "/press-key/root/zx" },
        { "title": "返回", "action": () => setToggle('menu') },
    ]
    const [toggle, setToggle] = useState<string>('menu');
    return (
        toggle === "menu" ? (<MenuContainer title="按鍵練習" data={PressKeyMenuList} />)
            : (<MenuContainer title="字根練習" data={rootLinkList} />)
    )
}

export default KeyPractice;