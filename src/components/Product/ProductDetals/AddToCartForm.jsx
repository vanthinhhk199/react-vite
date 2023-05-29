import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@mui/material";
import InputField from "./../../Form-controls/InputField/index";
import QuantityField from "./../../Form-controls/QuantityField/index";

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .typeError("Số lượng phải là một số")
      .integer("Số lượng phải là số nguyên")
      .min(1, "Số lượng nhỏ nhất là 1")
      .required("Vui lòng chọn số lượng"),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form
      style={{ float: "left", marginLeft: "20px" }}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <QuantityField name="quantity" label="Quantity" form={form} />
      <Button
        type="submit"
        className="submit"
        variant="contained"
        color="primary"
        style={{ width: "150px" }}
        size="large"
      >
        Add To Cart
      </Button>
    </form>
  );
}

export default AddToCartForm;
