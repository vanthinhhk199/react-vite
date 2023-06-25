import { useEffect, useState } from "react";
import categoryApi from './../../../api/categoryApi';

export function useCategoryAll() {
    
    const [category, setCategory] = useState([]);

    useEffect(() => {
      (async () => {
        try {
          const response = await categoryApi.getAll();
          setCategory(response.category);
        } catch (error) {
          console.error("Error fetching category data:", error);
        }
      })();
    }, []);

    return { category };
}
