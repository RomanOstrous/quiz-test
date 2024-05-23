import React, { useEffect, useState } from 'react';
import { QuizType } from '../types/QuizType';
import { QuestionsType } from '../types/QuestionsType';

type Props = {
  quizs: QuizType[]
}

const QuizCreateForm: React.FC<Props> = ({ quizs }) => {
  const [addQuestion, setAddQuestion] = useState(false);
  const [quizName, setQuizName] = useState('');
  const [detail, setDetail] = useState('');
  const [quest, setQuest] = useState('');
  const [answer, setAnswer] = useState('');
  const [options, setOptions] = useState('');
  const [store, setStore] = useState<string[]>([]);
  const [storeQuestions, setStoreQuestions] = useState<QuestionsType[]>([]);
  const [localQuizes, setLocalQuizes] = useState<QuizType[]>(quizs);

  useEffect(() => {
    const savedQuizzes = JSON.parse(localStorage.getItem('quizes') || '[]');
    setLocalQuizes(savedQuizzes);
  }, []);

  const createQuiz = () => {
    const newQuiz = {
      id: localQuizes.length + 1,
      name: quizName,
      details: detail,
      quizbar: storeQuestions,
    };

    const updatedQuizzes = [...localQuizes, newQuiz];
    localStorage.setItem('quizes', JSON.stringify(updatedQuizzes));
    setLocalQuizes(updatedQuizzes);
    setQuizName('');
    setDetail('');
    setStore([]);
    setStoreQuestions([]);
    setAddQuestion(false);
  };

  const addQuestionToStore = () => {
    const newQuestion = {
      id: storeQuestions.length + 1,
      question: quest,
      options: store,
      answer: answer,
    };

    setStoreQuestions(prev => [...prev, newQuestion]);
    setQuest('');
    setAnswer('');
    setOptions('');
    setStore([]);
  };

  const addItemToStore = (newItem: string) => {
    setStore((prevStore) => [...prevStore, newItem]);
    setOptions('');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md max-h-min-content">
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="quizName" className="text-sm font-medium text-gray-700">Quiz Name:</label>
          <input 
            type="text" 
            id="quizName" 
            name="quizName" 
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Опис:</label>
          <input 
            type="text" 
            id="description" 
            name="description"
            value={detail}
            onChange={(e) => setDetail(e.target.value)} 
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div className="flex justify-between gap-5">
          <button 
            type="button" 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setAddQuestion(!addQuestion)}
          >
            Створити запитання
          </button>

          <button 
            type="button" 
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Видалити
          </button>

          <button 
            type="button" 
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={() => createQuiz()}
          >
            Зберегти
          </button>
        </div>
      </form>

      {addQuestion && (
        <div className="mx-auto p-4 bg-white shadow-md rounded-md mt-10">
          <form className="space-y-4">
            <ul>
              {storeQuestions.map(el => (
                <li key={el.id}>
                  <p>{el.answer}</p> 
                  <button type='button' onClick={() => setStoreQuestions(storeQuestions.filter(item => item.id !== el.id))}>Видалити</button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col">
              <label htmlFor="question" className="text-sm font-medium text-gray-700">Question:</label>
              <input 
                type="text" 
                id="question" 
                name='question'
                value={quest}
                onChange={(e) => setQuest(e.target.value)}  
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="answer" className="text-sm font-medium text-gray-700">Answer:</label>
              <input 
                type="text" 
                id="answer" 
                name='answer' 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <ul>
              {store.map(el => (
                <li key={el}>
                  <p>{el}</p> 
                  <button type='button' onClick={() => setStore(store.filter(item => item !== el))}>Видалити</button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col">
              <label htmlFor="option" className="text-sm font-medium text-gray-700">Option:</label>
              <input 
                type="text"
                id="option"
                name='option'
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button 
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => addItemToStore(options)}
            >
              Додати ще варіант
            </button>

            <div className="flex justify-between">
              <button 
                type="button" 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => addQuestionToStore()}
              >
                Додати Запитання
              </button>

              <button 
                type="button" 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Очистити
              </button>

              <button 
                type="button" 
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Відмінити
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default QuizCreateForm;
