import React from 'react';


export default function LetterCard(props) {
    return (
        <div className={"Card  letter-" + props.letter}>
            <label htmlFor={props.letter}><h2>{props.letter}</h2></label>
            <div className="CardInput">
                <label>
                    <input
                        type="text"
                        id={"userInput" + props.letter} 
                        name={props.letter}
                        value={props.value}
                        onChange={props.handleInputChange}
                        className={"userInput " + props.correct}
                    />
                </label>
            </div>
        </div>
    );
}