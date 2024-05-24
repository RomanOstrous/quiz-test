import React, { useState } from 'react';
import { QuizType } from '../types/QuizType';
import { QuestionsType } from '../types/QuestionsType';

type Props = {
  onAddQuiz: (quiz: Omit<QuizType, 'id'>) => void
}

const QuizCreateForm: React.FC<Props> = ({ onAddQuiz }) => {
  const [addQuestion, setAddQuestion] = useState(false);
  const [quizName, setQuizName] = useState('');
  const [detail, setDetail] = useState('');
  const [quest, setQuest] = useState('');
  const [answer, setAnswer] = useState('');
  const [options, setOptions] = useState('');
  const [store, setStore] = useState<string[]>([]);
  const [storeQuestions, setStoreQuestions] = useState<QuestionsType[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const createQuiz = () => {
    const newErrors: { [key: string]: string } = {};
    if (!quizName) newErrors.quizName = 'Quiz name is required';
    if (!detail) newErrors.detail = 'Description is required';
    if (storeQuestions.length === 0) newErrors.questions = 'At least one question is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newQuiz = {
      name: quizName,
      details: detail,
      quizbar: storeQuestions,
    };

    onAddQuiz(newQuiz);
    setQuizName('');
    setDetail('');
    setStore([]);
    setStoreQuestions([]);
    setAddQuestion(false);
    setErrors({});
  };

  const addQuestionToStore = () => {
    const newErrors: { [key: string]: string } = {};
    if (!quest) newErrors.quest = 'Question is required';
    if (!answer) newErrors.answer = 'Answer is required';
    if (store.length < 2) newErrors.options = 'At least two options are required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
    setErrors({});
  };

  const addItemToStore = (newItem: string) => {
    if (!newItem) {
      setErrors(prev => ({ ...prev, options: 'Option cannot be empty' }));
      return;
    }

    setStore((prevStore) => [...prevStore, newItem]);
    setOptions('');
    setErrors(prev => ({ ...prev, options: '' }));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md max-h-min-content w-[500px] mb-6">
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="quizName" className="text-sm font-medium text-gray-700">Quiz Name:</label>
          <input
            type="text"
            id="quizName"
            name="quizName"
            value={quizName}
            onChange={(e) => {
              setQuizName(e.target.value);
              setErrors(prev => ({ ...prev, quizName: '' }));
            }}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.quizName && <p className="text-red-500 text-sm">{errors.quizName}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={detail}
            onChange={(e) => {
              setDetail(e.target.value);
              setErrors(prev => ({ ...prev, detail: '' }));
            }}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.detail && <p className="text-red-500 text-sm">{errors.detail}</p>}
        </div>

        <div className="flex justify-between gap-5">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setAddQuestion(true)}
          >
            Create a question
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={() => createQuiz()}
          >
            Save
          </button>
        </div>
        {errors.questions && <p className="text-red-500 text-sm">{errors.questions}</p>}
      </form>

      {addQuestion && (
        <div className="mx-auto p-4 bg-white shadow-md rounded-md mt-10">
          <form className="space-y-4">
            <ul className="space-y-2">
              {storeQuestions.map(el => (
                <li key={el.id} className="flex justify-between mb-2 p-1 bg-gray-50 rounded-md shadow-md items-center">
                  <p>{el.question}</p>
                  <button
                    type="button"
                    onClick={() => setStoreQuestions(storeQuestions.filter(item => item.id !== el.id))}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col">
              <label htmlFor="question" className="text-sm font-medium text-gray-700">Question:</label>
              <input
                type="text"
                id="question"
                name="question"
                value={quest}
                onChange={(e) => {
                  setQuest(e.target.value);
                  setErrors(prev => ({ ...prev, quest: '' }));
                }}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.quest && <p className="text-red-500 text-sm">{errors.quest}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="answer" className="text-sm font-medium text-gray-700">Answer:</label>
              <input
                type="text"
                id="answer"
                name="answer"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setErrors(prev => ({ ...prev, answer: '' }));
                }}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.answer && <p className="text-red-500 text-sm">{errors.answer}</p>}
            </div>

            <ul className="space-y-2">
              {store.map(el => (
                <li key={el} className="flex justify-between mb-2 p-1 bg-gray-50 rounded-md shadow-md items-center">
                  <p>{el}</p>
                  <button
                    type="button"
                    onClick={() => setStore(store.filter(item => item !== el))}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col">
              <label htmlFor="option" className="text-sm font-medium text-gray-700">Option:</label>
              <input
                type="text"
                id="option"
                name="option"
                value={options}
                onChange={(e) => {
                  setOptions(e.target.value);
                  setErrors(prev => ({ ...prev, options: '' }));
                }}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.options && <p className="text-red-500 text-sm">{errors.options}</p>}
            </div>

            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => addItemToStore(options)}
            >
              Add option
            </button>

            <div className="flex gap-4 justify-between">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => addQuestionToStore()}
              >
                Add question
              </button>

              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={() => { setQuest(''); setOptions(''); setAnswer('') }}
              >
                Clean
              </button>

              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => setAddQuestion(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default QuizCreateForm;
