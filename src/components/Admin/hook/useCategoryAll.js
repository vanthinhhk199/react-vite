import { useEffect, useState } from "react";
import categoryApi from './../../../api/categoryApi';

export function useCategoryAll() {
  const [category, setCategory] = useState([]);

  const reloadCategory = async () => {
    try {
      const response = await categoryApi.getAll();
      setCategory(response.category);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    reloadCategory();
  }, []);

  return { category, reloadCategory };
}

