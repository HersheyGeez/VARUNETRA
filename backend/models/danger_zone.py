from extensions import db


class DangerZone(db.Model):
    __tablename__ = "danger_zones"

    danger_zone_id = db.Column(
        db.Integer,
        primary_key=True
    )

    zone_name = db.Column(
        db.String(150),
        nullable=False
    )

    latitude = db.Column(
        db.Numeric(10, 8),
        nullable=False
    )

    longitude = db.Column(
        db.Numeric(11, 8),
        nullable=False
    )

    radius_meters = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    risk_level = db.Column(
        db.String(20),
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    created_by = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id"),
        nullable=False
    )

    created_at = db.Column(db.DateTime)

    updated_at = db.Column(db.DateTime)

    creator = db.relationship(
        "User",
        back_populates="danger_zones"
    )

    alerts = db.relationship(
        "Alert",
        back_populates="danger_zone",
        lazy=True
    )

    def to_dict(self):
        return {
            "danger_zone_id": self.danger_zone_id,
            "zone_name": self.zone_name,
            "latitude": float(self.latitude),
            "longitude": float(self.longitude),
            "radius_meters": float(self.radius_meters),
            "risk_level": self.risk_level,
            "description": self.description,
            "created_by": self.created_by
        }

    def __repr__(self):
        return f"<DangerZone {self.zone_name}>"