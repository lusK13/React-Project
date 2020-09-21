import React, { createContext } from "react";
import {
  ADD_QUESTIONS,
  RETOUR_QCM,
  ADD_QUESTION,
  ADD_CHOICE,
  SET_QUESTION,
  DELETE_QUESTION,
} from "../constants/actions";

export const QuestionsContext = React.createContext({});

export const initialState = {
  scores: [],
  score: "",
  finish: false,
  questions: "",
  message: "",
  title: "",
  choices: [],
  choice: "",
  response: "",
  type: "",
  name: "",
  feedback: "",
};
let i = 0;
export const reducer = (state, action) => {
  switch (action.type) {
    case RETOUR_QCM:
      //target du form
      const retourQCM = action.retourQCM;

      //on récupère le questionnaire sous format array
      const questions = Object.entries(state.questions);

      //nombre de question
      const QCMLength = questions.length;

      const scores = []; //pour push 1 ou zero (vrai ou faux)
      let score = 0; //score cumulé de chaques questions

      //boucle sur le nombre de question
      for (let i = 0; i < QCMLength; i++) {
        //si les select sont bien renseigné
        if (retourQCM[i].value) {
          // console.log(retourQCM[i].value);
          // si la valeur rentré dans le select est la même que la reponse du
          // questionnaire alors on push 1 dans scores et on incrémente 1 au score
          if (retourQCM[i].value == questions[i][1].response) {
            scores.push(1);
            score++;
          }
          //sinon on push zéro dans le array scores et on n'incrémente pas le score
          else scores.push(0);
        } else {
          // sinon si les bouton radio ne sont pas renseigné on envoi le message d'erreur
          if (!retourQCM[i].querySelector("input:checked"))
            return {
              ...state,
              message: "vous devez répondre à toutes les questions",
            };
          // si la valeur rentré dans le bouton radio est la même que la reponse du
          // questionnaire alors on push 1 dans scores et on incrémente 1 au score

          if (
            retourQCM[i].querySelector("input:checked").value ==
            questions[i][1].response
          ) {
            scores.push(1);
            score++;
          }
          //sinon on push zéro dans le array scores et on n'incrémente pas le score
          else scores.push(0);
        }
      }
      //on return (si pas d'erreur) le array scores, le score total, et on indique que le
      //qcm est fini d'être rempli
      return {
        ...state,
        scores: scores,
        score: score,
        finish: true,
        message: "",
      };
    case ADD_QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions,
      };

    case ADD_QUESTION:
      const {
        title,
        choices: qChoices,
        response: qreponse,
        qtype,
        feedback,
      } = state;
      if (
        title != "" &&
        qChoices != [] &&
        qreponse != "" &&
        qtype != "" &&
        feedback != ""
      ) {
        i++;

        let newquestions = state.questions;
        let id = Math.random().toString(36).substr(2, 9);
        newquestions = newquestions.concat({
          id,
          title,
          choices: qChoices,
          response: qreponse,
          type: qtype,
          feedback,
        });

        const fetchQuestion = async () => {
          const question = {
            id,
            title,
            choices: qChoices,
            response: qreponse,
            type: qtype,
            feedback,
          };

          const options = {
            method: "POST",
            body: JSON.stringify(question), // format chaîne de caractères (objet => chaîne de caractères )
            headers: { "Content-Type": "application/json" },
          };

          const response = await fetch("http://localhost:3000/add", options);
          const info = await response.json(); // le serveur vous retourne un message que l'on souhaite récupérer en JSON
        };
        if (i == 2) {
          fetchQuestion();
        }
        return {
          ...state,
          questions: newquestions,
          choices: [],
          type: "",
          title: "",
          choice: "",
          feedback: "",
          message: "Votre question à été rajouté",
        };
      } else
        return { ...state, message: "Vous devez renseigner tous les champs" };

    case SET_QUESTION:
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
        message: "",
      };

    case ADD_CHOICE:
      let choices = state.choices;
      choices = choices.concat(state.choice);

      return {
        ...state,
        choice: "",
        choices,
        message: "",
      };
    case 'RETRY':
      return{
        ...state,
        finish:false
      }
    case DELETE_QUESTION:
      let dQuestion = action.payload;
      let dQuestions = state.questions;
      dQuestions = dQuestions.filter((a) => a.id !== dQuestion);

      let id=dQuestion
      const fetchDeleteQuestion = async () => {

          const options = {
              method: 'DELETE',
              params:id,
              headers: { "Content-Type": "application/json" }
          }

          const response = await fetch(`http://localhost:3000/question/${id}`, options);
          const info = await response.json(); // le serveur vous retourne un message que l'on souhaite récupérer en JSON

      }
      fetchDeleteQuestion()

      return {
        ...state,
        questions:dQuestions,
      };

    default:
      return state;
  }
};
