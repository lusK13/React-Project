import React from 'react';
import {add_questions} from './actions/actions-type'
import {initialState, reducer, QuestionsContext} from './reducer/questionManager'
import questions from "./questions";


const Provider = ({ children }) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/questions"); // await attend que le serveur réponde
      const datas = await response.json(); // Puis dans response on demande à fetch de nous renvoyer les data dans un JSON
      dispatch(add_questions(datas));

      // authorsData = datas
      // datas.map((data)=>{dispatch(set_author(data))})
    };

    fetchData();
  }, []);

    

    return (
        <QuestionsContext.Provider value={[state, dispatch]}>
            {children}
        </QuestionsContext.Provider>
    )
}

export default Provider;