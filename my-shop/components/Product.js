import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

const Product = ({ product, onAddToCart }) => {
    const { id, image, title, price } = product;
    const [addedToCart, setAddedToCart] = useState(false);

    const formattedPrice = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB"
    }).format(price);


    const handleAddToCart = () => {
        setAddedToCart(true);
        onAddToCart(product);
    };

    return (
        <Col xs={6} md={4} lg={3}>
            <div className="position-relative mb-4">
                <img src={`https://api.architektoria.ru${image}`} alt={title} width='100%' />
                <Button className="position-absolute top-0 end-0 btn-light rounded-circle m-3" variant="primary" onClick={handleAddToCart}>
                    <FontAwesomeIcon icon={addedToCart ? faCheck : faPlus} />
                </Button>
                <h5>{title}</h5>
                <p><span className="text-danger">{formattedPrice}</span> <s className="text-secondary">{formattedPrice}</s></p>
            </div>
        </Col>
    );
};

export default Product;
