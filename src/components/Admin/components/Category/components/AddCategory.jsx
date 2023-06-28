import { Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import * as Yup from "yup";
import categoryApi from "./../../../../../api/categoryApi";
import { enqueueSnackbar } from "notistack";
import BackupIcon from "@mui/icons-material/Backup";

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
      enqueueSnackbar(" Add Category successfully", {
        variant: "success",
        autoHideDuration: 2000,
      });
      setCategory({
        name: "",
        slug: "",
        image: null,
      });
      setImagePreview(null);
      setErrors({});
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

        <div style={{ backgroundColor: "#fff", padding: "25px" }}>
          <label
            htmlFor="inp-file"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "22px",
              borderStyle: "dashed",
              borderWidth: "2px",
              borderColor: "#dcdfe4",
              cursor: "pointer",
              padding: "15px",
            }}
          >
            <BackupIcon style={{ fontSize: "65px", color: "#6d96f3" }} />
            <span style={{ color: "#999" }}>
              Upload an image or drag and drop
            </span>
            <span style={{ color: "#999" }}>PNG, JPG</span>
          </label>
          <input
            id="inp-file"
            style={{ display: "none" }}
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "130px", marginTop: "10px" }}
            />
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
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Add category
        </Button>
      </form>
    </Container>
  );
}

export default AddCategoryPage;
