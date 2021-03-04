import keysMapping from "../constants/keys-mapping.json";

const keyTranslation = (text: string): string => {
    const s = Array.from(text);
    return s.map((w) => keysMapping.find(({ en }) => w === en)?.zh).join("") || "";
}

export default keyTranslation;