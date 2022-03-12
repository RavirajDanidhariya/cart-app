import React from "react";
import { Box, Grid } from "@material-ui/core";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <Box>
      <Grid>
        <Header />
        <div>{children}</div>
      </Grid>
    </Box>
  );
};

export default Layout;
