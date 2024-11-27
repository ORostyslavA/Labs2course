import React from "react";
import DocumentTitle from "../../components/helmet/document_title";
import "./CartPage.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../../redux/CartSlice';

function CartPage() {
    DocumentTitle("Cart");
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const totalAmount = items.reduce((total, item) => 
        total + item.price * item.quantity, 0
    ).toFixed(2);

    const handleIncrement = (id, city, day) => {
        dispatch(incrementQuantity({ id, city, day }));
    };

    const handleDecrement = (id, city, day) => {
        dispatch(decrementQuantity({ id, city, day }));
    };

    return (
        <div className="cart_content">
            <h1 className="cart_content_title">Shopping Cart</h1>
            <div className="cart_content_items">
                {items.map((item) => (
                    <div className="cart_item" key={`${item.id}-${item.city}-${item.day}`}>
                        <img src={item.imgpath} alt={item.title} />
                        <h2 className="cart_item_title">{item.title}</h2>
                        <p className="cart_item_color">Place: {item.city}</p>
                        <p className="cart_item_day">Day: {item.day}</p>
                        <div className="cart_item_buttons">
                            <button onClick={() => handleDecrement(item.id, item.city, item.day)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleIncrement(item.id, item.city, item.day)}>+</button>
                        </div>
                        <p className="cart_item_price">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="cart_content_total-price">
                <p>Total amount: ${totalAmount}</p>
            </div>
            <div className="cart_content_buttons">
                <Link to={`/catalog`}>
                    <button className="underline_button">Back to Catalog</button>
                </Link>
                <Link to={`/checkout`}>
                    <button className="underline_button">Continue</button>
                </Link>
            </div>
        </div>
    );
}

export default CartPage;