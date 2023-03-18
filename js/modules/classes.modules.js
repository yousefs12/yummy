export class Meal {
    constructor(meal) {
        this.id = meal.idMeal;
        this.title = meal.strMeal;
        this.area = meal.strArea;
        this.category = meal.strCategory;
        this.thumbnail = meal.strMealThumb;
        this.ingredients = [];
        this.measures = [];
        this.source = meal.strSource;
        this.instruction = meal.strInstructions;
        this.youtube = meal.strYoutube;
        this.tags = meal.strTags ? meal.strTags.split(",").map(el => el.trim()) : [];
        

        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${+ i}`]) {
                this.ingredients.push(meal[`strIngredient${+ i}`]);
                this.measures.push(meal[`strMeasure${+ i}`])
            }
        }
    }

    displayCard() {
        return `<div class="col-md-3">
                    <div class="bg-dark position-relative overflow-hidden card meal">
                        <img src="${this.thumbnail}" alt="meal thumbnail" class="img-fluid rounded-3">

                        <div class="overlay position-absolute top-100 bottom-0 start-0 end-0 bg-white opacity-75 d-flex flex-column justify-content-center rounded-3 p-3 overflow-hidden">
                            <h3 class="text-black">${this.title}</h3>
                        </div>

                        <a href="" class="stretched-link" data-meal-id="${this.id}"></a>
                    </div>
                </div>`
    }

    displayDetails() {
        let ingredientsList = ``;
        let tagsList = ``;
        for (let i = 0; i < this.ingredients.length; i++){
            ingredientsList += `<li class="alert alert-info m-2 p-1">${this.measures[i] + " " +this.ingredients[i]}</li>`
        }
        for (let i = 0; i < this.tags.length; i++){
            tagsList += `<li class="alert alert-danger m-2 p-1">${this.tags[i]}</li>`
        }
        return `<div class="col-md-4">
                    <div>
                        <img src="${this.thumbnail}" alt="meal thumbnail" class="img-fluid">
                        <h2 class="text-white">${this.title}</h2>
                    </div>
                </div>

                <div class="col-md-8">
                    <div class="text-white">
                        <h2>Instructions</h2>
                        <p>${this.instruction}</p>
                        <h3>Area : ${this.area}</h3>
                        <h3>Category : ${this.category}</h3>
                        <h3>Recipes :</h3>
                        <ul class="d-flex flex-wrap list-unstyled">${ingredientsList}</ul>
                        <h3>Tag :</h3>
                        <ul class="d-flex flex-wrap list-unstyled">${tagsList}</ul>

                        <a href="${this.source}" class="btn btn-success">Source</a>
                        <a href="${this.youtube}" class="btn btn-danger">Youtube</a>
                    </div>
                </div>`
    }
}