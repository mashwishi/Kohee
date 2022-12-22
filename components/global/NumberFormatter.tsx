import { useEffect, useState } from "react";

type NumberFormatter = {
    input_number: number;
};

const NumberFormatter = (props: NumberFormatter) => {


    const [inputNumber, setInputNumber] = useState(props.input_number ? props.input_number : 0);
    const [inputNumberText, setInputNumberText] = useState('');

    const numformat = (n: number) => {
        if (n === undefined) return setInputNumberText('0');
        if (n < 1e3) return setInputNumberText(`${n}`) ;
        if (n >= 1e3 && n < 1e6) return setInputNumberText(+(n / 1e3).toFixed(1) + "K") ;
        if (n >= 1e6 && n < 1e9) return setInputNumberText(+(n / 1e6).toFixed(1) + "M") ;
        if (n >= 1e9 && n < 1e12) return setInputNumberText(+(n / 1e9).toFixed(1) + "B") ;
        if (n >= 1e12) return setInputNumberText(+(n / 1e12).toFixed(1) + "T") ;
    };

    useEffect(() => {
        setInputNumber(props.input_number)
        numformat(inputNumber)
    }, [])

    return (
        <>
            {inputNumberText}
        </>
    );


};

export default NumberFormatter;
