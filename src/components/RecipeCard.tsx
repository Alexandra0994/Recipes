import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

type Recipe = {
    strMealThumb: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    idMeal: string;
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
    const router = useRouter();

    return (
        <Card>
            <CardMedia component="img" height="140" image={recipe.strMealThumb} alt={recipe.strMeal} />
            <CardContent>
                <Typography variant="h6">{recipe.strMeal}</Typography>
                <Typography variant="body2">{recipe.strCategory} - {recipe.strArea}</Typography>
                <Button variant="contained" onClick={() => router.push(`/recipe/${recipe.idMeal}`)}>
                    View Recipe
                </Button>
            </CardContent>
        </Card>
    );
}
