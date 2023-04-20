import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Product from "../components/Product";
import fs from "fs";
import path from "path";

const Main = ({ products }) => {
    const [cartItems, setCartItems] = useState([]); // Состояние для хранения добавленных товаров
    const [totalPrice, setTotalPrice] = useState(0); // Состояние для хранения суммы заказа

    return (
        <Container>
            <header className="d-flex justify-content-between align-items-center py-3">
                <h1>Логотип</h1>
                <div className="position-relative">
                    <Button variant="light" className="rounded-circle me-3">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </Button>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItems.length}
                    </span>
                </div>
            </header>
            <Row>
                {products.map((product) => (
                    <Product key={product.id} product={product}/>
                ))}
            </Row>
            <footer className="mt-5 text-end">
                <p>Общая сумма заказа: {totalPrice} RUB</p>
                <p>Количество товаров в корзине: {cartItems.length}</p>
            </footer>
        </Container>
    );
};

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "public/architektoria-mocks/products.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    return {
        props: {
            products,
        },
    };
}

export default Main;
