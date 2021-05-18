import axios from "axios";
import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,   
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
  const response = await axios(endpoint);
  console.log(response.data.results);
  return response.data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
