import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const storedScore = localStorage.getItem('score');
    const storedTotalQuestions = localStorage.getItem('totalQuestions');
    if (storedScore && storedTotalQuestions) {
      setScore(JSON.parse(storedScore));
      setTotalQuestions(JSON.parse(storedTotalQuestions));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Result Page</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg text-center">
        <p className="text-xl font-semibold mb-4">
          You scored {score} out of {totalQuestions}
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ResultPage;