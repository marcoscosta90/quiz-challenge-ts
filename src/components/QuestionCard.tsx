import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import React from "react";
import { AnswerObject } from "../App";

const useStyles = makeStyles({
  root: {
    maxWidth: "1100px",    
    background: "#ebfeff",
    borderRadius: "10px",
    border: "2px solid #0085a3",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    textAlign: "center",
    padding: "4rem",
  },
  number: {
    fontSize: "1.5rem",
    marginBottom: "1.5rem"
  },
  button: {
    width: '20rem',
    marginTop: '1rem',
  }
});

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;  
  numberQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,  
  numberQuestions
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.number}>
        Question: {questionNumber} / {numberQuestions}
      </Typography>
      <Typography
        className={classes.number}
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div>
        {answers.map((answer) => (
          <div key={answer}>
            <Button
              className={classes.button}
              variant="outlined"
              size="large"
              color="primary"
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </Button>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default QuestionCard;
