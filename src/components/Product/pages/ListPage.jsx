import { Box, Container, Grid, Pagination, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import categoryApi from "../../../api/categoryApi";
import ProductSkeletonList from "../components/ProductSkeletonList";
import productApi from "./../../../api/productApi";
import ProductList from "./../components/ProductList";
import ProductSort from "./../components/ProductSort";
import "./style.scss";

ListPage.propTypes = {};

function ListPage(props) {
  const [productList, setProductList] = useState([]);
  const [loading, setloading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [cate, setCate] = useState([]);
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [cateId, setCateId] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    (async () => {
      try {
        const allData = await productApi.getAll(
          page,
          priceMin,
          priceMax,
          cateId,
          search
        );
        const newData = allData.data;
        const last_page = allData.last_page;
        const allCate = await categoryApi.getAll();
        const categories = allCate.category;
        setProductList(newData);
        setCate(categories);
        setTotalPage(last_page);
      } catch (error) {
        console.log("Failed to fetch product list", error);
      }
      setloading(false);
    })();
  }, [page, priceMin, priceMax, cateId, search]);

  const handleFilterChange = (filterValues) => {
    try {
      const priceMin = filterValues.priceRange[0];
      const priceMax = filterValues.priceRange[1];
      const cate = filterValues.selecCategory;
      setPriceMin(priceMin);
      setPriceMax(priceMax);
      setCateId(cate);
      setSearch(undefined);
    } catch (error) {
      console.log("Failed to fetch filtered product list: ", error);
    }
  };

  const handleSearchChange = (filterValues) => {
    const search = filterValues.search;
    setSearch(search);
  };

  const handlePageChange = (even, newPage) => {
    setPage(newPage);
  };

  return (
    <Box className="root">
      <Paper elevation={0} className="container">
        <Grid container className="framedescrip" spacing={2}>
          <Grid item className="left">
            <ProductSort
              category={cate}
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
            />
          </Grid>
          <Grid item className="right">
            <Paper elevation={0}>
              {loading ? (
                <ProductSkeletonList length={8} />
              ) : (
                <ProductList data={productList} />
              )}
              <Box className="pagination">
                <Pagination
                  color="primary"
                  count={totalPage}
                  page={page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ListPage;
