import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disable: PropTypes.bool,
  required: PropTypes.bool,
  pattern: PropTypes.object,
};

function InputField(props) {
  const { form, name, label, disable, required, pattern } = props;

  return (
    <Controller
      name={name}
      control={form.control}
      rules={{ required, pattern }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          variant="outlined"
          margin="normal"
          autoFocus
          fullWidth
          label={label}
          disabled={disable}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}

export default InputField;
