class Question {
    constructor(question, answer){
        this.question = question;
        this.answer = answer;
        this.html =`<div class="col-md-4 mt-3">
                        <div class="card h-100">
                            <div class="card-body">
                                ${question}
                                    <br>
                                <select class="chkbx" name="" id="">
                                    ${addAnswers(answer)}
                                </select>
                            </div>
                        </div>
                    </div>`
    }
}

export default Question