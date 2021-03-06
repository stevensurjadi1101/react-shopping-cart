import React, { Component } from "react";
import formatCurrency from "../util";

export default class Products extends Component {
    render() {
        return (
            <div>
                <ul className="products">
                    {this.props.products.map((product, index) => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#" + product._id}>
                                    <img src={product.image} alt={product.title} />
                                    <p>{product.title}</p>
                                </a>
                                <div className="product-price">
                                    <div className="price">
                                        {formatCurrency(product.price)}
                                    </div>
                                    <button className="btn btn-primary" onClick={() => this.props.addToCart(product)}>
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        )
    }
}