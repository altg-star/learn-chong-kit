import React, { useMemo } from "react";
import keyTranslation from "../utils/keyTranslation";

interface DecodePracticeInputBoxProps {
    input: string,
    maxInput?: number,
}



const DecodePracticeInputBox = ({ input, maxInput = 5 }: DecodePracticeInputBoxProps): React.ReactElement => {
    const value = useMemo(
        (): string => keyTranslation(input),
        [input]
    )
    return (
        <div>
            <span>{value}</span>
        </div>
    )
}

export default DecodePracticeInputBox;
