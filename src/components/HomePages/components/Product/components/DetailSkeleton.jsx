import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, Skeleton } from "@mui/material";

DetailSkeleton.propTypes = {};

function DetailSkeleton(props) {
  return (
    <Box>
      <Container style={{ display: "flex" }}>
        <Box sx={{ width: "30%" }}>
          <Skeleton height="500px" />
        </Box>

        <Box sx={{ width: "70%", padding: "95px 0 0 10px" }}>
          <Skeleton width="70%" height="80px" />
          <Skeleton width="70%" height="200px" />
          <Skeleton width="20%" height="80px" />
          <Skeleton width="40%" height="80px" />
        </Box>
      </Container>
      <Container>
        <Skeleton height="200px" />
      </Container>
    </Box>
  );
}

export default DetailSkeleton;
