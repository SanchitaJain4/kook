import os
# import openai
# openai.api_key = "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"
# print(openai.Model.list())

import requests
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
app = Flask(__name__)
CORS(app)

def list_recipes(ingredients):
	url = "https://api.openai.com/v1/chat/completions"

	payload = "{\n  \"model\": \"gpt-3.5-turbo\",\n  \"messages\": [{\"role\": \"user\", \"content\": \"give me a list of 5 dishes with the following ingredients, if and only if the ingredients are safe for human consumption. " +  ", ".join(ingredients) + "\"}],\n  \"temperature\": 0.7\n}"
	print(payload)
	headers = {
	    'content-type': "application/json",
	    'authorization': "Bearer " + os.getenv("OPEN_AI_KEY"),
	    'cache-control': "no-cache",
	    'postman-token': "84093f64-ec54-6ec0-5f38-0d1ad01c239e"
	    }

	response = requests.request("POST", url, data=payload, headers=headers)

	print(response.text)
	return response.text

@app.route('/api', methods=['POST'])
def api():
	data = request.get_json()
	print(data)
	response = list_recipes(data["data"])
	json_resp = json.loads(response)
	return jsonify(json_resp)

if __name__ == '__main__':
    app.run(debug=True)



