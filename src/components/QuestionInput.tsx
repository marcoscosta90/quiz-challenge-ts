import {
  Box,
  makeStyles,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
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
    marginBottom: "1.5rem",
  },
  button: {
    width: "7rem",
    marginLeft: "5rem",
  },
  start: {
    border: "none",
    cursor: "pointer",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    borderRadius: "6px",
    height: "40px",
    margin: "1rem 0",
    width: "200px",
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
});

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  numberQuestions: number;
};

const QuestionInput: React.FC<Props> = ({
  onChange,
  handleSubmit,
  numberQuestions,
}) => {
  const classes = useStyles();


  return (
    <Box className={classes.root}>
      <Typography className={classes.number}>
        Digite quantas perguntas voce deseja responder:
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TextField
            value={numberQuestions || ""}
            onChange={onChange}
            id="outlined-basic"
            label="Digite aqui..."
            variant="outlined"
          />
          <Button
            type="submit"
            variant="outlined"
            size="small"
            color="primary"
            className={`${classes.start} ${classes.start1}`}
          >
            Avançar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default QuestionInput;
