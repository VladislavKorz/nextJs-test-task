import React from "react";
import { Container, Row } from "react-bootstrap";
import Product from "../components/Product";
import fs from "fs";
import path from "path";

const ProductsPage = ({ products }) => {
    return (
        <Container>
            <Row>
                <h1>Кровати</h1>
            </Row>
            <Row>
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </Row>
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

export default ProductsPage;
