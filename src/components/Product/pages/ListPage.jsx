import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import "./style.scss";
import productApi from "./../../../api/productApi";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductList from "./../components/ProductList";

ListPage.propTypes = {};

function ListPage(props) {
  const [productList, setProductList] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const data = await productApi.getAll({ _page: 1 });
        // resData = response.product.data;
        console.log(data);
        // setProductList(data);
      } catch (error) {
        console.log("Failed to fetch product list");
      }
      setloading(false);
    })();
  }, []);

  return (
    <Box className="root">
      <Container className="container">
        <Grid container className="framedescrip" spacing={2}>
          <Grid item className="left">
            <Paper elevation={0}>left</Paper>
          </Grid>
          <Grid item className="right">
            <Paper elevation={0}>
              {loading ? (
                <ProductSkeletonList />
              ) : (
                <ProductList data={productList} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
