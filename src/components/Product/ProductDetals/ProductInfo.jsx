import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { formatPrice } from "./../../../utils/common";
import "./style.scss";

ProductInfo.propTypes = {
  product: PropTypes.object,
};

function ProductInfo({ product }) {
  const { name, description, price } = product;
  return (
    <Box className="root-info">
      <Typography className="name-info" component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" className="description-info">
        {description}
      </Typography>
      <Box className="priceBox-info">
        Price:
        <Box component="span" className="salePrice-info">
          {formatPrice(price)}
        </Box>
        {/* {promotionPercent > 0 && ( //phần trăm khuyến mãi
          <>
            <Box component="span" className="originalPrice">
              {formatPrice(originalPrice)}
            </Box>

            <Box component="span">{`-${promotionPercent}%`}</Box>
          </>
        )} */}
      </Box>
      <Typography variant="body2" className="description-info">
        Sản phẩm còn: {product.qty}
      </Typography>
    </Box>
  );
}

export default ProductInfo;
