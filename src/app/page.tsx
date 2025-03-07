"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchRecipes, fetchCategories } from "../utils/api";
import RecipeCard from "@/components/RecipeCard";
import { Grid, Container, Typography, Select, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import Pagination from "@/components/Pagination";

type Recipe = {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [inputValue, setInputValue] = useState(searchParams.get("search") || "");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const itemsPerPage = 2;

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 2000);
    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data: allRecipes, isLoading } = useQuery({
    queryKey: ["recipes", searchQuery],
    queryFn: () => fetchRecipes(searchQuery),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const filteredRecipes =
    category === "All"
      ? allRecipes || []
      : allRecipes?.filter((recipe: Recipe) => recipe.strCategory === category) || [];

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage) || 1;

  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    params.set("page", currentPage.toString());
    params.set("category", category);
    router.replace(`/?${params.toString()}`, { scroll: false });
  }, [searchQuery, currentPage, category, router]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Recipes
      </Typography>
      <TextField
        label="Search recipes"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />
      <Select value={category} onChange={handleCategoryChange} sx={{ marginBottom: 2 }}>
        <MenuItem value="All">All Categories</MenuItem>
        {categories?.map((cat: { strCategory: string }) => (
          <MenuItem key={cat.strCategory} value={cat.strCategory}>
            {cat.strCategory}
          </MenuItem>
        ))}
      </Select>

      {paginatedRecipes.length > 0 ? (
        <Grid container spacing={2}>
          {paginatedRecipes.map((recipe: Recipe) => (
            <Grid item key={recipe.idMeal} xs={12} sm={6} md={6}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" color="textSecondary" sx={{ textAlign: "center", marginTop: 2 }}>
          not found any recipes
        </Typography>
      )}

      {totalPages > 1 && paginatedRecipes.length > 0 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      )}
    </Container>
  );
}
