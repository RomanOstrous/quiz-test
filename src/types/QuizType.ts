import { QuestionsType } from "./QuestionsType"

export type QuizType = {
  id: number,
  name: string,
  details: string,
  quizbar: QuestionsType[];
}
