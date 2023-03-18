"use strict"

export let mealsApi = {
    baseUrl: "https://www.themealdb.com/api/json/v1/1/",

    nameSearch: async function (search = "") {
        let apiResponse = await fetch (this.baseUrl + "search.php?s=" + search);
        let apiJson = await apiResponse.json();
        return apiJson.meals
    },

    firstLetterSearch: async function (letter) {
        let apiResponse = await fetch (this.baseUrl + "search.php?f=" + letter);
        let apiJson = await apiResponse.json();
        return apiJson.meals
    },

    listCategories: async function () {
        let apiResponse = await fetch (this.baseUrl + "categories.php");
        let apiJson = await apiResponse.json();
        return apiJson.categories
    },

    listArea: async function () {
        let apiResponse = await fetch (this.baseUrl + "list.php?a=list");
        let apiJson = await apiResponse.json();
        return apiJson.meals
    },


    listIngredients: async function () {
        let apiResponse = await fetch (this.baseUrl + "list.php?i=list");
        let apiJson = await apiResponse.json();
        return apiJson.meals
    },

    categorySearch: async function (category) {
        let apiResponse = await fetch (this.baseUrl + "filter.php?c=" + category);
        let apiJson = await apiResponse.json();
        return apiJson.meals
    },

    areaSearch: async function (area) {
        let apiResponse = await fetch (this.baseUrl + "filter.php?a=" + area);
        let apiJson = await apiResponse.json();
        return apiJson.meals
    },

    ingredientSearch: async function (ingredient) {
        let apiResponse = await fetch (this.baseUrl + "filter.php?c=" + ingredient);
        let apiJson = await apiResponse.json();
        return apiJson.meals
    },

    idSearch: async function (id) {
        let apiResponse = await fetch (this.baseUrl + "lookup.php?i=" + id);
        let apiJson = await apiResponse.json();
        return apiJson.meals
    }
}