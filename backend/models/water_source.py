from extensions import db


class WaterSource(db.Model):
    __tablename__ = "water_sources"

    water_source_id = db.Column(
        db.Integer,
        primary_key=True
    )

    created_by = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id"),
        nullable=False
    )

    name = db.Column(
        db.String(150),
        nullable=False
    )

    type = db.Column(
        db.String(50),
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

    capacity_liters = db.Column(
        db.Numeric(18, 2)
    )

    description = db.Column(
        db.Text
    )

    status = db.Column(
        db.String(50),
        default="Active"
    )

    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    creator = db.relationship(
        "User",
        back_populates="water_sources"
    )

    sensor_nodes = db.relationship(
    "SensorNode",
    back_populates="water_source",
    lazy=True
    )
    
    reports = db.relationship(
    "Report",
    back_populates="water_source",
    lazy=True
    )
    
    images = db.relationship(
    "WaterSourceImage",
    back_populates="water_source",
    lazy=True
    )
    
    alerts = db.relationship(
    "Alert",
    back_populates="water_source",
    lazy=True
    )

    def __repr__(self):
        return f"<WaterSource {self.name}>"