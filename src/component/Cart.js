import React, { Component } from 'react';
import formatCurrency from '../util';

export default class Cart extends Component {
    render() {

        const { cartItems } = this.props;

        return (
            <div>
                {
                    cartItems.length === 0
                        ? (<div className="cart cart-header">Cart is Empty</div>)
                        : (<div className="cart cart-header">You have {cartItems.length} in The Cart{" "}</div>)
                }
                <div>
                    <div className="cart">
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id} className="cart-item">
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div className="item-title">{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count} {" "}
                                            <button className="btn btn-primary" onClick={() => this.props.removeFromCart(item)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {
                        cartItems.length === 0
                            ? (<div></div>)
                            : (
                                <div className="cart">
                                    <div className="total">
                                        <div>
                                            Total:{" "}
                                            {formatCurrency(cartItems.reduce((a, c) => a + (c.price * c.count), 0))}
                                        </div>
                                        <button className="btn btn-secondary">
                                            Proceed
                                        </button>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}