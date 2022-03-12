import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList } from "../redux/cartActions";
import Product from "../Product";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    paddingTop: "15px",
  },
});

const ProductList = () => {
  const classes = useStyles();
  const { products, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsList());
  }, []);
  return !loading ? (
    <>
      <Typography variant="h4">ProductList</Typography>
      <Container className={classes.root}>
        <Grid container xs={12} spacing={3}>
          {products?.map((product) => (
            <Product product={product} key={product?.id} />
          ))}
        </Grid>
      </Container>
    </>
  ) : (
    <Typography variant="h5">Fetching products...</Typography>
  );
};

export default ProductList;
