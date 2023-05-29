import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField, IconButton, InputAdornment, Box } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

QuantityField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  form: PropTypes.object.isRequired,
};

function QuantityField({ name, label, form }) {
  const { control, formState } = form;
  const { errors } = formState;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Box>
          <IconButton
            style={{ marginTop: "20px" }}
            onClick={() => {
              if (value > 1) {
                onChange(value - 1);
              }
            }}
            size="small"
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <TextField
            id={name}
            size="small"
            label={label}
            type="number"
            error={!!errors[name]}
            helperText={errors[name]?.message}
            margin="normal"
            variant="outlined"
            value={value}
            onChange={onChange}
            style={{ width: "150px" }}
          />
          <IconButton
            style={{ marginTop: "20px" }}
            onClick={() => onChange(value + 1)}
            size="small"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
      )}
    />
  );
}

export default QuantityField;
