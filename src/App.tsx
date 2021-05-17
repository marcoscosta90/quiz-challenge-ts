import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
import BGImage from "./images/background.jpg";

import QuestionCard from "./components/QuestionCard";

import { Difficulty, QuestionState } from "./API";
import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const useStyles = makeStyles({
  root: {
    height: "calc(100vh + 400px)",      
    maxWidth: "100%",
    backgroundImage: `url(${BGImage})`,
    backgroundSize: '100%'
    
  },

  body: {              
    padding: "2rem 0 8rem 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
  },

  title: {
    color: "#3498db",
    backgroundImage: 'linear-gradient(180deg, #fff, #9b59b6)',
    fontWeight: 400,
    padding: "1rem 7rem",
    backgroundSize: '100%',
    backgroundClip: 'text',   
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    borderRadius: "1rem", 
    fontSize: '2rem',
    textAlign: 'center',
    margin: '20px',
  },

  start: {
    border: "none",
    cursor: "pointer",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    borderRadius: "6px",
    height: "40px",
    margin: "1rem 0",
    width: "300px",    
    color: "#fff",
    backgroundSize: "200%",
    transition: "0.4s",
    "&:hover": {
      backgroundPosition: "right",
    },
  },
  start1: {
    backgroundImage: "linear-gradient(to left, #34495e, #9b59b6, #3498db)",
  },
  score: {
    fontSize: "1.5rem",
    marginBottom: "1.5rem"
  },
});

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const classes = useStyles();

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answer
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore((prev) => prev + 1);
      }

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <Container className={classes.root}>
      <Box className={classes.body}>
        <Typography className={classes.title}>Quiz do Marcos</Typography>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <Box style={{display: 'flex', flexDirection: 'column'}}>
          <Button
            variant="contained"
            className={`${classes.start} ${classes.start1}`}
            onClick={startQuiz}
          >
            Start
          </Button>

             <Button
             variant="contained"
             className={`${classes.start} ${classes.start1}`}
             onClick={startQuiz}
           >
             Reset
           </Button>
           </Box>
        ) : null}

        {!gameOver ? <Typography className={classes.score}>Score: {score}</Typography> : null}
        {loading && <Typography>Loading questions...</Typography>}

        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <Button className={`${classes.start} ${classes.start1}`} onClick={nextQuestion}>
            Next question
          </Button>
        ) : null}
      </Box>
    </Container>
  );
};

export default App;
