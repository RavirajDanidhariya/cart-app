import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  table: {
    width: "90%",
    margin: "50px 0 0 50px",
  },
  thead: {
    "& > *": {
      fontSize: 20,
      background: "#000000",
      color: "#FFFFFF",
    },
  },
  row: {
    "& > *": {
      fontSize: 18,
    },
  },
  btn: {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    marginRight: "15px",
    marginLeft: "15px",
  },
});

const CartItems = () => {
  const { cartItems, totalItems } = useSelector((state) => state.cart);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [totalSum, setTotalSum] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const cartTotal = (cartItems) => {
    let grandTotal = cartItems.reduce((acc, curr) => {
      let cur = curr.price * curr.qty;
      return acc + cur;
    }, 0);
    setTotalSum(grandTotal);
  };

  const afterDiscountTotal = (cartItems) => {
    let grandTotal = cartItems.reduce((acc, curr) => {
      let cur = priceWithDiscount(curr.qty, curr.price);
      console.log("curr", curr);
      return acc + cur;
    }, 0);
    setFinalAmount(grandTotal);
  };

  const calculateDiscount = (quantity, price) => {
    if (quantity >= 5 && quantity < 10) {
      return 5;
    } else if (quantity >= 10 && quantity < 100) {
      return 10;
    } else if (quantity >= 100) {
      return 20;
    } else {
      return 0;
    }
  };

  const priceWithDiscount = (quantity, price) => {
    let originalAmount = quantity * price;
    if (quantity >= 5 && quantity < 10) {
      return originalAmount * 0.95;
    } else if (quantity >= 10 && quantity < 100) {
      return originalAmount * 0.9;
    } else if (quantity >= 100) {
      return originalAmount * 0.8;
    } else {
      return originalAmount;
    }
  };

  useEffect(() => {
    cartTotal(cartItems);
    afterDiscountTotal(cartItems);
  }, [cartItems, totalItems]);

  return cartItems?.length ? (
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.thead}>
          <TableCell>Id</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Qty</TableCell>
          <TableCell>Discount %</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Discount Price</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cartItems.map((item, index) => (
          <TableRow className={classes.row}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {item.title.length > 25
                ? `${item.title.substring(0, 25)}...`
                : item.title}
            </TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>
              <Button
                className={classes.btn}
                size="small"
                variant="contained"
                onClick={() => {
                  item.qty > 1
                    ? dispatch({ type: "REMOVE_FROM_CART", payload: item })
                    : dispatch({ type: "DELETE_FROM_CART", payload: item });
                }}
                disabled={!item.qty}
              >
                -
              </Button>
              {item.qty}
              <Button
                className={classes.btn}
                size="small"
                variant="contained"
                onClick={() => {
                  const payload = {
                    ...item,
                    type: "cart",
                  };
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: payload,
                  });
                }}
              >
                +
              </Button>
            </TableCell>
            <TableCell>{calculateDiscount(item.qty, item.price)}</TableCell>
            <TableCell>{(item.price * item.qty).toFixed(2)}</TableCell>
            <TableCell>
              {priceWithDiscount(item.qty, item.price).toFixed(2)}
            </TableCell>
            <TableCell>
              <Button
                onClick={() =>
                  dispatch({
                    type: "DELETE_FROM_CART",
                    payload: item,
                  })
                }
              >
                DELETE
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <br />
      <br />
      <Typography variant="h6">
        Cart Total
        <Typography style={{ textDecoration: "line-through" }}>
          {totalSum.toFixed(2)}
        </Typography>
        <Typography>{finalAmount.toFixed(2)}</Typography>
      </Typography>
    </Table>
  ) : (
    <Typography variant="h6">Your cart is empty</Typography>
  );
};

export default CartItems;
