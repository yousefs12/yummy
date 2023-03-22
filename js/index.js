"use strict"

// Importing From External Files
import {Meal} from "./modules/classes.modules.js";
import {mealsApi} from "./modules/api.modules.js"

$("nav").animate({left: -$("#navList").innerWidth()}, 500);

// Adding Events
$("#toggleBtn").click(
    function () {
        if ($("nav").css("left") == "0px") {
            $("nav").animate({left: -$("#navList").innerWidth()}, 500);
            $("#toggleBtn").addClass("fa-align-justify").removeClass("fa-x")
            $("#navList ul").animate({top: "100%"}, 1000);
            
        } else {
            $("nav").animate({left: 0}, 500);
            $("#toggleBtn").addClass("fa-x").removeClass("fa-align-justify")
            $("#navList ul").animate({top: "0%"}, 1000);
        }
    }
);

$("#searchBtn").click(function () {
    $("#searchSection").show()
    $("#mainSection .row").html("")
})

$("#categoriesBtn").click(function () {
    $("#searchSection").hide();
    displayCategories();
});

$("#areaBtn").click(function () {
    $("#searchSection").hide();
    displayArea()
});

$("#ingredientsBtn").click(function () {
    $("#searchSection").hide();
    displayIngredients()
});

$("#contactUsBtn").click(function () {
    $("#searchSection").hide();
    displayContact()
});

$("#firstLetter").on("input", function () {
    searchByFirstLetter(this.value)
});

$("#name").on("input", function () {
    searchByName(this.value);
});

// Display Functions
function displayMeals(meals) {
    let container = "";
    for (let i = 0; i < meals.length; i++) {
        container += meals[i].displayCard();
    }
    $("#mainSection .row").html(container);

    $(".meal .stretched-link").click(function (e) {
        e.preventDefault()
        searchById($(e.target).attr("data-meal-id"));
    });
}

(async function getMeals() {
    $("#loadingScreen").show();
    let meals = [];
    let apiResponse = await mealsApi.nameSearch();
    if (!apiResponse) {
        displayMeals([]);
        return;
    }
    for (let i = 0; i < apiResponse.length; i++) {
        let meal = new Meal(apiResponse[i]);
        meals.push(meal);
    }
    displayMeals(meals);
    $("#loadingScreen").hide()
})();

async function searchByName(value) {
    $("#loadingScreen").show();
    let meals = [];
    let apiResponse = await mealsApi.nameSearch(value);
    if (!apiResponse) {
        displayMeals([]);
        return;
    }
    for (let i = 0; i < apiResponse.length; i++) {
        let meal = new Meal(apiResponse[i]);
        meals.push(meal);
    }
    displayMeals(meals);
    $("#loadingScreen").hide()
}

async function searchByFirstLetter(value) {
    $("#loadingScreen").show();
    let meals = [];
    if (!value) {
        displayMeals([]);
        return;
    }
    let apiResponse = await mealsApi.firstLetterSearch(value);
    if (!apiResponse) {
        displayMeals([]);
        return;
    }
    for (let i = 0; i < apiResponse.length; i++) {
        let meal = new Meal(apiResponse[i]);
        meals.push(meal);
    }
    displayMeals(meals);
    $("#loadingScreen").hide()
}

async function searchById(id) {
    $("#loadingScreen").show();
    let meals = [];
    let apiResponse = await mealsApi.idSearch(id);
    for (let i = 0; i < apiResponse.length; i++) {
        let meal = new Meal(apiResponse[i]);
        meals.push(meal);
    }
    $("#mainSection .row").html(meals[0].displayDetails());
    $("#loadingScreen").hide()
}

