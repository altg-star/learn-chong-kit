import React, { useRef, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
// data
import keysMapping from "../../constants/keys-mapping.json";
// ui
import { Container, Typography, Box } from "@mui/material";
// components
import BaseContainer from "../../components/base/BaseContainer";


const findPermutations = (str: string): Array<string> | string => {
    if (str.length < 2) {
        return str
    }
    let permutationsArray = [];
    for (let i = 0; i < str.length; i++) {
        let char = str[i]
        let remainingChars = str.slice(0, i) + str.slice(i + 1, str.length)
        for (let permutation of findPermutations(remainingChars)) {
            permutationsArray.push(char + permutation)
        }
    }
    return permutationsArray
}

const getRandomQuestion = (str: string): Array<string> => {
    const permutation = findPermutations(str);
    if (typeof permutation === "string") return [permutation];
    else {
        const data = permutation.slice(0, 15);
        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = data[i];
            data[i] = data[j];
            data[j] = temp;
        }
        return data
    }
}

type BasicPressKeyContentProps = {
    currentKey?: string;
    onFinish: () => void;
}
const RootPressKeyContent: React.FunctionComponent<BasicPressKeyContentProps> = ({ currentKey, onFinish }: BasicPressKeyContentProps) => {
    const { question } = useParams<{ question: string }>();
    const randomQuestions = useMemo((): string[] => getRandomQuestion(question || ""), [question]);
    const questionIterator = useRef<number>(0);
    const currentCorrectInput = useRef<string>(randomQuestions[0][0]);
    const currentInput = useRef<string>("");
    //const [currentInput, setCurrentInput] = useState<string>("");
    const transalation = useCallback((keys: string) => {
        return keys.split("").map((item) => {
            const findKey = keysMapping.find(({ en }) => item === en);
            return findKey ? findKey.zh : ""
        }).join("");
    }, []);
    useEffect(() => {
        if (currentKey === currentCorrectInput.current) {
            if (currentInput.current.length === (randomQuestions[questionIterator.current].length * 3) + 1) {
                // next question
                questionIterator.current++;
                currentInput.current = "";
                // check finished
                if (questionIterator.current === randomQuestions.length) {
                    onFinish();
                    return;
                }
                currentCorrectInput.current = randomQuestions[questionIterator.current][0];
            } else {
                // next character
                const currentIndex = randomQuestions[questionIterator.current].indexOf(currentCorrectInput.current);
                if (currentIndex !== -1 && currentIndex !== randomQuestions[questionIterator.current].length - 1) {
                    // current line
                    currentCorrectInput.current = randomQuestions[questionIterator.current][currentIndex + 1];
                    currentInput.current = `${currentInput.current}${currentKey}`;
                } else {
                    // next line
                    currentCorrectInput.current = randomQuestions[questionIterator.current][0];
                    currentInput.current = `${currentInput.current}${currentKey},`;
                }
            }
        }
    }, [currentKey, currentInput, randomQuestions, onFinish]);
    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ padding: "4px", marginBottom: "8px", borderStyle: "solid" }}>
                <Typography variant="h5">{transalation(randomQuestions[questionIterator.current])}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                {
                    currentInput.current.split(",").map((item, index) => (
                        <Typography key={index} variant="h5">{transalation(item)}</Typography>
                    ))
                }
            </Box>
        </Container>
    )
}

const RootPressKey: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const handleOnClick = useCallback((path?: string | Function) => {
        if (path) {
            if (typeof (path) === "string") {
                navigate(path);
            } else {
                path();
            }
        }
    }, [navigate]);
    return (
        <BaseContainer title="字根練習" subtitle="請重覆輸入字根三次" backOnClick="/press-key">
            <RootPressKeyContent onFinish={() => handleOnClick("/press-key")}></RootPressKeyContent>
        </BaseContainer>
    )
}

export default RootPressKey;