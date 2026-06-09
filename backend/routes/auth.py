from flask import Blueprint, request, jsonify
from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from extensions import db
from models import User, Role

auth_bp = Blueprint(
    "auth",
    __name__
)

@auth_bp.route("/api/v1/auth/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({
            "message": "username, email and password are required"
        }), 400

    existing_user = User.query.filter(
        (User.username == username) |
        (User.email == email)
    ).first()

    if existing_user:
        return jsonify({
            "message": "User already exists"
        }), 409

    member_role = Role.query.filter_by(
        role_name="Member"
    ).first()

    if not member_role:
        return jsonify({
            "message": "Member role not found"
        }), 500

    password_hash = generate_password_hash(password)

    user = User(
        role_id=member_role.role_id,
        username=username,
        email=email,
        password_hash=password_hash
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user_id": user.user_id
    }), 201



@auth_bp.route("/api/v1/auth/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({
            "message": "username and password are required"
        }), 400

    user = User.query.filter_by(
        username=username
    ).first()

    if not user:
        return jsonify({
            "message": "Invalid credentials"
        }), 401

    if not check_password_hash(
        user.password_hash,
        password
    ):
        return jsonify({
            "message": "Invalid credentials"
        }), 401

    access_token = create_access_token(
        identity=str(user.user_id),
        additional_claims={
            "role": user.role.role_name,
            "username": user.username
        }
    )

    return jsonify({
        "access_token": access_token,
        "user_id": user.user_id,
        "username": user.username,
        "role": user.role.role_name
    }), 200



@auth_bp.route("/api/v1/auth/me", methods=["GET"])
@jwt_required()
def get_current_user():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return {
            "message": "User not found"
        }, 404

    return {
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "role": user.role.role_name
    }, 200