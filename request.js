class Request {
    static getCategories(){
        return fetch('https://opentdb.com/api_category.php')
    }
    static getQuestions(){
        const [totalQuestions, category, difficulty, type] = this.getFilters();

        return fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`)
    }
    static getFilters(){
        const totalQuestions = document.getElementById("totalQuestions").value; //10
        const category = document.getElementById("category").value;     //
        const difficulty = document.getElementById("difficulty").value; // "easy"
        const type = document.getElementById("type").value;
        
        return [totalQuestions, category, difficulty, type]
    }
}

export default Request