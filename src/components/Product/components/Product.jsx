import PropTypes from "prop-types";
import React from "react";
import { Box, Typography } from "@mui/material";

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  return (
    <Box padding={1}>
      {/* <Box padding={1} onClick={handleClick}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box> */}

      <Typography variant="body2">{data.product.data.name}</Typography>
      {/* <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ""}
      </Typography> */}
    </Box>
  );
}

export default Product;
