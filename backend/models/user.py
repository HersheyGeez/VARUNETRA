# models/user.py

from extensions import db


class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True)

    role_id = db.Column(
        db.Integer,
        db.ForeignKey("roles.role_id"),
        nullable=False
    )

    username = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    email = db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))
    profile_image_url = db.Column(db.String(500))

    email_verified = db.Column(
        db.Boolean,
        default=False
    )

    status = db.Column(
        db.String(50),
        default="Active"
    )

    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    role = db.relationship(
        "Role",
        back_populates="users"
    )
    
    water_sources = db.relationship(
    "WaterSource",
    back_populates="creator",
    lazy=True
    )

    def __repr__(self):
        return f"<User {self.username}>"