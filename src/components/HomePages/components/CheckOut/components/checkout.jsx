import { Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckoutListProd from "./checkoutListProd";
import CheckoutAddress from "./checkoutAddress";

CheckOut.propTypes = {};

function CheckOut(props) {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceUSD, setTotalPriceUSD] = useState(0);
  //lấy id prod dựa vào url ở cart
  const searchParams = new URLSearchParams(location.search);
  const data = searchParams.get("data");
  const selectedItems = JSON.parse(decodeURIComponent(data));

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    setProducts(selectedProducts);

    const totalPrice = selectedProducts.reduce(
      (accumulator, item) => accumulator + item.product?.price * item.quantity,
      0
    );
    const totalPriceUsd = (totalPrice / 23000).toFixed();

    setTotalPrice(totalPrice);
    setTotalPriceUSD(totalPriceUsd);
  }, []);

  return (
    <Container>
      <Paper elevation={3} className="container">
        <Grid className="paper-info" container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={8}>
            <CheckoutAddress />
          </Grid>
          <Grid item xs={4}>
            <CheckoutListProd
              data={products}
              total_price={totalPrice}
              totalPriceUSD={totalPriceUSD}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default CheckOut;
