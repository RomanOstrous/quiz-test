import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuizType } from '../types/QuizType';

const QuizPage = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    const quizzesString = localStorage.getItem('quizes');
    if (quizzesString) {
      const parsedQuizzes = JSON.parse(quizzesString);
      setQuizzes(parsedQuizzes);
    }
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      goToNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!id) {
    return <div className="text-center text-red-500">No quiz ID provided</div>;
  }

  const findQuiz = quizzes.find(q => q.id === +id);

  if (!findQuiz) {
    return <div className="text-center text-red-500">Quiz not found</div>;
  }

  const currentQuestion = findQuiz.quizbar[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const goToNextQuestion = () => {
    if (selectedOption === currentQuestion.answer) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestionIndex < findQuiz.quizbar.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeLeft(30);
      setSelectedOption('');
    } else {
      localStorage.setItem('score', JSON.stringify(score + (selectedOption === currentQuestion.answer ? 1 : 0)));
      localStorage.setItem('totalQuestions', JSON.stringify(findQuiz.quizbar.length));
      navigate('/result');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Quiz Page</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-[500px]">
        <p className="text-xl font-semibold mb-4">{currentQuestion.question}</p>
        <p className="text-sm text-gray-600 mb-4">Time Left: {timeLeft} seconds</p>
        <ul className="mb-4">
          {currentQuestion.options.map(option => (
            <li key={option} className="mb-2">
              <label className="block bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-300">
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                  className="mr-2"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-between">
          <button
            onClick={goToNextQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Next Question
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
