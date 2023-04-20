import json
from flask import Flask, jsonify

app = Flask(__name__)

# Путь к файлам
PRODUCTS_FILE_PATH = '../public/architektoria-mocks/products.json'
MATERIALS_FILE_PATH = '../public/architektoria-mocks/materials.json'
OPTIONS_FILE_PATH = '../public/architektoria-mocks/options.json'
BASE_FILE_PATH = '../public/architektoria-mocks/base.json'
SIZES_FILE_PATH = '../public/architektoria-mocks/sizes.json'


def load_file(file_name):
    with open(file_name, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data


# Эндпоинт для получения списка товаров
@app.route('/api/products', methods=['GET'])
def get_products():
    products = load_file(PRODUCTS_FILE_PATH)
    return jsonify(products)


# Эндпоинт для получения деталей о товаре по ID или Slug
@app.route('/api/products/<string:identifier>', methods=['GET'])
def get_product(identifier):
    products = load_file(PRODUCTS_FILE_PATH)
    product = None
    for p in products:
        if str(p["id"]) == identifier or p["slug"] == identifier:
            product = p
            break
    if product:
        product['image'] = "https://api.architektoria.ru" + product['image']
        product.update({"properties": {
            "materials": load_file(MATERIALS_FILE_PATH),
            "options": load_file(OPTIONS_FILE_PATH),
            "base": load_file(BASE_FILE_PATH),
            "sizes": load_file(SIZES_FILE_PATH)
            }
            }
        )

        return jsonify(product)
    else:
        return jsonify({"error": "Продукт не найден"}), 404

if __name__ == '__main__':
    load_file(MATERIALS_FILE_PATH)
    app.run(debug=True)