async function displayCategories() {
    $("#loadingScreen").show();
    let container = ``;
    let categories = await mealsApi.listCategories();
    for (let i = 0; i < categories.length; i++) {
        container += `<div class="col-md-3">
                        <div class="bg-dark position-relative overflow-hidden card category">
                            <img src="${categories[i].strCategoryThumb}" alt="meal thumbnail" class="img-fluid rounded-3">

                            <div class="overlay position-absolute top-100 w-100 h-100 bg-white opacity-75 d-flex flex-column justify-content-center p-2 rounded-3 text-center overflow-hidden">
                                <h3 class="text-black">${categories[i].strCategory}</h3>
                                <p class="fs-6">${categories[i].strCategoryDescription}</p>
                            </div>

                            <a href="" class="stretched-link" data-category-name="${categories[i].strCategory}"></a>
                        </div>
                    </div>`
    }
    $("#mainSection .row").html(container);

    $(".category .stretched-link").click(function (e) {
        e.preventDefault()
        searchCategory($(e.target).attr("data-category-name"));
    });
    $("#loadingScreen").hide()
}

async function displayArea() {
    $("#loadingScreen").show();
    let container = ``;
    let area = await mealsApi.listArea();
    for (let i = 0; i < area.length; i++) {
        container += `<div class="col-md-3">
                            <div class="bg-dark position-relative overflow-hidden text-white text-center pointer area">
                                <i class="fa-solid fa-house-laptop fa-4x"></i>
                                <h3>${area[i].strArea}</h3>
                                <a href="" class="stretched-link" data-area-name="${area[i].strArea}"></a>
                            </div>
                        </div>`
    }
    $("#mainSection .row").html(container);

    $(".area .stretched-link").click(function (e) {
        e.preventDefault()
        searchArea($(e.target).attr("data-area-name"));
    });
    $("#loadingScreen").hide()
}

async function displayIngredients() {
    $("#loadingScreen").show();
    let container = ``;
    let ingredients = await mealsApi.listIngredients();
    for (let i = 0; i <= 20; i++) {
        container += `<div class="col-md-3">
                            <div class="bg-dark position-relative overflow-hidden text-white text-center pointer ingredient">
                                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                                <h3>${ingredients[i].strIngredient}</h3>
                                <p>${ingredients[i].strDescription}</p>
                                <a href="" class="stretched-link" data-ingredient-name="${ingredients[i].strIngredient}"></a>
                            </div>
                        </div>`
    }
    $("#mainSection .row").html(container);

    $(".ingredient .stretched-link").click(function (e) {
        e.preventDefault()
        searchIngredient($(e.target).attr("data-ingredient-name"));
    });
    $("#loadingScreen").hide()
}

async function searchCategory(value) {
    $("#loadingScreen").show();
    let container = ``;
    let meals = await mealsApi.categorySearch(value);
    for (var i = 0; i < meals.length; i++) {
        container += `<div class="col-md-3">
                        <div class="bg-dark position-relative overflow-hidden card meal">
                            <img src="${meals[i].strMealThumb}" alt="meal thumbnail" class="img-fluid rounded-3">
                        
                            <div class="overlay position-absolute top-100 bottom-0 start-0 end-0 bg-white opacity-75 d-flex flex-column justify-content-center rounded-3 p-3 overflow-hidden">
                            <h3 class="text-black">${meals[i].strMeal}</h3>
                            </div>

                            <a href="" class="stretched-link" data-meal-id="${meals[i].idMeal}"></a>
                        </div>
                    </div>`
    }
    $("#mainSection .row").html(container);
    $(".meal .stretched-link").click(function (e) {
        e.preventDefault()
        searchById($(e.target).attr("data-meal-id"));
    });
    $("#loadingScreen").hide()
}

async function searchArea(value) {
    $("#loadingScreen").show();
    let container = ``;
    let meals = await mealsApi.areaSearch(value);
    for (var i = 0; i < meals.length; i++) {
        container += `<div class="col-md-3">
                        <div class="bg-dark position-relative overflow-hidden card meal">
                            <img src="${meals[i].strMealThumb}" alt="meal thumbnail" class="img-fluid rounded-3">
                        
                            <div class="overlay position-absolute top-100 bottom-0 start-0 end-0 bg-white opacity-75 d-flex flex-column justify-content-center rounded-3 p-3 overflow-hidden">
                            <h3 class="text-black">${meals[i].strMeal}</h3>
                            </div>

                            <a href="" class="stretched-link" data-meal-id="${meals[i].idMeal}"></a>
                        </div>
                    </div>`
    }
    $("#mainSection .row").html(container);
    $(".meal .stretched-link").click(function (e) {
        e.preventDefault()
        searchById($(e.target).attr("data-meal-id"));
    });
    $("#loadingScreen").hide()
}

