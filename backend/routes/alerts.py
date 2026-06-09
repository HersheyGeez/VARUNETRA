from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    jwt_required
)

from extensions import db
from models import Alert

alerts_bp = Blueprint(
    "alerts",
    __name__
)

@alerts_bp.route(
    "/api/v1/alerts",
    methods=["GET"]
)
def get_alerts():

    alerts = Alert.query.all()

    return jsonify([
        alert.to_dict()
        for alert in alerts
    ]), 200



@alerts_bp.route(
    "/api/v1/alerts/<int:alert_id>",
    methods=["GET"]
)
def get_alert(alert_id):

    alert = Alert.query.get(
        alert_id
    )

    if not alert:
        return jsonify({
            "message": "Alert not found"
        }), 404

    return jsonify(
        alert.to_dict()
    ), 200



@alerts_bp.route(
    "/api/v1/alerts",
    methods=["POST"]
)
@jwt_required()
def create_alert():

    data = request.get_json()

    required_fields = [
        "alert_type",
        "severity",
        "title",
        "description"
    ]

    for field in required_fields:
        if not data.get(field):
            return jsonify({
                "message":
                f"{field} is required"
            }), 400

    alert = Alert(
        alert_type=data["alert_type"],
        severity=data["severity"],
        title=data["title"],
        description=data["description"],
        water_source_id=data.get(
            "water_source_id"
        ),
        danger_zone_id=data.get(
            "danger_zone_id"
        ),
        generated_by="System",
        is_active=True
    )

    db.session.add(alert)
    db.session.commit()

    return jsonify({
        "message":
        "Alert created successfully",
        "alert_id":
        alert.alert_id
    }), 201