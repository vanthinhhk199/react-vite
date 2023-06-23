import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as Yup from "yup";
import productApi from "./../../../../../api/productApi";

AddProductPage.propTypes = {
  category: PropTypes.array.isRequired,
};

const validationSchema = Yup.object().shape({
  cate_id: Yup.string().required("Category is required").nullable(),
  name: Yup.string().required("Name is required"),
  slug: Yup.string().required("Slug is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  image: Yup.mixed().required("Image is required"),
  qty: Yup.number()
    .required("Quantity is required")
    .integer("Quantity must be an integer")
    .positive("Quantity must be positive"),
});

function AddProductPage({ category }) {
  const [product, setProduct] = useState({
    cate_id: "",
    name: "",
    slug: "",
    description: "",
    price: "",
    image: null,
    qty: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(product, { abortEarly: false });

      const formData = new FormData();
      formData.append("image", product.image);
      formData.append("cate_id", product.cate_id);
      formData.append("name", product.name);
      formData.append("slug", product.slug);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("qty", product.qty);

      const response = await productApi.addProd(formData);
      console.log(response);
    } catch (validationErrors) {
      const errorsMap = validationErrors.inner.reduce(
        (acc, curr) => ({ ...acc, [curr.path]: curr.message }),
        {}
      );
      setErrors(errorsMap);
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <FormControl fullWidth>
          <InputLabel id="select-category">Category</InputLabel>
          <Select
            labelId="select-category"
            label="Category"
            name="cate_id"
            value={product.cate_id}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={Boolean(errors?.cate_id)}
          >
            <MenuItem value="">Select a category</MenuItem>
            {category.map((categoryItem) => (
              <MenuItem key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.name}
              </MenuItem>
            ))}
          </Select>
          {errors?.cate_id && (
            <p
              style={{
                color: "#d32f2f",
                margin: "5px 12px",
                display: "flex",
                fontSize: "12px",
              }}
            >
              {errors.cate_id}
            </p>
          )}
        </FormControl>
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={Boolean(errors?.name)}
          helperText={errors?.name}
        />
        <TextField
          label="Slug"
          name="slug"
          value={product.slug}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={Boolean(errors?.slug)}
          helperText={errors?.slug}
        />
        <TextField
          label="Description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          error={Boolean(errors?.description)}
          helperText={errors?.description}
        />
        <TextField
          label="Price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={Boolean(errors?.price)}
          helperText={errors?.price}
        />
        <input type="file" name="image" onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" style={{ width: "200px" }} />
        )}
        {errors?.image && (
          <p
            style={{
              color: "#d32f2f",
              margin: "5px 12px",
              fontSize: "12px",
            }}
          >
            {errors.image}
          </p>
        )}
        <TextField
          label="Quantity"
          name="qty"
          value={product.qty}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={Boolean(errors?.qty)}
          helperText={errors?.qty}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </form>
    </Container>
  );
}

export default AddProductPage;
