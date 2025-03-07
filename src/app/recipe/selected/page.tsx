"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../../../utils/api";
import { useParams } from "next/navigation";
import { Container, Typography, CircularProgress } from "@mui/material";

export default function RecipePage() {
    const { id } = useParams();
    const { data: recipe, isLoading } = useQuery({
        queryKey: ["recipe", id],
        queryFn: () => fetchRecipeById(id as string),
    });

    if (isLoading) return <CircularProgress />;

    return (
        <Container>
            <Typography variant="h4">{recipe.strMeal}</Typography>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} width={300} />
            <Typography variant="body1">{recipe.strInstructions}</Typography>
        </Container>
    );
}