async function searchIngredient(value) {
    $("#loadingScreen").show();
    let container = ``;
    let meals = await mealsApi.ingredientSearch(value);
    for (var i = 0; i < meals.length; i++) {
        container += `<div class="col-md-3">
                        <div class="bg-dark position-relative overflow-hidden card meal">
                            <img src="${meals[i].strMealThumb}" alt="meal thumbnail" class="img-fluid rounded-3">
                        
                            <div class="overlay position-absolute top-100 bottom-0 start-0 end-0 bg-white opacity-75 d-flex flex-column justify-content-center rounded-3 p-3 overflow-hidden">
                            <h3 class="text-black">${meals[i].strMeal}</h3>
                            </div>

                            <a href="" class="stretched-link" data-meal-id="${meals[i].idMeal}"></a>
                        </div>
                    </div>`
    }
    $("#mainSection .row").html(container);
    $(".meal .stretched-link").click(function (e) {
        e.preventDefault()
        searchById($(e.target).attr("data-meal-id"));
    });
    $("#loadingScreen").hide()
}

function displayContact() {
    $("#mainSection .row").html(`<div class="row justify-content-center g-3">
                                    <div class="col-md-6">
                                        <input type="text" id="userName" name="userName" placeholder="Enter Your Name" class="form-control">
                                        <div class="alert alert-danger d-none">Special characters and numbers not allowed</div>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" id="email" name="email" placeholder="Enter Your Email" class="form-control">
                                        <div class="alert alert-danger w-100 mt-2 d-none">Email not valid *exemple@yyy.zzz</div>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" id="phone" name="phone" placeholder="Enter Your Phone" class="form-control">
                                        <div class="alert alert-danger d-none">Enter valid Phone Number</div>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" id="age" name="age" placeholder="Enter Your Age" class="form-control">
                                        <div class="alert alert-danger d-none">Enter valid age</div>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" id="password" name="password" placeholder="Enter Your Password" class="form-control">
                                        <div class="alert alert-danger d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" id="password2" name="password2" placeholder="Repassowrd" class="form-control">
                                        <div class="alert alert-danger d-none">Enter Your Passowrd Again</div>
                                    </div>
                                    <button type="submit" class="btn btn-outline-danger w-25">Submit</button>
                                </div>`);

    // Contact Us Form
    $("#userName").on("input", function () {
        console.log("qwer");
        let regex = /^[a-zA-z]*$/.test($(this).val())
        regex ? $(this).next().addClass("d-none") : $(this).next().removeClass("d-none")
    });

    $("#email").on("input", function () {
        let regex = /^[a-zA-z]*@[a-zA-z]{3,}\.[a-zA-z]{3,}$/.test($(this).val());
        regex ? $(this).next().addClass("d-none") : $(this).next().removeClass("d-none")
    });

    $("#phone").on("input", function () {
        let regex = /^[0-9]{11,12}$/.test($(this).val());
        regex ? $(this).next().addClass("d-none") : $(this).next().removeClass("d-none")
    });

    $("#age").on("input", function () {
        let regex = ($(this).val() < 100);
        regex ? $(this).next().addClass("d-none") : $(this).next().removeClass("d-none")
    });

    $("#password").on("input", function () {
        let regex1 = $(this).val().length >= 8;
        let regex2 = $(this).val().match(/[a-zA-Z]/);
        let regex3 = $(this).val().match(/\d/);
        regex1 && regex2 &&regex3 ? $(this).next().addClass("d-none") : $(this).next().removeClass("d-none")
    });

    $("#password2").on("input", function () {
        let regex = $(this).val() == $('#password').val();
        regex ? $(this).next().addClass("d-none") : $(this).next().removeClass("d-none")
    });
}