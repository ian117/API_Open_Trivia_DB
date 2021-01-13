class Category {
    constructor(category){
        this.id = category.id;
        this.name = category.name;
        this.html = `<option value="${this.id}">${this.name}</option>`;
    }
}

export default Category