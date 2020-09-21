import {
    ADD_QUESTION,
    ADD_QUESTIONS,
    ADD_CHOICE,
    SET_QUESTION,
    DELETE_QUESTION

} from '../constants/actions';


export const add_questions = payload => {
    // console.log(payload)
    return {
        type: ADD_QUESTIONS, payload
    };
}
   
export const set_new_question = payload => {
        // console.log(payload)
        return {
            type: SET_QUESTION, payload
        };
}

export const add_choice = payload => {
    // console.log(payload)
    return {
        type: ADD_CHOICE, payload
    };
}
export const add_question = payload => {
    // console.log(payload)
    return {
        type: ADD_QUESTION, payload
    };
}
export const delete_question = payload => {
    // console.log(payload)
    return {
        type: DELETE_QUESTION, payload
    };
}


