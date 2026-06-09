from flask import Blueprint, jsonify
from sqlalchemy import text

from extensions import db

health_bp = Blueprint(
    "health",
    __name__
)


@health_bp.route("/api/v1/health")
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