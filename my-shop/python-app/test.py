import requests
import json

answ = requests.get("http://127.0.0.1:5000/api/products/olimpiya")

print(answ.json())
