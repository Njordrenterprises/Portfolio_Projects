from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Enable debug mode for development
app.debug = True

@app.route('/hx-get', methods=['GET'])
def handle_hx_get():
    url = request.args.get('url')
    try:
        # Fetch the content of the external webpage
        response = requests.get(url)
        if response.status_code == 200:
            content = response.text
            return content, 200
        else:
            return f"Failed to fetch content from {url}", 500
    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == '__main__':
    app.run(host='localhost', port=8000)

