"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "@/utils/api";
import { Recipe } from "@/types/recipe";
import { useParams } from "next/navigation";
import { Container, Typography, CircularProgress, List, ListItem, ListItemText, Button } from "@mui/material";
import Image from "next/image";

interface RecipeContentProps {
    onAddToCart: (recipe: Recipe) => void;
}

function RecipeContent({ onAddToCart }: RecipeContentProps) {
    const params = useParams();
    const id = params?.id as string | undefined;
    const { data: recipe, isLoading } = useQuery({
        queryKey: ["recipe", id],
        queryFn: () => fetchRecipeById(id as string),
        enabled: !!id,
    });

    if (!id) return <Typography variant="h6">Recipe not found</Typography>;
    if (isLoading) return <CircularProgress />;
    if (!recipe) return <Typography variant="h6">Recipe not found</Typography>;

    const ingredients = Object.entries(recipe)
        .filter(([key, value]) => key.startsWith("strIngredient") && value)
        .map(([_, value]) => value);

    const measures = Object.entries(recipe)
        .filter(([key, value]) => key.startsWith("strMeasure") && value)
        .map(([_, value]) => value);

    return (
        <Container>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                {recipe.strMeal}
            </Typography>

            <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                width={400}
                height={400}
                priority
                style={{ borderRadius: "8px", marginBottom: "16px" }}
            />

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Category: {recipe.strCategory}
            </Typography>

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Origin: {recipe.strArea}
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {recipe.strInstructions}
            </Typography>

            {ingredients.length > 0 && (
                <>
                    <Typography variant="h6">Ingredients:</Typography>
                    <List>
                        {ingredients.map((ingredient, index) => (
                            <ListItem key={index} divider>
                                <ListItemText
                                    primary={`${ingredient} - ${measures[index] || ""}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}

            <Button
                variant="contained"
                color="primary"
                onClick={() => onAddToCart(recipe)}
                sx={{ marginTop: 2 }}
            >
                Add to Cart
            </Button>
        </Container>
    );
}

export default RecipeContent;
