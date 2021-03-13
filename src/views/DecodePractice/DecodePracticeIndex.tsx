import { IndexContainer } from "../../components";

const linkList = [
    { "title": "輔助字型", "href": "/decode-practice/associate" },
    { "title": "常用字首", "href": "/decode-practice/common-head" },
    { "title": "常用字身", "href": "/decode-practice/common-tail" },
    { "title": "回首頁", "href": "/" },
]

const DecodePracticeIndex: React.FunctionComponent = () => {
    return (
        <IndexContainer title="折碼練習" linkList={linkList} />
    )
}

export default DecodePracticeIndex