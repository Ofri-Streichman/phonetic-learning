
import { useForm } from "react-hook-form";
import React, { useState, useEffect, useCallback } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import phonetic_alphabet from "../phonetic_alphabet.json";
import shortid from "shortid";
import Timer from "../components/Timer"

let alphabet = phonetic_alphabet.dictionary;

export default function Test() {

    const shuffle = () => {
        console.log("RESHUFFLED!");
        return alphabet.sort(() => 0.5 - Math.random()).slice(0, 11);
    }

    const [shuffled, setShuffled] = useState(shuffle());
    const [testPart, setTestPart] = useState("opening");
    const [score, setScore] = useState(0);


    // useForm
    const { register, handleSubmit, reset } = useForm({
        ...shuffled.reduce((obj, item) => {
            return {
                ...obj,
                [item.letter]: '',
            };
        }, {})
    });

    const resetAsyncForm = useCallback(async () => {
        const result = {
            ...shuffled.reduce((obj, item) => {
                return {
                    ...obj,
                    [item.letter]: '',
                };
            }, {})
        }
        reset(result); // asynchronously reset your form values
    }, [reset]);

    useEffect(() => {
        resetAsyncForm()
    }, [resetAsyncForm])

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [visualQues, setVisualQues] = useState({
        ...shuffled.reduce((obj, item) => {
            return {
                ...obj,
                [item.letter]: "waiting",
            };
        }, {})
    }); // 'waiting', 'correct' or 'incorrect'
    const TEST_LENGTH_IN_SECONDS = 10;
    const tryAgain = () => {
        setShuffled(shuffle());

        reset(formValues => ({
            ...shuffled.reduce((obj, item) => {
                return {
                    ...obj,
                    [item.letter]: '',
                };
            }, {})
        }))

        setVisualQues({
            ...shuffled.reduce((obj, item) => {
                return {
                    ...obj,
                    [item.letter]: "waiting",
                };
            }, {})
        });

        setTestPart("opening");
        setIsSubmitted(false);
        setScore(0);
    }

    const onSubmit = async (formData) => {
        setIsSubmitted(true);
        let Q = { ...formData };
        let accScore = 0;
        for (let field of Object.keys(formData)) {
            let fieldCorrect = await checkanswer(field, formData[field]) ? "correct" : "incorrect";
            if (fieldCorrect === "correct") { accScore += 10 };
            Q[field] = fieldCorrect;
        }
        setVisualQues(Q);
        setScore(accScore);
    };

    async function checkanswer(letter, userInput) {
        var letterItem = alphabet.find((element) => element.letter === letter);
        let res = await (userInput && userInput.toLowerCase() === letterItem.word.toLowerCase());
        return res;
    }


    return (
        <div id="test-page" className="page">
            <h1>Test Yourself</h1>
            {(testPart === "opening") &&
                <>
                    <h2>You will have {TEST_LENGTH_IN_SECONDS} seconds to match 11 letters with their phonetic alphabet representation.<br />Click START to begin the test.</h2>
                    <div className="start-button-wrapper">
                        <button
                            className='Submit-button'
                            onClick={() => setTestPart("test")}
                        >
                            START
                        </button>
                    </div>
                </>
            }
            {(testPart === "test") &&
                <>
                    {isSubmitted ?
                        (<h2>Time's up. Your score is: {score}</h2>) :
                        (<h2>You have <Timer seconds={TEST_LENGTH_IN_SECONDS} timeOutHandler={handleSubmit(onSubmit)} /> seconds left</h2>)
                    }
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        autoComplete='off'
                    >
                        <div className="test-container">
                            {shuffled.map(({ letter, word }) =>
                                <div
                                    className={"Card " + visualQues[letter]}
                                    key={shortid.generate()}>
                                    {isSubmitted ?
                                        (<label htmlFor={letter}><h2>{word}</h2></label>) :
                                        (<label htmlFor={letter}><h2>{letter}</h2></label>)
                                    }
                                    <div className="CardInput">
                                        <input disabled={isSubmitted} {...register(letter)} />
                                    </div>
                                </div>
                            )}
                            {isSubmitted ?
                                (<button className='Submit-button' onClick={tryAgain}>
                                    TRY AGAIN
                                </button>) :
                                (<button type="submit" className='Submit-button'>
                                    <div className='button-inside'>
                                        <CheckBoxIcon />
                                        <div>
                                            Check My Answers
                                        </div>
                                    </div>
                                </button>)
                            }
                        </div>
                    </form>
                </>
            }

        </div>
    )
};
