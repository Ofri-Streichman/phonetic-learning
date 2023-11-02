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
import React, { useState } from 'react';
import Card from "../components/Test-card";
import shortid, { generate } from 'shortid';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import phonetic_alphabet from "../phonetic_alphabet.json";

let alphabet = phonetic_alphabet.dictionary;
const shuffled = alphabet.sort(() => 0.5 - Math.random()).slice(0, 12);
const convertArrayToObject = (array, key, value) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: value,
        };
    }, initialValue);
};
console.log("RESHUFFLED!")


export default function Test() {
    const { register, handleSubmit, getValues } = useForm({
        ...shuffled.reduce((obj, item) => {
            return {
                ...obj,
                [item.letter]: '',
            };
        }, {})
    });
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [visualQues, setVisualQues] = useState({
        ...shuffled.reduce((obj, item) => {
            return {
                ...obj,
                [item.letter]: "waiting",
            };
        }, {})
    }); // 'waiting', 'correct' or 'incorrect'
    console.log(visualQues)

    const onSubmit = async (formData) => {
        setIsSubmitted(true)
        let Q = { ...formData }
        for (let field of Object.keys(formData)){
            let fieldCorrect = await checkanswer(field, formData[field]) ? "correct" : "incorrect";
            Q[field] = fieldCorrect;
        }
        setVisualQues(Q);

        console.log(JSON.stringify(formData));
        console.log(JSON.stringify(visualQues));
    };

    async function checkanswer(letter, userInput) {
        var letterItem = alphabet.find((element) => element.letter === letter);
        let res = await (userInput && userInput.toLowerCase() === letterItem.word.toLowerCase());
        return res;
        // if (userInput && userInput.toLowerCase() === letterItem.word.toLowerCase()) {
        //     console.log("letter correct ", letter)
        //     await setVisualQues(
        //         {
        //             ...visualQues,
        //             [letter]: 'correct',
        //         }
        //     )
        // } else {
        //     console.log("letter incorrect ", letter)
        //     await setVisualQues(
        //         {
        //             ...visualQues,
        //             [letter]: 'incorrect',
        //         }
        //     )
        // }
        // console.log("visualQues: ", JSON.stringify(visualQues));
        // return;
    }


    return (
        <div id="test-page" className="page">
            <h1>Test Yourself</h1>
            {/* <h2>Your Score is {score} </h2> */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                autoComplete='off'
            >
                <div className="test-container">
                    {shuffled.map(({ letter, word }) =>
                        <div className={"Card " + visualQues[letter]}>
                            {/* // <div className={"Card "}> */}
                            <label htmlFor={letter}><h2>{letter}</h2></label>
                            <div className="CardInput">
                                {/* <label>{letter}</label> */}
                                <input disabled={isSubmitted} {...register(letter)} />
                            </div>
                        </div>
                    )}
                    <input type="submit" />
                    <button
                        type="button"
                        onClick={() => {
                            alert(JSON.stringify(getValues()));
                        }}
                    >
                        Alert All Values
                    </button>
                    <button type="submit" className='Submit-button'>
                        <div className='button-inside'>
                            <CheckBoxIcon />
                            <div>
                                Check My Answers
                            </div>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    )
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>First Name</label>
            <input {...register("firstName")} />
            <label>Last Name</label>
            <input {...register("lastName")} />
            <label>Username</label>
            <input {...register("username")} />
            <input type="submit" />
            <button
                type="button"
                onClick={() => {
                    alert(JSON.stringify(getValues()));
                }}
            >
                Alert All Values
            </button>
            <button
                type="button"
                onClick={() => {
                    alert(JSON.stringify(getValues("firstName")));
                }}
            >
                Alert First Name
            </button>
            <button
                type="button"
                onClick={() => {
                    alert(JSON.stringify(getValues(["firstName", "lastName"])));
                }}
            >
                Alert First & Last Name
            </button>
        </form>
    );
};
