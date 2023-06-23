import { Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import * as Yup from "yup";
import categoryApi from "./../../../../../api/categoryApi";

AddCategoryPage.propTypes = {};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  slug: Yup.string().required("Slug is required"),
  image: Yup.mixed().required("Image is required"),
});

function AddCategoryPage(props) {
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategory({ ...category, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(category, { abortEarly: false });

      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("slug", category.slug);
      formData.append("image", category.image);

      const response = await categoryApi.addCate(formData);
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
      <h2>Add category</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Name"
          name="name"
          value={category.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={Boolean(errors?.name)}
          helperText={errors?.name}
        />
        <TextField
          label="Slug"
          name="slug"
          value={category.slug}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={Boolean(errors?.slug)}
          helperText={errors?.slug}
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

        <Button type="submit" variant="contained" color="primary">
          Add category
        </Button>
      </form>
    </Container>
  );
}

export default AddCategoryPage;
