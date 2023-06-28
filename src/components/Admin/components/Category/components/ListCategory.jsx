import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useCategoryAll } from "../../../hook/useCategoryAll";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import format from "date-fns/format";
import { STATIC_HOST_CATE } from "../../../../../constants/common";
import { enqueueSnackbar } from "notistack";
import * as Yup from "yup";
import { STATIC_HOST } from "./../../../../../constants/common";
import categoryApi from "./../../../../../api/categoryApi";

ListCategory.propTypes = {};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  slug: Yup.string().required("Slug is required"),
  image: Yup.mixed().required("Image is required"),
});

function ListCategory(props) {
  const { category, reloadCategory } = useCategoryAll();
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const newSelectedCategory = { ...selectedCategory, image: file };
    setSelectedCategory(newSelectedCategory);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleEditClick = (cate) => {
    setSelectedCategory(cate);
    setEditCategoryDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCategory(null);
    setEditCategoryDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await categoryApi.deleteCate(id);
      enqueueSnackbar("Category Delete successfully", {
        variant: "success",
        autoHideDuration: 2000,
      });
      reloadCategory();
    } catch (error) {
      console.log(error);
      setErrors(errorsMap);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await validationSchema.validate(selectedCategory, { abortEarly: false });

    const formData = new FormData();
    formData.append("image", selectedCategory.image);
    formData.append("name", selectedCategory.name);
    formData.append("slug", selectedCategory.slug);

    const id = selectedCategory.id;
    const response = await categoryApi.updateCate(formData, id);
    handleCloseDialog();
    enqueueSnackbar("Category updated successfully", {
      variant: "success",
      autoHideDuration: 2000,
    });
    reloadCategory();
  };
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>image</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category.map((cate, index) => (
            <TableRow key={index}>
              <TableCell>{cate.name}</TableCell>
              <TableCell>{cate.slug}</TableCell>
              <TableCell>
                <img
                  src={`${STATIC_HOST_CATE}${cate.image}`}
                  alt={cate.image}
                  style={{ width: "80px" }}
                />
              </TableCell>
              <TableCell>{formatDateTime(cate.created_at)}</TableCell>

              <TableCell>
                <EditIcon
                  onClick={() => handleEditClick(cate)}
                  style={{ color: "blue", cursor: "pointer" }}
                />
                <DeleteOutlineIcon
                  onClick={() => handleDeleteClick(cate.id)}
                  style={{ color: "red", cursor: "pointer" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        disableEscapeKeyDown
        open={editCategoryDialogOpen}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialog();
          }
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Product</DialogTitle>
        {selectedCategory && (
          <DialogContent style={{ padding: "30px" }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <TextField
                label="Name"
                name="name"
                value={selectedCategory.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={Boolean(errors?.name)}
                helperText={errors?.name}
              />
              <TextField
                label="Slug"
                name="slug"
                value={selectedCategory.slug}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={Boolean(errors?.slug)}
                helperText={errors?.slug}
              />
              <input type="file" name="image" onChange={handleImageChange} />
              {selectedCategory.image || imagePreview ? (
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : `${STATIC_HOST_CATE}${selectedCategory.image}`
                  }
                  alt="Preview"
                  style={{ width: "200px" }}
                />
              ) : (
                <img
                  src={`${STATIC_HOST}${selectedCategory.image}`}
                  alt="Preview"
                  style={{ width: "200px" }}
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
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          </DialogContent>
        )}
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

export default ListCategory;
