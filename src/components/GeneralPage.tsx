import React, { useEffect, useState } from 'react';
import QuizList from './QuizList';
import QuizCreateForm from './QuizCreateForm';
import { QuizType } from '../types/QuizType';

const GeneralPage = () => {
  const [buttonAdd, setButtonAdd] = useState(false);
  const [quizes, setQuizes] = useState<QuizType[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const quizzesString = localStorage.getItem('quizes');
    if (quizzesString) {
        const parsedQuizzes = JSON.parse(quizzesString);
        setQuizes(parsedQuizzes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quizes', JSON.stringify(quizes));
  }, [quizes]);

  const handleQuizAdd = (quiz: Omit<QuizType, 'id'>) => {
    const newQuiz = {
      ...quiz,
      id: quizes.length + 1,
    };
    const updatedQuizzes = [...quizes, newQuiz];
    setQuizes(updatedQuizzes);
  };

  const handleQuizUpdate = (updatedQuiz: QuizType) => {
    const updatedQuizzes = quizes.map((quiz) =>
      quiz.id === updatedQuiz.id ? updatedQuiz : quiz
    );
    setQuizes(updatedQuizzes);
  };

  const handleQuizDelete = (id: number) => {
    const filterQuiz = quizes.filter(el => el.id !== id);
    setQuizes(filterQuiz);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredQuizzes = quizes.filter(quiz =>
    quiz.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='flex flex-col items-center justify-center gap-5 m-5'>
      <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-5'>
        <h1 className='text-2xl font-bold'>Test Quiz App</h1>
        <input 
          type="text" 
          placeholder='Пошук квізу' 
          value={search}
          onChange={handleSearchChange}
          className='border border-gray-300 rounded p-2 w-full sm:w-auto'
        />
        <div className='flex gap-2'>
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
      </div>
      <div className='flex flex-col sm:flex-row gap-10'>
        <QuizList 
          quizes={filteredQuizzes} 
          onQuizUpdate={handleQuizUpdate} 
          handleQuizDelete={handleQuizDelete}
        />
        {buttonAdd && (
          <div className='flex justify-center items-start'>
            <QuizCreateForm onAddQuiz={handleQuizAdd} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralPage;
