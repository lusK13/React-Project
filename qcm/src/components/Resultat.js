import React, { useContext } from "react";
import "../App.css";
import { QuestionsContext } from "../reducer/questionManager";

const Resultat = () => {
  const [state, dispatch] = useContext(QuestionsContext);
  const { scores, score, questions } = state;

  //transforme l'objet des questions en array pour le parcourir plus facilement
  const questionsArray = Object.entries(questions);
  //   on récupère le nombre de question pour aficher le score (ex: 5/5)
  const lengthQuestions = questionsArray.length;
  const scorePercent = Math.round(((score*100)/lengthQuestions)*100)/100
  return (
    <div className='App'>
     {scorePercent > 40? scorePercent > 60?<h2 className='green'>{scorePercent}%</h2>:<h2>{scorePercent}%</h2> : <h2 className='red'>{scorePercent}%</h2>}
      <p>
        {/* si le score est égale au nombre de questions alors on félicite l'utilisateur */}
        {score == lengthQuestions && "BRAVO!! C'est un sans faute "}
        {/* et on donne le score dans tous les cas*/}
        votre score est de {score} / {lengthQuestions}
      </p>
        {/* on boucle sur les questions */}
      {questionsArray.map((question, i) => (
        <React.Fragment key={i}>
            {/* si le score de la question i est égale à 1 alors on affiche "BRAVO.." */}
          {scores[i] == 1 ? (
            <div className='reponsejuste'>
              <p>{question[1].title}</p>
              <p>
                Bravo la reponse était bien : <br />"
                {question[1].choices[question[1].response]}"
              </p>
            </div>
          ) : (     //sinon on affiche "DOMMAGE.."
            <div className='reponsefausse'>
              <p>{question[1].title}</p>
              <p>
                Dommage la bonne réponse était : <br />"
                {question[1].choices[question[1].response]}".
                <br /> <pre>{question[1].feedback}</pre>
              </p>
            </div>
          )}
        </React.Fragment>
      ))}
            <h3 onClick={()=>dispatch({type:'RETRY'})}>refaire le test</h3>

    </div>
  );
};

export default Resultat;
