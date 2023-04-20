import json
from flask import Flask, jsonify

app = Flask(__name__)

# Путь к файлу products.json
PRODUCTS_FILE_PATH = '../public/architektoria-mocks/products.json'
PRODUCTS_FILE_PATH = '../public/architektoria-mocks/products.json'

def load_products():
    with open(PRODUCTS_FILE_PATH, 'r', encoding='utf-8') as file:
        products_data = json.load(file)
    return products_data


# Эндпоинт для получения списка товаров
@app.route('/api/products', methods=['GET'])
def get_products():
    products = load_products()
    return jsonify(products)


# Эндпоинт для получения деталей о товаре по ID или Slug
@app.route('/api/products/<string:identifier>', methods=['GET'])
def get_product(identifier):
    products = load_products()
    product = None
    for p in products:
        if str(p["id"]) == identifier or p["slug"] == identifier:
            product = p
            break
    if product:
        product['image'] = "https://api.architektoria.ru" + product['image']
        product.update({"properties": {
            "materials": [],
            "options": [],
            "base": [],
            "sizes": []
        }})

        return jsonify(product)
    else:
        return jsonify({"error": "Продукт не найден"}), 404

if __name__ == '__main__':
    app.run(debug=True)
