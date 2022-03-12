import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  InputLabel,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    paddingTop: "15px",
  },
  title: {
    height: "10px",
  },
  btn: {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    marginRight: "15px",
    marginLeft: "15px",
  },
  qty: {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    marginRight: "15px",
    marginLeft: "15px",
  },
});

const Product = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { image, price } = product;

  const [qty, setQty] = useState();
  return (
    <>
      <Grid item sm={3}>
        <Card>
          <CardActionArea>
            <CardMedia component="img" image={image} style={{ height: 300 }} />
            <CardActions>
              <InputLabel>Quantity</InputLabel>
              <TextField
                id="standard-basic"
                variant="standard"
                type="number"
                min="0"
                placeholder="Qty"
                onChange={(event) => {
                  if (event.target.value < 1) {
                    event.target.value = 1;
                  } else {
                    event.preventDefault();
                    setQty(event.target.value);
                  }
                }}
              />
              <Button
                className={classes.btn}
                size="small"
                variant="contained"
                onClick={() => {
                  let newProduct = {
                    qty: parseInt(qty ?? 1),
                    ...product,
                    type: "product",
                  };
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: newProduct,
                  });
                  console.log("Add a product to Cart", newProduct);
                }}
              >
                Add
              </Button>
              <Typography className={classes.title} variant="h7">
                Price {price}
              </Typography>
            </CardActions>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default Product;
