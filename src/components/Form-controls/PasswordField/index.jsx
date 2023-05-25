import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import PropTypes from "prop-types";
import { useState } from "react";
import { Controller } from "react-hook-form";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disable: PropTypes.bool,
  required: PropTypes.bool,
  pattern: PropTypes.object,
};

function PasswordField(props) {
  const { form, name, label, disable, required, pattern } = props;

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        rules={{ required, pattern }}
        render={({ field, fieldState }) => (
          <FormControl fullWidth variant="standard">
            <TextField
              id={name}
              type={showPassword ? "text" : "password"}
              {...field}
              variant="outlined"
              margin="normal"
              autoFocus
              fullWidth
              label={label}
              disabled={disable}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        )}
      />
    </div>
  );
}

export default PasswordField;
