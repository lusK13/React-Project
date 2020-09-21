const questions = {
    'symfony' : {
        title : "Symfony design pattern", 
        choices : ['MMV', 'MVC', 'MMVV'], 
        response : 1, //indice d'array, donc 1 = 2eme élément
        type : "select",
        name : "symfony",
        feedback : 'Symfony est basé sur le pattern MVC'
    },
    'react' : {
        title : "React est-il un framework ?", 
        choices : ['yes', 'no'], 
        response : 1, 
        type : "radio",
        name : "react",
        feedback : "React est une librairie"
    },
    'jsx' : {
        title : "JSX c'est quoi ?", 
        choices : ['JSX est un langage compilé', 'JSX est un sur-ensemble développé par Facebook'], 
        response : 1, 
        type: "radio" ,
        name : "jsx",
        feedback : 'JSX est un sur ensemble à JS'
    },
    'nouvelle question' : {
        title : "nouvelle question (la reponse est reponse 5) ?", 
        choices : ['reponse 1', 'reponse 2', 'reponse 3', 'reponse 4', 'reponse 5', 'reponse 6'], 
        response : 4, 
        type: "select" ,
        name : "nouvelle question",
        feedback : 'La reponse était 5'
    },
    'test' : {
        title : "question test radio (la reponse est reponse 2) ?", 
        choices : ['reponse 1', 'reponse 2', 'reponse 3'], 
        response : 1, 
        type: "radio" ,
        name : "nouvelle question",
        feedback : 'La reponse était 5'
    }
    
}

export default questions