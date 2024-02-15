import React, { useEffect, useState } from 'react';
import {Grid} from "@mui/material";
import ShopProductCard from "./ProductCard";

function CategoriesComponent() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
      <Grid container spacing={3} >
        {categories.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={3}>
              <ShopProductCard product={product} />
            </Grid>
        ))}
      </Grid>
  );
}

export default CategoriesComponent;

