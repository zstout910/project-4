import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Questions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Fetch questions and answers from the backend
        axios.get('http://localhost:5000/questions')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className='question-page'>
          <div className='question-container'>
            <h1 className='question-title'>Frequently Asked Questions </h1>
            <ul >
                {questions.map(question => (
                    <li className='questions'key={question.id}>
                        <strong className='question'>{question.question}</strong><br />
                        {question.answer}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default Questions;
