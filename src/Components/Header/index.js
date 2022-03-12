import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  button: {
    "&:hover": {
      background: "black",
    },
  },
});

const Header = () => {
  const { totalItems } = useSelector((state) => state.cart);
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography variant="h6">Cart App</Typography>
            <Button
              className={classes.button}
              color="inherit"
              component={Link}
              to="/"
            >
              Home
            </Button>
            <Button
              className={classes.button}
              color="inherit"
              component={Link}
              to="/cart"
            >
              Cart {totalItems}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
