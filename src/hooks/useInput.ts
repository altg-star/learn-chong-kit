import { useState, useEffect } from "react";
import characterMapping from "../../constants/character-mapping.json";
const cp = characterMapping as any;

const useInput = () => {
    const [currentInput, setCurrentInput] = useState<string>("");
    const [currentMapping, setCurrentMapping] = useState<any>();
}

export default useInput;