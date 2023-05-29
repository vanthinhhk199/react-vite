import React from "react";
import PropTypes from "prop-types";
import { NavLink, useMatch } from "react-router-dom";
import { Box, Link } from "@mui/material";

ProductMenu.propTypes = {};

function ProductMenu(props) {
  const match = useMatch("/product/:id");
  const { id } = match?.params;

  return (
    <Box component="ul" className="root-menu">
      <li>
        <Link component={NavLink} to={`/product/${id}`}>
          Description
        </Link>
      </li>

      <li>
        <Link component={NavLink} to={`/product/${id}/additional`}>
          Additional Information
        </Link>
      </li>

      <li>
        <Link component={NavLink} to={`/product/${id}/reviews`}>
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
