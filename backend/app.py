from flask import Flask, jsonify
from sqlalchemy import text
from models.role import Role
from models.user import User
from models.water_source import WaterSource

from config import Config
from extensions import db

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)


@app.route("/")
def home():
    return {
        "project": "VARUNETRA",
        "status": "running"
    }


@app.route("/api/v1/health")
def health_check():
    try:
        db.session.execute(text("SELECT 1"))

        return jsonify({
            "status": "healthy",
            "database": "connected"
        })

    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)