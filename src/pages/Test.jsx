// import React, { useState } from 'react';
// import Card from "../components/Test-card";
// import shortid, { generate } from 'shortid';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import phonetic_alphabet from "../phonetic_alphabet.json";

// let alphabet = phonetic_alphabet.dictionary;
// const shuffled = alphabet.sort(() => 0.5 - Math.random()).slice(0, 12);
// const convertArrayToObject = (array, key, value) => {
//     const initialValue = {};
//     return array.reduce((obj, item) => {
//         return {
//             ...obj,
//             [item[key]]: value,
//         };
//     }, initialValue);
// };
// console.log("RESHUFFLED!")


// export default function Test() {
//     // const [score, setScore] = useState(0);
//     let score = 0;
//     const [testPhase, setTestPhase] = useState("test"); // test or check
//     const [formData, setFormData] = useState({
//         ...shuffled.reduce((obj, item) => {
//             return {
//                 ...obj,
//                 [item.letter]: '',
//             };
//         }, {})
//     });
//     console.log(formData)
//     const [visualQues, setVisualQues] = useState({
//         ...shuffled.reduce((obj, item) => {
//             return {
//                 ...obj,
//                 [item.letter]: "waiting",
//             };
//         }, {})
//     }); // 'waiting', 'correct' or 'incorrect'
//     console.log(visualQues)

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     function checkanswer(letter, userInput) {
//         var letterItem = alphabet.find((element) => element.letter === letter);

//         if (userInput && userInput.toLowerCase() === letterItem.word.toLowerCase()) {
//             // letterCard.classList.add("correct")
//             setVisualQues(
//                 {
//                     ...visualQues,
//                     [letter]: 'correct',
//                 }
//             )

//             score += 8.5;
//             console.log("score: ", score)
//         } else {
//             console.log("letter incorrect ", letter)
//             // letterCard.classList.add("incorrect")
//             setVisualQues(
//                 {
//                     ...visualQues,
//                     [letter]: 'incorrect',
//                 }
//             )
//         }
//     }



//     const handleSubmit = async (event) => {
//         // Prevent the browser from reloading the page
//         event.preventDefault();

//         console.log('--------------------------');
//         console.log("visualQues")

//         console.log(visualQues)

//         // cannot change the input anymore
//         setTestPhase("check");

//         // ✅ Get only the input elements in a form

//         for (var field in formData) {
//             if (Object.prototype.hasOwnProperty.call(formData, field)) {
//                 console.log("checking ", field, formData[field])
//                 await checkanswer(field, formData[field])
//             }
//         }
//         console.log('--------------------------');
//         console.log("visualQues")

//         console.log(visualQues)


//     }


//     return (
//         <div id="test-page" className="page">
//             <h1>Test Yourself</h1>
//             <h2>Your Score is {score} </h2>
//             <form
//                 onSubmit={handleSubmit}
//                 onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
//                 autoComplete='off'
//             >
//                 <div className="test-container">
//                     {shuffled.map(({ letter, word }) =>
//                         <div className={"Card " + visualQues[letter]}>
//                             <label htmlFor={letter}><h2>{letter}</h2></label>
//                             <div className="CardInput">
//                                 <label>
//                                     <input
//                                         type="text"
//                                         id={"userInput" + letter}
//                                         name={letter}
//                                         value={formData[letter]}
//                                         // onChange={handleInputChange}
//                                         onChange={(e) => setInputValue(e.target.value)}
//                                         className={"userInput "}
//                                     />
//                                 </label>
//                             </div>
//                         </div>
//                     )}
//                     <button type="submit" className='Submit-button'>
//                         <div className='button-inside'>
//                             <CheckBoxIcon />
//                             <div>
//                                 Check My Answers
//                             </div>
//                         </div>
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )

// }

import { useForm, useFormState } from "react-hook-form";
import React, { useState, useEffect, useCallback } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import phonetic_alphabet from "../phonetic_alphabet.json";
import shortid from "shortid";
import Timer from "../components/Timer"

let alphabet = phonetic_alphabet.dictionary;

export default function Test() {

    const shuffle = () => {
        console.log("RESHUFFLED!");
        return alphabet.sort(() => 0.5 - Math.random()).slice(0, 12);
    }

    const [shuffled, setShuffled] = useState(() => {
        console.log("const [shuffled, setShuffled]")
        return shuffle()
    });
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
    const [timer, setTimer] = useState(60);

    let interval;

    const tryAgain = () => {
        console.log("try again");
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
        setTimer(60);
    }

    const startTest = () => {
        console.log("startTest");

        setTestPart("test");
        // useEffect(() => {
        //     if (timer <= 0) return;

        //     // save intervalId to clear the interval when the
        //     // component re-renders
        //     const intervalId = setInterval(() => {
        //         setTimer(timer - 1);
        //     }, 1000);

        //     // clear interval on re-render to avoid memory leaks
        //     return () => clearInterval(intervalId);
        //     // add timeLeft as a dependency to re-rerun the effect
        //     // when we update it
        // }, [timer]);
    }

    const onSubmit = async (formData) => {
        setIsSubmitted(true);
        clearInterval(interval);
        let Q = { ...formData };
        let accScore = 0;
        for (let field of Object.keys(formData)) {
            let fieldCorrect = await checkanswer(field, formData[field]) ? "correct" : "incorrect";

            console.log("fieldCorrect ", fieldCorrect, formData[field], field)
            if (fieldCorrect == "correct") { accScore += 8.5 };
            Q[field] = fieldCorrect;
        }
        setVisualQues(Q);
        setScore(accScore);

        console.log(JSON.stringify(formData));
        console.log(JSON.stringify(visualQues));
    };

    async function checkanswer(letter, userInput) {
        var letterItem = alphabet.find((element) => element.letter === letter);
        let res = await (userInput && userInput.toLowerCase() === letterItem.word.toLowerCase());
        return res;
    }


    return (
        <div id="test-page" className="page">
            <h1>Test Yourself</h1>
            {(testPart == "opening") &&
                <div>
                    <h2>You will have {timer} seconds to match 12 letters with their phonetic alphabet representation.<br />Click START to begin the test.</h2>
                    <button
                        className='Submit-button'
                        onClick={startTest}>
                        START
                    </button>
                </div>
            }
            {(testPart == "test") &&
                <>
                    {isSubmitted ?
                        (<h2>Your score is: {score}</h2>) :
                        (<h2>You have <Timer seconds={60} /> seconds left</h2>)
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
                                    {/* // <div className={"Card "}> */}
                                    <label htmlFor={letter}><h2>{letter}</h2></label>
                                    <div className="CardInput">
                                        {/* <label>{letter}</label> */}
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
