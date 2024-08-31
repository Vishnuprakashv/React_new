import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './questionspaper.module.css';

const Questionspaper = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({}); 
    const [showResult, setShowResult] = useState(false); 
    const [correctCount, setCorrectCount] = useState(0); 
    const [popupVisible, setPopupVisible] = useState(false); 
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleOptionClick = (option) => {
        if (userAnswers[currentIndex] === undefined) { 
            setSelectedOption(option); 
            setPopupVisible(true);
        }
    };

    const handlePopupConfirm = () => {
        const currentQuestion = questions[currentIndex];
        const isCorrect = selectedOption === currentQuestion.answer;

       
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [currentIndex]: selectedOption
        }));

        if (isCorrect) {
            setCorrectCount(prevCount => prevCount + 1);
        }

        
        setPopupVisible(false);
    };

    const handlePopupCancel = () => {
        setPopupVisible(false); 
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const { question, option } = questions[currentIndex];

    return (
        <div className={style.questionspaper_container}>
            {popupVisible && (
                <div className={style.popup}>
                    <p>Are you sure you want to select this option?</p>
                    <button onClick={handlePopupConfirm} className={style.popup_button}>OK</button>
                    <button onClick={handlePopupCancel} className={style.popup_button}>Cancel</button>
                </div>
            )}

            {showResult ? (
                <div className={style.result}>
                    <h2>Results</h2>
                    <p>Correct Answers: {correctCount} / {questions.length}</p>
                </div>
            ) : (
                <div>
                    <div className={style.question}>
                        <h1>{question}</h1>
                    </div>
                    <div className={style.options}>
                        {Object.entries(option).map(([key, value]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => handleOptionClick(key)}
                                className={
                                    userAnswers[currentIndex] === key
                                        ? style.selected
                                        : ''
                                }
                                disabled={userAnswers[currentIndex] !== undefined}
                            >
                                {key}. {value}
                            </button>
                        ))}
                    </div>
                    <div className={style.navigation}>
                        <button
                            type="button"
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                        >
                            Prev
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={currentIndex === questions.length - 1 && !showResult}
                        >
                            Next
                        </button>
                        {currentIndex === questions.length - 1 && !showResult && (
                            <button
                                type="button"
                                onClick={() => setShowResult(true)}
                                className={style.result_button}
                            >
                                Show Results
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Questionspaper;
