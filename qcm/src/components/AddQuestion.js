import React, { useContext } from "react";
import { add_choice, set_new_question, add_question } from "../actions/actions-type";
import { QuestionsContext } from '../reducer/questionManager';
import {Wrapper, FormQuestion, Input, Select, TextArea, Button, FormRender} from '../styled'


const AddQuestion = ()=> {

  const pushChoice = (e)=>{
    dispatch(add_choice())
  }
  const pushQuestion = (e)=>{
    e.preventDefault()
    dispatch(add_question())
  }

  const [state, dispatch] = useContext(QuestionsContext);
  const handleChange = e => {
    const { value, name  } = e.target;
    
    dispatch(set_new_question({value, name}));
}

const { choice, choices, title, response, qtype, message, feedback}=state;
// console.log(state.type);
return (
  <Wrapper>
<FormQuestion>
  <h4>{message}</h4>
    <p>Question<Input type="text" name="title" onChange={handleChange} value={title} /></p>
    <p className='inlinegrid'>Reponse<Input type="text" name="choice" value={choice} onChange={handleChange}/>
    <button onClick={pushChoice}>Ajouter une reponse</button></p>
    <p className='inlinegrid marginleft'>type<Select name="qtype" onChange={handleChange}>
      <option value="">Choisir un type</option>
    <option value="radio">Bouton radio</option>
    <option value="select">Select</option>
    </Select></p>    
    <p>Bonne reponse : <Select name="response" onChange={handleChange}><option value="">Choisir une reponse</option>
{choices != [] ?choices.map((choice, k)=><option key={k} value={k}>{choice}</option>):null}</Select></p>
    <p>Explication<TextArea name="feedback" onChange={handleChange} value={feedback} /></p>
    

    <Button onClick={pushQuestion}>Ajouter question</Button>

</FormQuestion>
<FormRender>
{state.title}<br/>
{state.qtype== 'select'?<select>
  {state.choices.map((e, k)=><option key={k}>{e}</option>)}
</select>:
state.choices.map((e, k)=><React.Fragment key={k}><input name='name' type="radio" id={e}/><label for="{e}">{e}</label><br/>
</React.Fragment>)}


</FormRender>

</Wrapper>
  );
}

export default AddQuestion;
