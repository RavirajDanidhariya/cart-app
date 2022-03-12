import React from "react";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import ProductList from "./Containers/Products/ProductList";
import CartItems from "./Containers/CartItems";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={ProductList} />
            <Route path="/cart" exact component={CartItems} />
          </Switch>
        </Layout>
      </Router>
    </React.Fragment>
  );
}

export default App;
