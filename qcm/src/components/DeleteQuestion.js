import React, { useContext } from "react";
import "../App.css";
import { delete_question } from "../actions/actions-type";

import { QuestionsContext } from "../reducer/questionManager";

const DeleteQuestion = () => {



  const [state, dispatch] = useContext(QuestionsContext);
  const { message, questions } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = e.target.name;
    dispatch(delete_question(id));

  };
  
  const questionsArray = Object.values(questions); //transforme l'objet en tableau pour le parcourir plus facilement
  const lengthQuestions = questionsArray.length;
  return (
    <div className='App'>
        <p>{message}</p>

        {questionsArray.map((question, i) => (
          <div className='question' key={i}>
            <p>{question.title}</p>
            <input type='button' value='delete' onClick={handleSubmit} name={question.id}/>


          </div>
        ))}
    </div>
  )};

export default DeleteQuestion;
