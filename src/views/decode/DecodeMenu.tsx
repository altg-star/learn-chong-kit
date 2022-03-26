import React from "react";

// components
import MenuContainer from "../../components/menu/MenuContainer";

const DecodeMenu: React.FunctionComponent = () => {
    const decodeMenuList = [
        { "title": "輔助字型", "href": "/decode/associate" },
        { "title": "常用字首", "href": "/decode/common-head" },
        { "title": "常用字身", "href": "/decode/common-tail" },
        { "title": "單字拆碼", "href": "/decode/single-character" },
        { "title": "詞組拆碼", "href": "/decode/word" },
        { "title": "回首頁", "href": "/" },
    ]
    return (
        <MenuContainer title="拆碼練習" data={decodeMenuList} />
    )
}

export default DecodeMenu;