import React from "react";
import data from "./data.json";

import Products from './component/Products';
import Filter from './component/Filter';
import Cart from './component/Cart';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: []
    }
  }

  sortProduct = (event) => {
    console.log(event.target.value);
    const sort = event.target.value;

    this.setState((state) => ({
      sort: sort,
      products: this.state.products.sort((a, b) => (
        (sort === 'lowest')
          ? (a.price > b.price)
            ? 1
            : -1
          : (sort === 'highest')
            ? (a.price < b.price)
              ? 1
              : -1
            : a._id > b._id
              ? 1
              : -1
      ))
    }))
  }

  filterProduct = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: data.products
      });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
      });
    }
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    })
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({ cartItems });
    console.log(cartItems);
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({ cartItems: cartItems.filter(x => x._id !== product._id) });
    console.log(cartItems);
  }

  render() {

    return (
      <div className="App">

        <div className="grid-container">

          <header>
            <a href="/">React Shopping Cart</a>
          </header>

          <main>
            <div className="content">
              <div className="main">
                <Filter
                  count={this.state.products.length} size={this.state.size} sort={this.state.sort}
                  sortProduct={this.sortProduct} filterProduct={this.filterProduct} />
                <Products products={this.state.products} addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} />
              </div>
            </div>

          </main>

          <footer>
            All Right Reserved
          </footer>

        </div>


      </div>
    );

  }

}

export default App;
