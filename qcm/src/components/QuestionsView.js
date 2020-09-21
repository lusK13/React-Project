import React, { useContext } from "react";
import "../App.css";
import { RETOUR_QCM } from "../constants/actions";
import { QuestionsContext } from "../reducer/questionManager";
import Resultat from "./Resultat";

const QuestionView = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const retourQCM = e.target.getElementsByClassName("result");
    dispatch({ type: RETOUR_QCM, retourQCM: retourQCM });
  };

  const [state, dispatch] = useContext(QuestionsContext);
  const { scores, score, finish, message, questions } = state;

  
  const questionsArray = Object.values(questions); //transforme l'objet en tableau pour le parcourir plus facilement
  const lengthQuestions = questionsArray.length;
  if(!finish)
  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <p>{message}</p>

        {/* on bloucle sur le questionnaire, et on récupère les questions, les choix de réponse et le titre des questions */}
        {questionsArray.map((question, i) => (
          <div className='question' key={i}>
            {/* question[0] contient la clé de la question (titre), question[1] contient les questions, réponse, choix ect.. */}
            {/* on affiche les questions */}
            <p>{question.title}</p>

            {/* puis les réponses */}

                {/* si c'est un select.. */}
              {question.type == "select" ? (
                <select className='result' name={question.id}>
                  <option value=''>--Please choose an option--</option>
                  {question.choices.map((choice, j) => (
                    <option key={j} value={j}>
                      {choice}
                    </option>
                  ))}
                </select>
              ) : (     //sinon si c'est un bouton radio..
              
              <div className='result'>
                  {question.choices.map((choice, j) => (
                    <div key={j} className='radio'>
                      <input
                        type='radio'
                        // on met le choix de la question dans l'id afin de l'associer au for du label
                        // on enlève les espaces pour être conforme à la norme html
                        id={choice.replace(/ /g, "")}
                        
                        //la valeur équivaut à la position de la réponse (x eme réponse)
                        value={j}
                        // on met le titre de la question afin de lier les boutons radio entre eux
                        name={question.id}
                      />
                      <label htmlFor={choice.replace(/ /g, "")}>{choice}</label>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
        <button>Envoyer QCM</button>
      </form>
    </div>
  );
  else
  return(<Resultat />)
};

export default QuestionView;
