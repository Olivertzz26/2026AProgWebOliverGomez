from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Esto permite que tu HTML de Nginx consulte la API de Flask de forma segura
CORS(app)

@app.route('/getMyInfo')
def getMyInfo():
    value = {
        "name": "Oliver Sebastian",
        "lastname": "Gomez Martinez",
        "socialMedia": {
            "facebookUser": "Oliver Gomez",
            "instagramUser": "olivergm.26",
            "xUser": "olivergm.26",
            "linkedin": "oliver-gomez",
            "githubUser": "Olivertzz26"
        },
        "blog": "https://github.com/Olivertzz26/2026AProgWebOliverGomez",
        "author": "Susana Villegas"
    }
    return jsonify(value)

if __name__ == '__main__':
    app.run(port=5000)