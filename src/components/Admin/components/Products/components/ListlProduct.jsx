import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useProductAll } from "./../../../hook/useProductAll";
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
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./style.scss";
import format from "date-fns/format";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { STATIC_HOST } from "./../../../../../constants/common";
import productApi from "./../../../../../api/productApi";
import * as Yup from "yup";
import categoryApi from "./../../../../../api/categoryApi";
import { enqueueSnackbar } from "notistack";

ListProduct.propTypes = {};

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

function ListProduct(props) {
  const { product, reloadProducts } = useProductAll();
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };
  const [editProductDialogOpen, setEditProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        setCategory(response.category);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    })();
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditProductDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setEditProductDialogOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const newSelectedProduct = { ...selectedProduct, image: file };
    setSelectedProduct(newSelectedProduct);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(selectedProduct, { abortEarly: false });

      const formData = new FormData();
      formData.append("image", selectedProduct.image);
      formData.append("cate_id", selectedProduct.cate_id);
      formData.append("name", selectedProduct.name);
      formData.append("slug", selectedProduct.slug);
      formData.append("description", selectedProduct.description);
      formData.append("price", selectedProduct.price);
      formData.append("qty", selectedProduct.qty);

      const id = selectedProduct.id;
      const response = await productApi.updateProd(formData, id);
      handleCloseDialog();
      enqueueSnackbar("Product updated successfully", {
        variant: "success",
        autoHideDuration: 2000,
      });
      reloadProducts();
    } catch (error) {
      console.log(error);
      setErrors(errorsMap);
    }
  };

  const handleDeleteClick = async (id) => {
    const response = await productApi.deleteProd(id);
    enqueueSnackbar("Product Delete successfully", {
      variant: "success",
      autoHideDuration: 2000,
    });
    reloadProducts();
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell>image</TableCell>
            {/* <TableCell>slug</TableCell> */}
            <TableCell>description</TableCell>
            <TableCell>price</TableCell>
            <TableCell>qty</TableCell>
            {/* <TableCell>created_at</TableCell> */}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((prod, index) => (
            <TableRow key={index}>
              <TableCell>{prod.name}</TableCell>
              <TableCell>
                <img
                  src={`${STATIC_HOST}${prod.image}`}
                  alt={prod.image}
                  style={{ width: "80px" }}
                />
              </TableCell>
              {/* <TableCell>{prod.slug}</TableCell> */}
              <TableCell>
                <p className="description-cell">{prod.description}</p>
              </TableCell>
              <TableCell>{prod.price}</TableCell>
              <TableCell>{prod.qty}</TableCell>
              {/* <TableCell>{formatDateTime(prod.created_at)}</TableCell> */}
              <TableCell>
                <EditIcon
                  onClick={() => handleEditClick(prod)}
                  style={{ color: "blue", cursor: "pointer" }}
                />
                <DeleteOutlineIcon
                  onClick={() => handleDeleteClick(prod.id)}
                  style={{ color: "red", cursor: "pointer" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        disableEscapeKeyDown
        open={editProductDialogOpen}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialog();
          }
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Product</DialogTitle>
        {selectedProduct && (
          <DialogContent style={{ padding: "30px" }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <FormControl fullWidth>
                <InputLabel id="select-category">Category</InputLabel>
                <Select
                  style={{ textAlign: "start" }}
                  labelId="select-category"
                  label="Category"
                  name="cate_id"
                  value={selectedProduct.cate_id}
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
                value={selectedProduct.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={Boolean(errors?.name)}
                helperText={errors?.name}
              />
              <TextField
                label="Slug"
                name="slug"
                value={selectedProduct.slug}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={Boolean(errors?.slug)}
                helperText={errors?.slug}
              />
              <TextField
                label="Description"
                name="description"
                value={selectedProduct.description}
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
                value={selectedProduct.price}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={Boolean(errors?.price)}
                helperText={errors?.price}
              />
              <input type="file" name="image" onChange={handleImageChange} />
              {selectedProduct.image || imagePreview ? (
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : `${STATIC_HOST}${selectedProduct.image}`
                  }
                  alt="Preview"
                  style={{ width: "200px" }}
                />
              ) : (
                <img
                  src={`${STATIC_HOST}${selectedProduct.image}`}
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
              <TextField
                label="Quantity"
                name="qty"
                value={selectedProduct.qty}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={Boolean(errors?.qty)}
                helperText={errors?.qty}
              />

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

export default ListProduct;
