from flask import Blueprint, request, jsonify
from datetime import datetime

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from extensions import db
from models import Report

reports_bp = Blueprint(
    "reports",
    __name__
)

@reports_bp.route(
    "/api/v1/reports",
    methods=["GET"]
)
def get_reports():

    reports = Report.query.all()

    return jsonify([
        report.to_dict()
        for report in reports
    ]), 200


@reports_bp.route(
    "/api/v1/reports/<int:report_id>",
    methods=["GET"]
)
def get_report(report_id):

    report = Report.query.get(
        report_id
    )

    if not report:
        return jsonify({
            "message": "Report not found"
        }), 404

    return jsonify(
        report.to_dict()
    ), 200


@reports_bp.route(
    "/api/v1/reports",
    methods=["POST"]
)
@jwt_required()
def create_report():

    user_id = int(
        get_jwt_identity()
    )

    data = request.get_json()

    required_fields = [
        "latitude",
        "longitude",
        "report_type",
        "title",
        "description"
    ]

    for field in required_fields:
        if not data.get(field):
            return jsonify({
                "message":
                f"{field} is required"
            }), 400

    report = Report(
        user_id=user_id,
        water_source_id=data.get(
            "water_source_id"
        ),
        latitude=data["latitude"],
        longitude=data["longitude"],
        report_type=data["report_type"],
        title=data["title"],
        description=data["description"],
        severity=data.get(
            "severity",
            "Medium"
        ),
        status="Pending"
    )

    db.session.add(report)
    db.session.commit()

    return jsonify({
        "message":
        "Report created successfully",
        "report_id":
        report.report_id
    }), 201

@reports_bp.route(
    "/api/v1/reports/<int:report_id>/verify",
    methods=["PUT"]
)
@jwt_required()
def verify_report(report_id):

    report = Report.query.get(report_id)

    if not report:
        return jsonify({
            "message": "Report not found"
        }), 404

    user_id = int(
        get_jwt_identity()
    )

    report.status = "Verified"
    report.verified_by = user_id
    report.verified_at = datetime.utcnow()

    db.session.commit()

    return jsonify({
        "message": "Report verified successfully",
        "report": report.to_dict()
    }), 200