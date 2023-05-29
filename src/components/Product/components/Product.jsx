import PropTypes from "prop-types";
import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import {
  STATIC_HOST,
  THUMBNAIL_PLACEHOLDER,
} from "./../../../constants/common";
import { useNavigate } from "react-router";

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
    <Box padding={1} onClick={handleClick}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.price)}{" "}
        </Box>
        - 20%
      </Typography>
    </Box>
  );
}

export default Product;
