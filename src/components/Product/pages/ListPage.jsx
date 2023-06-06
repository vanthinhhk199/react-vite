import { Box, Container, Grid, Pagination, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import categoryApi from "../../../api/categoryApi";
import ProductSkeletonList from "../components/ProductSkeletonList";
import productApi from "./../../../api/productApi";
import ProductList from "./../components/ProductList";
import ProductSort from "./../components/ProductSort";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";
import { Carousel } from "3d-react-carousal";

ListPage.propTypes = {};

function ListPage({ searchKeyword }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [productList, setProductList] = useState([]);
  const [loading, setloading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [cate, setCate] = useState([]);
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [cateId, setCateId] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    (async () => {
      try {
        const allData = await productApi.getAll(
          page,
          priceMin,
          priceMax,
          cateId,
          search
        );
        const newData = allData.data;
        const last_page = allData.last_page;
        const allCate = await categoryApi.getAll();
        const categories = allCate.category;
        setProductList(newData);
        setCate(categories);
        setTotalPage(last_page);
      } catch (error) {
        console.log("Failed to fetch product list", error);
      }
      setloading(false);
    })();
  }, [page, priceMin, priceMax, cateId, search]);

  useEffect(() => {
    setPriceMin(undefined);
    setPriceMax(undefined);
    setCateId(undefined);
    handleSearchChange(searchKeyword);
  }, [searchKeyword]);

  const handleFilterChange = (filterValues) => {
    try {
      const priceMin = filterValues.priceRange[0];
      const priceMax = filterValues.priceRange[1];
      const cate = filterValues.selecCategory;
      setPriceMin(priceMin);
      setPriceMax(priceMax);
      setCateId(cate);
      setPage(1);
      setSearch(undefined);

      // Update URL with filter values
      const queryParams = new URLSearchParams({
        priceMin: priceMin,
        priceMax: priceMax,
        cateId: cate,
      });
      navigate(`/?${queryParams.toString()}`);
    } catch (error) {
      console.log("Failed to fetch filtered product product: ", error);
    }
  };

  const handleSearchChange = (searchKeyword) => {
    setSearch(searchKeyword);
    setPage(1);

    // Update URL with search value
    const queryParams = new URLSearchParams({ search: searchKeyword });
    navigate(`/?${queryParams.toString()}`);
  };

  const handlePageChange = (even, newPage) => {
    setPage(newPage);

    // Update URL with page number
    const queryParams = new URLSearchParams({ page: newPage });
    navigate(`/?${queryParams.toString()}`);
  };

  let slides = [
    <img src="https://picsum.photos/800/300/?random" alt="1" />,
    <img src="https://picsum.photos/800/301/?random" alt="2" />,
    <img src="https://picsum.photos/800/302/?random" alt="3" />,
    <img src="https://picsum.photos/800/303/?random" alt="4" />,
    <img src="https://picsum.photos/800/304/?random" alt="5" />,
  ];

  return (
    <Container>
      <Box className="root">
        <Paper elevation={0} className="container">
          {/* <div style={{ paddingTop: "30px" }}>
            <Carousel slides={slides} autoplay={true} interval={4000} />
          </div> */}
          <Grid container className="framedescrip" spacing={2}>
            <Grid item className="left">
              <ProductSort
                category={cate}
                onFilterChange={handleFilterChange}
              />
            </Grid>
            <Grid item className="right">
              <Paper elevation={0}>
                {loading ? (
                  <ProductSkeletonList length={8} />
                ) : (
                  <ProductList data={productList} />
                )}
                <Box className="pagination">
                  <Pagination
                    color="primary"
                    count={totalPage}
                    page={page}
                    onChange={handlePageChange}
                  ></Pagination>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default ListPage;
