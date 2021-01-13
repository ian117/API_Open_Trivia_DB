import Question from "./questions.js";
import Category from "./Categories.js";

  let correctANSWERS = [];
  
  const urlDeCategory = "https://opentdb.com/api_category.php";

/////////
//Hacemos la petición para las CATEGORIAS
/////////
function generateCategories(category){
    const containerCategory = document.getElementById("category");

    category.forEach((categori) => {
            let categoryInstance = new Category(categori)
            containerCategory.innerHTML += categoryInstance.html
    })
}

fetch(urlDeCategory)
    .then(response => response.json())
    .then(data => generateCategories(data.trivia_categories))
/////////
////Función para imprimirse si no hay nada
/////////
function printVacio() {
    if(document.getElementById("submitButton")){
        document.getElementById("submitButton").remove()
    }
    const containerData = document.getElementById('questions-container');
    
    let html = `<div class="col-md-4 mt-3 mb-3">
                <div class="card h-100">
                    <div id="this-card" class="card-body nothing-here">
                    <h4>No hay suficientes preguntas, lo siento 🤷‍♀️😢</h4>
                    </div>
                </div>
                </div>`
    document.getElementById("questions-container").classList.add("grow")
    containerData.innerHTML = html;
    setTimeout(function() {document.getElementById("questions-container").classList.remove("grow")}, 400)
}

/////////
//Añadimos las OPCIONES para la pregunta
/////////
  function addAnswers(element){
    let correct = element.correct_answer;
    let incorrect = element.incorrect_answers;
    let answersMix = [];

    answersMix = [...incorrect]
    answersMix.splice(Math.floor(Math.random() * 4), 0, correct)
    //CONSOLE.LOG DE CORRECTAS /
    console.log(correct)
    console.log(answersMix)
    let answersParr = '';
    answersParr = `
        <option id="${answersMix[0]+1}" value="${answersMix[0]}">${answersMix[0]}</option>
       
        <option id="${answersMix[1]+1}" value="${answersMix[1]}">${answersMix[1]}</option>
        
        <option id="${answersMix[2]+1}" value="${answersMix[2]}">${answersMix[2]}</option>
        
        <option id="${answersMix[3]+1}" value="${answersMix[3]}">${answersMix[3]}</option>
        
        `
    return answersParr

}

/////////
//Hacemos un Print en el HTML de los datos
/////////
 function printData(data) {
    // obtener donde quiero poner los datos/elementos
    const containerData = document.getElementById('questions-container');
    const answersForm = document.getElementById('formAnswers');
    
    // generar los datos/elementos
    let html = '';
    
    if(document.getElementById("submitButton")){
        document.getElementById("submitButton").remove()
    }
    

    let createButtonForAnswers = document.createElement('button');
    data.forEach(element => {
        let question = new Question(element.question, element)
        html += question.html
    })

/////////
//// Poner los datos en el html
/////////
containerData.innerHTML = html;

    let newbutton = answersForm.insertBefore(createButtonForAnswers, answersForm.firstElementChild.nextSibling);
    newbutton.classList.add("btn");
    newbutton.classList.add("btn-info");
    newbutton.classList.add("mt-3");
    newbutton.classList.add("mb-3");
    newbutton.classList.add("mb-3");
    newbutton.setAttribute("type", "submit");
    newbutton.setAttribute("id", "submitButton");
    newbutton.setAttribute("onclick", "results()");
    newbutton.innerHTML = "I am correct? 🤷‍♀️";
    //finalicé de poner elementos BASE en el html
}
/////////
////Hago el PUSH de las respuestas correctas desde el fetch (función) al array global
/////////

function correctAnswers(data){
    const rightAnswers = [];
    data.forEach(element => {
        rightAnswers.push(element.correct_answer)
    })
     return (rightAnswers)
}


/////////
////   Fetch / Petición de los datos / URL / Mando la URL cómo se debe a la API
/////////
 function getQuestion() {
    const totalQuestions = document.getElementById("totalQuestions").value; //10
    const category = document.getElementById("category").value;     //
    const difficulty = document.getElementById("difficulty").value; // "easy"
    const type = document.getElementById("type").value;

    const url = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;
    
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if(data.response_code == 1) {
            printVacio()
            } else {
            printData(data.results)
            correctANSWERS = [...correctAnswers(data.results)]
            }
          }
        );
}

/////////
//// Funciones Alert / Si es correcto o incorrecto las respuestas/ Just Print
/////////
function printNoCorrect(counter){
    alert(`Tuviste: ${counter} acertadas! Intenta otra vez`)
}

function printCorrect(){
    alert("Sos un  Crack! Todas son correctas")
}
//////////////////


/////////
//Comparación de Resultados
/////////
 function results(){
    const totalQuestions = document.getElementById("totalQuestions").value;

    let counter = 0;
    let inputs_check = [...document.querySelectorAll(".chkbx")].map(element => element.value) 

    console.log(inputs_check)


    let rightANSWERS = [...correctANSWERS]

    for(let i = 0; i < rightANSWERS.length; i++){
        let txt = document.createElement("textarea");
        txt.innerHTML = rightANSWERS[i];
        let value = txt.value;
        rightANSWERS.splice(i,1, value)
        txt.remove()
    }
    
    console.log(rightANSWERS)

    if(inputs_check.length > totalQuestions){
        alert(`Por favor limita tus respuestas a ${totalQuestions}`)
        return
    }

    for (var i = 0; i < rightANSWERS.length; ++i) {
       if (rightANSWERS[i] == inputs_check[i]) 
       counter += 1
    }
    if(counter == totalQuestions){
        printCorrect()
    } else {
        printNoCorrect(counter)
    }
}

export default addAnswers
window.getQuestion = getQuestion
window.results = results