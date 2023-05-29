import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Slider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

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

function ProductSort({ category, onFilterChange }) {
  const handleSortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };

  const [filterValues, setFilterValues] = useState({
    selectedCategories: [],
    selectedManufacturers: [],
    priceRange: [0, 4000000000],
  });

  const handleFilterClick = () => {
    onFilterChange(filterValues);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: checked
        ? [...prevValues[name], event.target.value]
        : prevValues[name].filter((value) => value !== event.target.value),
    }));
  };

  const handleSliderChange = (event, newValue) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      priceRange: newValue,
    }));
  };
  return (
    <Paper elevation={0}>
      <Typography>Categories</Typography>
      <FormGroup>
        {category.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                name="selectedCategories"
                value={category}
                checked={filterValues.selectedCategories.includes(category)}
                onChange={handleCheckboxChange}
              />
            }
            label={category}
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
      <Button variant="outlined" onClick={handleFilterClick}>
        Filter
      </Button>
    </Paper>
  );
}

export default ProductSort;
