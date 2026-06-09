from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from extensions import db
from models import DangerZone

danger_zones_bp = Blueprint(
    "danger_zones",
    __name__
)

@danger_zones_bp.route(
    "/api/v1/danger-zones",
    methods=["GET"]
)
def get_danger_zones():

    zones = DangerZone.query.all()

    return jsonify([
        zone.to_dict()
        for zone in zones
    ]), 200
    
    
@danger_zones_bp.route(
    "/api/v1/danger-zones/<int:danger_zone_id>",
    methods=["GET"]
)
def get_danger_zone(
    danger_zone_id
):

    zone = DangerZone.query.get(
        danger_zone_id
    )

    if not zone:
        return jsonify({
            "message":
            "Danger zone not found"
        }), 404

    return jsonify(
        zone.to_dict()
    ), 200
    
    
@danger_zones_bp.route(
    "/api/v1/danger-zones",
    methods=["POST"]
)
@jwt_required()
def create_danger_zone():

    user_id = int(
        get_jwt_identity()
    )

    data = request.get_json()

    required_fields = [
        "zone_name",
        "latitude",
        "longitude",
        "radius_meters",
        "risk_level"
    ]

    for field in required_fields:
        if not data.get(field):
            return jsonify({
                "message":
                f"{field} is required"
            }), 400

    zone = DangerZone(
        zone_name=data["zone_name"],
        latitude=data["latitude"],
        longitude=data["longitude"],
        radius_meters=data["radius_meters"],
        risk_level=data["risk_level"],
        description=data.get(
            "description"
        ),
        created_by=user_id
    )

    db.session.add(zone)
    db.session.commit()

    return jsonify({
        "message":
        "Danger zone created successfully",
        "danger_zone_id":
        zone.danger_zone_id
    }), 201