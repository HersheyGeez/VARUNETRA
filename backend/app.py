from flask import Flask

from config import Config
from extensions import db, jwt

import models



from routes import (
    health_bp,
    auth_bp,
    water_sources_bp,
    reports_bp,
    danger_zones_bp,
    alerts_bp
)

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
jwt.init_app(app)

app.register_blueprint(health_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(water_sources_bp)
app.register_blueprint(
    reports_bp
)
app.register_blueprint(
    danger_zones_bp
)
app.register_blueprint(
    alerts_bp
)

@app.route("/")
def home():
    return {
        "project": "VARUNETRA",
        "status": "running"
    }


if __name__ == "__main__":
    app.run(debug=True)