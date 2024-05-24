import React, { useEffect, useState } from 'react';
import { QuizType } from '../types/QuizType';
import { useNavigate } from 'react-router-dom';

type Props = {
  quiz: QuizType;
  onQuizUpdate: (quiz: QuizType) => void;
  handleQuizDelete: (id: number) => void;
};

const QuizCard: React.FC<Props> = ({ quiz, onQuizUpdate, handleQuizDelete }) => {
  const [edit, setEdit] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState<number | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [option, setOption] = useState('');
  const [optionsState, setOptionsState] = useState<string[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (editQuestionId !== null) {
      const selectedQuestion = quiz.quizbar.find(el => el.id === editQuestionId);
      if (selectedQuestion) {
        setAnswer(selectedQuestion.answer);
        setOptionsState(selectedQuestion.options);
      }
    }
  }, [editQuestionId, quiz.quizbar]);

  const addQuestion = () => {
    const newQuestion = {
      id: quiz.quizbar.length + 1,
      question: question,
      options: [],
      answer: '',
    };

    const updatedQuizbar = [...quiz.quizbar, newQuestion];
    const updatedQuiz = { ...quiz, quizbar: updatedQuizbar };

    onQuizUpdate(updatedQuiz);
    setQuestion('');
  };

  const deleteQuestion = (id: number) => {
    const updatedQuizbar = quiz.quizbar.filter(el => el.id !== id);
    const updatedQuiz = { ...quiz, quizbar: updatedQuizbar };
    onQuizUpdate(updatedQuiz);
  };

  const saveQuestion = (id: number) => {
    const updatedQuizbar = quiz.quizbar.map(el =>
      el.id === id ? { ...el, answer, options: optionsState } : el
    );
    const updatedQuiz = { ...quiz, quizbar: updatedQuizbar };
    onQuizUpdate(updatedQuiz);
    setEditQuestionId(null);
    setOption('');
    setOptionsState([]);
  };

  const addOption = () => {
    if (option.trim() !== '') {
      setOptionsState(prev => [...prev, option]);
      setOption('');
    }
  };

  const deleteOption = (index: number) => {
    setOptionsState(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-gray-300 bg-white rounded p-4 w-[500px] mb-6 shadow-sm">
      <div className="mb-2">
        <p className="font-semibold text-lg">{quiz.name}</p>
        <p className="text-gray-600">{quiz.details}</p>
      </div>
      
      <div className="flex gap-2 justify-between mb-4">
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => handleQuizDelete(quiz.id)}
        >
          Remove
        </button>

        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
          onClick={() => setEdit(!edit)}
        >
          {edit === false ? <p>Edit</p> : <p>Accept</p>}
        </button>

        <button 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={()=> navigate(`/quiz/${quiz.id}`)}
        >
          Start
        </button>
      </div>

      {edit && (
        <ul className="mt-5 space-y-3">
          <li className="flex items-center mb-2">
            <input 
              type="text" 
              name="Add question" 
              value={question} 
              onChange={(e) => setQuestion(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
            />
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
              onClick={addQuestion}
            >
              Add question
            </button>
          </li>

          {quiz.quizbar.map((el) => (
            <div key={el.id} className="bg-gray-50 border border-gray-200 rounded p-4">
              <li className="mb-2">{el.question}</li>
              <div className="flex gap-2 justify-between mb-2">
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => deleteQuestion(el.id)}
                >
                  Remove
                </button>

                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
                  onClick={() => setEditQuestionId(el.id)}
                >
                  Edit
                </button>

                <button 
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" 
                  onClick={() => saveQuestion(el.id)}
                >
                  Save
                </button>
              </div>

              {editQuestionId === el.id && (
                <div className="mt-2">
                  <div className="mt-2 flex justify-between items-center">
                    <p className="font-semibold">Right answer:</p>
                    <input 
                      type="text" 
                      name="Answer" 
                      value={answer} 
                      onChange={(e) => setAnswer(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 mb-2"
                    />
                  </div>
 
                  <ul className="space-y-2">
                    {optionsState.map((option, index) => (
                      <li key={index} className="flex items-center justify-between">
                        {option}
                        <button 
                          className="px-2 py-1 ml-2 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => deleteOption(index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}

                    <li className="flex items-center">
                      <input 
                        type="text" 
                        name="Add option" 
                        className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
                        value={option}
                        onChange={(e) => setOption(e.target.value)} 
                      />
                      <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={addOption}
                      >
                        Add option
                      </button>
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
