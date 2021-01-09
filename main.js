function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
  }
  
function decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }

const urlDeCategory = "https://opentdb.com/api_category.php"
let correctANSWERS = []

function generateCategories(category){
    const containerCategory = document.getElementById("category");

    category.forEach((category) => {
            containerCategory.innerHTML += `<option value="${category.id}">${category.name}</option>`
    })
}

fetch(urlDeCategory)
    .then(response => response.json())
    .then(data => generateCategories(data.trivia_categories))


function printVacio(){
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

function addAnswers(element){
    let correct = element.correct_answer;
    let incorrect = element.incorrect_answers;
    let answersMix = [];

    answersMix = [...incorrect]
    answersMix.splice(Math.floor(Math.random() * 4), 0, correct)
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
        html += `<div class="col-md-4 mt-3">
                <div class="card h-100">
                    <div class="card-body">
                        ${element.question}
                            <br>
                        <select class="chkbx" name="" id="">
                            ${addAnswers(element)}
                        </select>
                    </div>
                </div>
            </div>`
    });
    // poner los datos en el html
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

function correctAnswers(data){
    const rightAnswers = [];
    data.forEach(element => {
        rightAnswers.push(element.correct_answer)
    })
     return (rightAnswers)
}


function getQuestions() {
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

function printNoCorrect(counter){
    alert(`Tuviste: ${counter} acertadas! Intenta otra vez`)
}

function printCorrect(){
    alert("Sos un  Crack! 10/10")
}

function results(){
    let counter = 0;
    let inputs_check = [...document.querySelectorAll(".chkbx")].map(element => element.value) 

    // for(let i = 0; i < correctANSWERS.length; i++){
    //     if(i == 0){
    //         inputs_check.splice(0,0,decode_utf8(inputs_check[0])) 
    //         correctANSWERS.splice(0,0,decode_utf8(correctANSWERS[0])) 

    //     }else{
    //         inputs_check.splice(i,0,decode_utf8(inputs_check[i])) 
    //         correctANSWERS.splice(i,0,decode_utf8(correctANSWERS[i]))
    //     }
    // }

    console.log(inputs_check)


    let rightANSWERS = [...correctANSWERS]
    console.log(rightANSWERS)

    if(inputs_check.length > 10){
        alert("Por favor limita tus respuestas a 10")
        return
    }

    for (var i = 0; i < rightANSWERS.length; ++i) {
       if (rightANSWERS[i] == inputs_check[i]) 
       counter += 1
    }
    if(counter == 10){
        printCorrect()
    } else {
        printNoCorrect(counter)
    }
}