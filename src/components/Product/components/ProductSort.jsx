import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "./style.scss";

ProductSort.propTypes = { category: PropTypes.array };

function formatCurrency(value) {
  const formattedValue = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

  return formattedValue;
}

function valuetext(value) {
  return formatCurrency(value);
}

function ProductSort({ category, onFilterChange, onSearchChange }) {
  const handleSortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };

  const [filterValues, setFilterValues] = useState({
    selecCategory: [],
    priceRange: [0, 4000000000],
    search: [],
  });

  const handleFilterClick = () => {
    onFilterChange(filterValues);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked, value } = event.target;
    if (checked) {
      setFilterValues((prevValues) => ({
        ...prevValues,
        [name]: [parseInt(value)],
      }));
    } else {
      setFilterValues((prevValues) => ({
        ...prevValues,
        [name]: [],
      }));
    }
  };

  const handleSliderChange = (event, newValue) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      priceRange: newValue,
    }));
  };

  const handleSearchChange = (event) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      search: event.target.value,
    }));
  };
  const handleSearchClick = () => {
    onSearchChange(filterValues);
  };

  return (
    <>
      <Box>
        <TextField
          className="filter-prod_search"
          label="Search"
          value={filterValues.search}
          onChange={handleSearchChange}
        />
        <Button
          className="filter-prod_btn"
          variant="outlined"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Box>
      <Paper elevation={3} className="filter-prod">
        <Typography className="filter-prod_title">Categories</Typography>
        <FormGroup>
          {category.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  name="selecCategory"
                  value={category.id}
                  checked={filterValues.selecCategory.includes(category.id)}
                  onChange={handleCheckboxChange}
                />
              }
              label={category.name}
            />
          ))}
        </FormGroup>
        <h3>Price</h3>
        <br />
        <Slider
          value={filterValues.priceRange}
          onChange={handleSliderChange}
          getAriaValueText={valuetext}
          valueLabelDisplay="on"
          step={100}
          marks
          min={0}
          max={10000}
        />
        <Button
          className="filter-prod_btn"
          variant="outlined"
          onClick={handleFilterClick}
        >
          Filter
        </Button>
      </Paper>
    </>
  );
}

export default ProductSort;
