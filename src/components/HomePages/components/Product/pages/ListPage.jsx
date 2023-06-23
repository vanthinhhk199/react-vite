import {
  Box,
  Button,
  ButtonBase,
  Container,
  Grid,
  LinearProgress,
  Pagination,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductList from "./../components/ProductList";
import ProductSort from "./../components/ProductSort";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";
import { Link, animateScroll as scroll } from "react-scroll";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SlideShow from "./../../SlideShow/index";
import { useDispatch } from "react-redux";
import categoryApi from "./../../../../../api/categoryApi";
import productApi from "./../../../../../api/productApi";

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
  const [cateId, setCateId] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams) {
      const searchKeyword = queryParams.get("search") || "";
      const priceMin = queryParams.get("priceMin") || "";
      const priceMax = queryParams.get("priceMax") || "";
      const cateId = queryParams.get("cateId") || "";

      setPriceMin(priceMin);
      setPriceMax(priceMax);
      setCateId(cateId);
      setPage(1);
      handleSearchChange(searchKeyword);
    }
  }, []);

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
    if (searchKeyword) {
      const queryParams = new URLSearchParams({ search: searchKeyword });
      navigate(`/?${queryParams.toString()}`);
    }
  };

  const handlePageChange = (even, newPage) => {
    setPage(newPage);

    // Update URL with page number
    const queryParams = new URLSearchParams({ page: newPage });
    navigate(`/?${queryParams.toString()}`);
  };

  const handleScrollToTop = () => {
    scroll.scrollToTop({
      duration: 500, // Thời gian trượt
      smooth: "easeInOutQuart", // Hiệu ứng trượt lên
    });
  };

  return (
    <Container id="top">
      <SlideShow />
      <Box className="root">
        <Paper elevation={0} className="container">
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
                  <ProductSkeletonList length={16} />
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
        <ArrowUpwardIcon
          className="scroll-to-top-container"
          onClick={handleScrollToTop}
        />
      </Box>
    </Container>
  );
}

export default ListPage;
