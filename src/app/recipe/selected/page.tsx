"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../../../utils/api";
import { useParams } from "next/navigation";
import { Container, Typography, CircularProgress } from "@mui/material";
import { Suspense } from "react";

function RecipeContent() {
    const { id } = useParams();

    if (!id) return <Typography variant="h6">not found</Typography>;

    const { data: recipe, isLoading } = useQuery({
        queryKey: ["recipe", id],
        queryFn: () => fetchRecipeById(id as string),
    });

    if (isLoading) return <CircularProgress />;

    if (!recipe) return <Typography variant="h6">Рецепт не найден</Typography>;

    return (
        <Container>
            <Typography variant="h4">{recipe.strMeal}</Typography>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} width={300} />
            <Typography variant="body1">{recipe.strInstructions}</Typography>
        </Container>
    );
}

export default function RecipePage() {
    return (
        <Suspense fallback={<CircularProgress />}>
            <RecipeContent />
        </Suspense>
    );
}
