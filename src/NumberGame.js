// src/NumberGame.js

import React, { useState, useEffect } from "react";
import "./NumberGame.css"; // Create this CSS file for styling

const NumberGame = () => {
  const generateQuestions = () => {
    const numberOfQuestions = 5; // Specify the number of questions you want
    const minNumber = 1;
    const maxNumber = 20;
    const questions = [];

    for (let i = 0; i < numberOfQuestions; i++) {
      const num1 =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      
      const correctNumber = num1 ;

      const question = `Identify the Number ${num1} `;
      const numbers = [
        correctNumber,
        correctNumber + 2,
        correctNumber + 1,
        correctNumber + 3,
        correctNumber + 4,
        correctNumber + 1,
      ].sort(() => Math.random() - 0.5);

      questions.push({
        question,
        numbers,
        correctNumber,
      });
    }

    return questions;
  };

  const [questions, setQuestions] = useState(generateQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedNumberIndex, setSelectedNumberIndex] = useState(null);
  const [showGoodMessage, setShowGoodMessage] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const handleNumberClick = (numberIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (
      numberIndex ===
      currentQuestion.numbers.indexOf(currentQuestion.correctNumber)
    ) {
      setShowGoodMessage(true);
      setSelectedNumberIndex(numberIndex);
      setIsCorrectAnswer(true); // Set to true for correct answer
    } else {
      setShowGoodMessage(true);
      setSelectedNumberIndex(numberIndex);
      setIsCorrectAnswer(false); // Set to false for incorrect answer
    }
  };

  useEffect(() => {
    if (showGoodMessage) {
      setTimeout(() => {
        setShowGoodMessage(false);
        setSelectedNumberIndex(null);

        if (isCorrectAnswer) {
          const nextQuestionIndex =
            (currentQuestionIndex + 1) % questions.length;
          setCurrentQuestionIndex(nextQuestionIndex);
        }
        setIsCorrectAnswer(false); // Reset the isCorrectAnswer state for the new question
      }, 2000); // Adjust the delay as needed
    }
  }, [showGoodMessage, currentQuestionIndex, isCorrectAnswer, questions]);

  const currentQuestion = questions[currentQuestionIndex];
  const numbers = currentQuestion.numbers;

  return (
    <div className="number-game">
      <div className="background-image"></div>
      <div className="game-content">
        <div className="question">
          <p className="question-text">{currentQuestion.question}</p>
        </div>
        <div className="number-container">
          {numbers.map((number, index) => (
            <div
              key={index}
              className={`number ${
                selectedNumberIndex === index
                  ? isCorrectAnswer
                    ? "correct"
                    : "incorrect"
                  : ""
              }`}
              onClick={() =>
                isCorrectAnswer ? null : handleNumberClick(index)
              }
            >
              {number}
            </div>
          ))}
        </div>
        {showGoodMessage && (
          <div
            className={`message ${
              selectedNumberIndex ===
              currentQuestion.numbers.indexOf(currentQuestion.correctNumber)
                ? "correct"
                : "wrong"
            }`}
          >
            {selectedNumberIndex ===
            currentQuestion.numbers.indexOf(currentQuestion.correctNumber)
              ? "Good!"
              : "Wrong! Try Again."}
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberGame;
