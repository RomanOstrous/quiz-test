import React, { useEffect, useState } from 'react';
import QuizList from './QuizList';
import QuizCreateForm from './QuizCreateForm';
import { QuizType } from '../types/QuizType';

const GeneralPage = () => {
  const [buttonAdd, setButtonAdd] = useState(false);
  const [quizs, setQuizs] = useState<QuizType[]>([]);

  useEffect(() => {
    const quizsString = localStorage.getItem('quizes');

    if (quizsString) {
        const parsedQuizs = JSON.parse(quizsString);
        setQuizs(parsedQuizs);
    }
  }, []);

  return (
    <div className='flex flex-col gap-5 m-5 '>
      <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-5'>
        <h1 className='text-2xl font-bold'>Test Quiz app</h1>
        <input 
          type="text" 
          placeholder='search' 
          className='border border-gray-300 rounded p-2 w-100'
        />
        <button 
          onClick={() => setButtonAdd(true)} 
          className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
        >
          Додати Квіз
        </button>
        {buttonAdd && (
          <button 
            onClick={() => setButtonAdd(false)} 
            className='bg-red-500 text-white p-2 rounded hover:bg-red-600'
          >
            Скасувати
          </button>
        )}
      </div>
      <div className='flex gap-10'> 
        <QuizList quizs={quizs} />
        {buttonAdd && <QuizCreateForm quizs={quizs}/>}
      </div>
    </div>
  );
}

export default GeneralPage;
