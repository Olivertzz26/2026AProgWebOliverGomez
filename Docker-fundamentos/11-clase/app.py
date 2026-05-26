import json
from flask import Flask
app = Flask(__name__)

@app.route('/getMyInfo')
def getMyInfo():
    value = {
        "name": "Oliver Sebastian",
        "lastname": "Gomez Martinez",
        "socialMedia": [
            {"facebookUser": "Oliver Gomez"},
            {"instagramUser": "olivergm.26"},
            {"xUser": "olivergm.26"},
            {"linkedin": "oliver-gomez"},
            {"githubUser": "Olivertzz26"}
        ],
        "blog": "https://github.com/Olivertzz26/2026AProgWebOliverGomez",
        "author": "Olivertzz26"
    }
    return json.dumps(value)

if __name__ == '__main__':
    # Esto asegura que Flask escuche dentro del contenedor Docker en el puerto 5000
    app.run(host='0.0.0.0', port=5000)