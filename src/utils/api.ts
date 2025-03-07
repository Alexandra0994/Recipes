import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchRecipes = async (searchQuery = "") => {
    const { data } = await axios.get(
        `${BASE_URL}/search.php?s=${searchQuery}`
    );
    return data.meals || [];
};
export const fetchRecipeById = async (id: string) => {
    const { data } = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    return data.meals[0];
};

export const fetchCategories = async () => {
    const { data } = await axios.get(`${BASE_URL}/categories.php`);
    return data.categories;
};
