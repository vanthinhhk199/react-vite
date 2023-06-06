import PropTypes from "prop-types";
import React from "react";
import { Box, Paper, Skeleton, Typography } from "@mui/material";
import {
  STATIC_HOST,
  THUMBNAIL_PLACEHOLDER,
} from "./../../../constants/common";
import { useNavigate } from "react-router";
import { formatPrice } from "./../../../utils/common";

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const navigate = useNavigate();
  const thumbnailUrl = product.image
    ? `${STATIC_HOST}${product.image}`
    : THUMBNAIL_PLACEHOLDER;

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <Paper
        elevation={3}
        className="page-prod"
        style={{ margin: "10px" }}
        onClick={handleClick}
      >
        <Box className="page-prod_image" padding={1}>
          <img src={thumbnailUrl} alt={product.name} width="100%" />
        </Box>
        <Typography className="page-prod_item" variant="body2">
          {product.name}
        </Typography>
        <Typography className="page-prod_item page-prod_price" variant="body2">
          <Box component="span" fontSize="16px" fontWeight="bold">
            {formatPrice(product.price)}
          </Box>
          - 20%
        </Typography>
      </Paper>
    </>
  );
}

export default Product;
