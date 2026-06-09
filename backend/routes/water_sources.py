from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from extensions import db
from models import WaterSource

water_sources_bp = Blueprint(
    "water_sources",
    __name__
)

@water_sources_bp.route(
    "/api/v1/water-sources",
    methods=["GET"]
)
def get_water_sources():

    sources = WaterSource.query.all()

    result = []

    for source in sources:
        result.append({
            "water_source_id": source.water_source_id,
            "name": source.name,
            "type": source.type,
            "latitude": float(source.latitude),
            "longitude": float(source.longitude),
            "capacity_liters": (
                float(source.capacity_liters)
                if source.capacity_liters is not None
                else None
            ),
            "description": source.description,
            "status": source.status,
            "created_by": source.created_by
        })

    return jsonify(result), 200

@water_sources_bp.route(
    "/api/v1/water-sources",
    methods=["POST"]
)
@jwt_required()
def create_water_source():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    name = data.get("name")
    source_type = data.get("type")
    latitude = data.get("latitude")
    longitude = data.get("longitude")

    if not all([
        name,
        source_type,
        latitude,
        longitude
    ]):
        return jsonify({
            "message":
            "name, type, latitude and longitude are required"
        }), 400

    water_source = WaterSource(
        created_by=user_id,
        name=name,
        type=source_type,
        latitude=latitude,
        longitude=longitude,
        capacity_liters=data.get("capacity_liters"),
        description=data.get("description"),
        status="Active"
    )

    db.session.add(water_source)
    db.session.commit()

    return jsonify({
        "message": "Water source created successfully",
        "water_source_id":
        water_source.water_source_id
    }), 201
    
    

@water_sources_bp.route(
    "/api/v1/water-sources/<int:water_source_id>",
    methods=["GET"]
)
def get_water_source(water_source_id):

    source = WaterSource.query.get(
        water_source_id
    )

    if not source:
        return jsonify({
            "message": "Water source not found"
        }), 404

    return jsonify(source.to_dict()), 200

@water_sources_bp.route(
    "/api/v1/water-sources/<int:water_source_id>",
    methods=["PUT"]
)
@jwt_required()
def update_water_source(water_source_id):

    source = WaterSource.query.get(
        water_source_id
    )

    if not source:
        return jsonify({
            "message": "Water source not found"
        }), 404

    data = request.get_json()

    source.name = data.get(
        "name",
        source.name
    )

    source.type = data.get(
        "type",
        source.type
    )

    source.latitude = data.get(
        "latitude",
        source.latitude
    )

    source.longitude = data.get(
        "longitude",
        source.longitude
    )

    source.capacity_liters = data.get(
        "capacity_liters",
        source.capacity_liters
    )

    source.description = data.get(
        "description",
        source.description
    )

    source.status = data.get(
        "status",
        source.status
    )

    db.session.commit()

    return jsonify({
        "message": "Water source updated successfully",
        "water_source": source.to_dict()
    }), 200
    

@water_sources_bp.route(
    "/api/v1/water-sources/<int:water_source_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_water_source(water_source_id):

    source = WaterSource.query.get(
        water_source_id
    )

    if not source:
        return jsonify({
            "message": "Water source not found"
        }), 404

    db.session.delete(source)
    db.session.commit()

    return jsonify({
        "message": "Water source deleted successfully"
    }), 200