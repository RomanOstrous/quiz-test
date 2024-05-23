import React from 'react'
import QuizCard from './QuizCard';
import { QuizType } from '../types/QuizType';

type Props = {
  quizs: QuizType[];
}

const QuizList: React.FC<Props> = ({ quizs }) => {
  if (quizs.length === 0) {
    return <p className="text-center text-gray-500">Список квізів порожній</p>;
  }

  return (
    <ul className="divide-gray-200">
      {quizs.map((el) => (
        <li key={el.id} className="py-2">
          <QuizCard quiz={el} />
        </li>
      ))}
    </ul>
  );
};

export default QuizList;
