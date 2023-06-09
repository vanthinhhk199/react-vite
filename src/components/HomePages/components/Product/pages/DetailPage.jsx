import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, Paper } from "@mui/material";
import "./style.scss";
import ProductThumbnail from "../ProductDetals/ProductThumbnail";
import { useLocation, useMatch } from "react-router";
import { useProductDetail } from "./../hook/useProductDetail";
import ProductInfo from "./../ProductDetals/ProductInfo";
import AddToCartForm from "../ProductDetals/AddToCartForm";
import LinearProgress from "@mui/material/LinearProgress";
import { addToCart } from "../../Cart/CartSlice";
import { useDispatch } from "react-redux";
import ProductMenu from "./../ProductDetals/ProductMenu";
import DetailSkeleton from "./../components/DetailSkeleton";

DetailPage.propTypes = {};

function DetailPage(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const productId = location.pathname.split("/")[2];
  const { product, loading } = useProductDetail(productId);

  const handleAddToCartSubmit = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    dispatch(action);
  };

  if (loading) {
    return (
      <Box>
        <LinearProgress />
        <DetailSkeleton />
      </Box>
    );
  }

  return (
    <Box className="root">
      <Container className="container">
        <Paper elevation={0} className="framedescrip" spacing={2}>
          <Grid container>
            <Grid item className="left">
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className="right">
              <ProductInfo product={product} />
              <AddToCartForm
                product={product}
                onSubmit={handleAddToCartSubmit}
              />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
      </Container>
    </Box>
  );
}

export default DetailPage;
