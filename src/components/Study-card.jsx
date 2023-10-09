import React from 'react';


export default function StudyCard(props) {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <p>{props.letter}</p>
                </div>
                <div className="flip-card-back">
                    <p>{props.word}</p>
                </div>
            </div>
        </div>
    )
}