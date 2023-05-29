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
  const [lastPage, setLastPage] = useState();
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [cate, setCate] = useState([]);
  const [manufacturersSort, setManufacturersSort] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const allData = await productApi.getProd();
        const newData = allData.product.data;
        const last_page = allData.product.last_page;
        // console.log(allData);
        const allCate = await categoryApi.getAll();
        const categories = allCate.category.map((category) => category.name);
        setProductList(newData);
        setCate(categories);
        setTotalPage(last_page);
        // setManufacturersSort(manufacturers);
      } catch (error) {
        console.log("Failed to fetch product list", error);
      }
      setloading(false);
    })();
  }, []);

  const handlePageChange = async (event, newPage) => {
    setPage(newPage);
    try {
      const data = await productApi.getAll(newPage);
      const newDataPagi = data.product.data;
      console.log(data);
      setProductList(newDataPagi);
    } catch (error) {
      console.log("Failed to fetch product list: ", error);
    }
  };

  const handleFilterChange = async (filterValues) => {
    try {
      console.log(filterValues);
      const dataAll = await productApi.filter(filterValues);
      const newAllData = dataAll.data;
      const last_page = dataAll.last_page;
      setProductList(newAllData);
      setTotalPage(last_page);
      console.log(dataAll);
    } catch (error) {
      console.log("Failed to fetch filtered product list: ", error);
    }
  };

  return (
    <Box className="root">
      <Container className="container">
        <Grid container className="framedescrip" spacing={2}>
          <Grid item className="left">
            <ProductSort
              category={cate}
              manufacturers={manufacturersSort}
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
      </Container>
    </Box>
  );
}

export default ListPage;
