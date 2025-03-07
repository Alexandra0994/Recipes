"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "@/utils/api";
import { useParams } from "next/navigation";
import {
    Container,
    Typography,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Button,
} from "@mui/material";
import Image from "next/image";
interface Params {
    id?: string;
}

function RecipeContent() {
    const params = useParams() as Params;
    const id = params?.id;

    const { data: fetchedRecipe, isLoading } = useQuery({
        queryKey: ["recipe", id],
        queryFn: () => fetchRecipeById(id as string),
        enabled: !!id,
    });

    if (!id) return <Typography variant="h6">Recipe not found</Typography>;
    if (isLoading) return <CircularProgress />;
    if (!fetchedRecipe) return <Typography variant="h6">Recipe not found</Typography>;

    const ingredients = Object.entries(fetchedRecipe)
        .filter(([key, value]) => key.startsWith("strIngredient") && value)
        .map(([, value]) => value);

    const measures = Object.entries(fetchedRecipe)
        .filter(([key, value]) => key.startsWith("strMeasure") && value)
        .map(([, value]) => value);

    return (
        <Container>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                {fetchedRecipe.strMeal}
            </Typography>

            <Image
                src={fetchedRecipe.strMealThumb}
                alt={fetchedRecipe.strMeal}
                width={400}
                height={400}
                priority
                style={{ borderRadius: "8px", marginBottom: "16px" }}
            />

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Category: {fetchedRecipe.strCategory}
            </Typography>

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Origin: {fetchedRecipe.strArea}
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {fetchedRecipe.strInstructions}
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
                sx={{ marginTop: 2 }}
            >
                Add to Cart
            </Button>
        </Container>
    );
}

export default RecipeContent;
