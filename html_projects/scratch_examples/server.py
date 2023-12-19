
from flask import Flask, request, jsonify, render_template, Response
import requests

app = Flask(__name__)

# Serve the main HTML file when accessing the root URL ("/")
@app.route('/')
def index():
    with open('index.html', 'r') as file:
        content = file.read()
    return content

# Route for the proxy endpoint ("/proxy")
@app.route('/proxy', methods=['GET'])
def proxy_google():
    try:
        # Fetch the Google homepage
        url = request.headers.get('x-requested-url')
        response = requests.get(url)
        if response.status_code == 200:
            # Set CORS headers to allow the content to be displayed in the browser
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
            return Response(response.text, content_type='text/html', headers=headers), 200
        else:
            return f"Failed to fetch content from Google", 500
    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == '__main__':
    app.run(host='localhost', port=8002)

