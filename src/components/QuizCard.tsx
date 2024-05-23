import React, { useState } from 'react';
import { QuizType } from '../types/QuizType';

type Props = {
  quiz: QuizType;
};

const QuizCard: React.FC<Props> = ({ quiz }) => {
  const [edit, setEdit] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState<number | null>(null);
  const [question, setQuestion] = useState('');

  const addQuestion = () => {
    const state = {
      id: quiz.quizbar.length + 1,
      question: question,
      options: [],
      answer: '',
    }

    const updatedQuizbar = [...quiz.quizbar, state];
    const updatedQuiz = { ...quiz, quizbar: updatedQuizbar };

    const quizzes = JSON.parse(localStorage.getItem('quizes') || '[]');
    const quizIndex = quizzes.findIndex((q: any) => q.id === quiz.id);
    if (quizIndex !== -1) {
      quizzes[quizIndex] = updatedQuiz;
    } else {
      quizzes.push(updatedQuiz);
    }

    localStorage.setItem('quizes', JSON.stringify(quizzes));
  }

  return (
    <div className="border border-gray-300 bg-white rounded p-4 ">
      <div className="mb-2">
        <p className="font-semibold">{quiz.name}</p>
        <p>{quiz.details}</p>
      </div>
      
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Видалити</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setEdit(!edit)}>Редагувати</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Розпочати</button>
      </div>

      {edit && (
        <ul className="mt-4">
          <li className="flex items-center mb-2">
            <input 
              type="text" 
              name='Add question' 
              value={question} 
              onChange={(e) => setQuestion(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
            />
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
              onClick={() => addQuestion()}
            >
              Додати питання
            </button>
          </li>

          {quiz.quizbar.map((el) => (
            <div key={el.id} className="mb-4">
              <li className="mb-2">{el.question}</li>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Видалити</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setEditQuestionId(el.id)}>Редагувати</button>
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => setEditQuestionId(null)}>Зберегти</button>
              </div>

              {editQuestionId === el.id && (
                <div className="mt-2">
                  <p className="font-semibold">Right answer:</p>
                  <input type="text" name='Answer' value={el.answer} className="border border-gray-300 rounded px-2 py-1 mb-2" />
                  <ul>
                    {el.options.map((option, index) => (
                      <li key={index} className="flex items-center mb-2">
                        {option}
                        <button className="px-2 py-1 ml-2 bg-red-500 text-white rounded hover:bg-red-600">Видалити</button>
                      </li>
                    ))}
                    <li className="flex items-center">
                      <input type="text" name='Add option' className="border border-gray-300 rounded px-2 py-1 mr-2" />
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Додати варіант</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizCard;
