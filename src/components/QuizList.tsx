import React from 'react';
import QuizCard from './QuizCard';
import { QuizType } from '../types/QuizType';

type Props = {
  quizes: QuizType[];
  onQuizUpdate: (quiz: QuizType) => void;
  handleQuizDelete: (id: number) => void;
};

const QuizList: React.FC<Props> = ({ quizes, onQuizUpdate, handleQuizDelete }) => {
  if (quizes.length === 0) {
    return <p className="text-center text-gray-500">Список квізів порожній</p>;
  }

  return (
    <ul className="divide-gray-200">
      {quizes.map((quiz) => (
        <li key={quiz.id} className="pb-2">
          <QuizCard quiz={quiz} onQuizUpdate={onQuizUpdate}  handleQuizDelete={handleQuizDelete}/>
        </li>
      ))}
    </ul>
  );
};

export default QuizList;
