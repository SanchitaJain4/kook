import os
# import openai
# print(openai.Model.list())
from flask_caching import Cache

import requests
import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os


app = Flask(__name__, static_folder='../my-app/build/static')
CORS(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})


token = os.getenv("OPEN_AI_KEY", "")


def fetchRecipeFromOpenAi(recipe_name):
    url = "https://api.openai.com/v1/chat/completions"

    payload = "{\n  \"model\": \"gpt-3.5-turbo\",\n  \"messages\": [{\"role\": \"user\", \"content\": \"give me the recipe for " + recipe_name + "\"}],\n  \"temperature\": 0.7\n}"
    print(payload)
    headers = {
        'content-type': "application/json",
        'authorization': "Bearer " + token,
        'cache-control': "no-cache",
    }
    response = requests.request("POST", url, data=payload, headers=headers)
    print(response.text)
    return response.text


def list_recipes(ingredients):
    url = "https://api.openai.com/v1/chat/completions"

    payload = "{\n  \"model\": \"gpt-3.5-turbo\",\n  \"messages\": [{\"role\": \"user\", \"content\": \"give me a list of 5 dishes with the following ingredients, if and only if the ingredients are safe for human consumption. " + ", ".join(
        ingredients) + "\"}],\n  \"temperature\": 0.7\n}"
    print(payload)
    headers = {
        'content-type': "application/json",
        'authorization': "Bearer " + token,
        'cache-control': "no-cache",
    }

    response = requests.request("POST", url, data=payload, headers=headers)

    print(response.text)
    return response.text


@app.route('/')
def index():
    return send_from_directory('../my-app/build', 'index.html')


@app.route('/api', methods=['POST'])
def api():
    data = request.get_json()
    print(data)
    response = list_recipes(data["data"])
    json_resp = json.loads(response)
    return jsonify(json_resp)


@app.route('/getRecipe', methods=['POST'])
def get_recipe():
    data = request.get_json()
    cache_key = json.dumps(data)
    result = cache.get(cache_key)
    if not result:
        response = fetchRecipeFromOpenAi(recipe_name=data["data"])
        result = json.loads(response)
        cache.set(cache_key, result)

    return jsonify(result)


if __name__ == '__main__':
    from waitress import serve
    serve(app, host="0.0.0.0", port=80)
    #app.run(debug=True)
