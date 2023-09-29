import React from 'react';
import shortid from 'shortid';


function Learn(props) {
    // var item = []
    // for (const x in props.alphabet) {
    //     // console.log(`${x}: ${props.alphabet[x]}`);
    //     item.push({ letter: x, word: props.alphabet[x] })
    // }
    console.log(props.alphabet)

    return (
        <div>
            <h2>Learn Page</h2>
            <main>
                <ul>
                    {props.alphabet.map((x) => <li key={shortid.generate()}>{x.letter} : {x.word}</li>)}
                    
                </ul>
            </main>
        </div>
    )
}

export default Learn;