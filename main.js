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
        <input type="checkbox" class="chkbx" name="${answersMix[0]+110}" id="${answersMix[0]+110}" value="${answersMix[0]}"></input>
        <label for="${answersMix[0]+110}"> ${answersMix[0]}</label><br>
        <input type="checkbox" class="chkbx" name="${answersMix[1]+110}" id="${answersMix[1]+110}" value="${answersMix[1]}"></input>
        <label for="${answersMix[1]+110}"> ${answersMix[1]}</label><br>
        <input type="checkbox" class="chkbx" name="${answersMix[2]+110}" id="${answersMix[2]+110}" value="${answersMix[2]}"></input>
        <label for="${answersMix[2]+110}"> ${answersMix[2]}</label><br>
        <input type="checkbox" class="chkbx" name="${answersMix[3]+110}" id="${answersMix[3]+110}" value="${answersMix[3]}"></input>
        <label for="${answersMix[3]+110}"> ${answersMix[3]}</label><br>
        `

//  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
//<label for="vehicle1"> I have a bike</label><br>
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
                        ${addAnswers(element)}
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
            console.log(correctANSWERS)
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
    let inputs_check = [...document.querySelectorAll(".chkbx:checked")].map(element => element.value) 
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