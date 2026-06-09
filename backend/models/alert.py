from extensions import db


class Alert(db.Model):
    __tablename__ = "alerts"

    alert_id = db.Column(
        db.Integer,
        primary_key=True
    )

    alert_type = db.Column(
        db.String(50),
        nullable=False
    )

    severity = db.Column(
        db.String(20),
        nullable=False
    )

    title = db.Column(
        db.Text,
        nullable=False
    )

    description = db.Column(
        db.Text,
        nullable=False
    )

    water_source_id = db.Column(
        db.Integer,
        db.ForeignKey("water_sources.water_source_id")
    )

    danger_zone_id = db.Column(
        db.Integer,
        db.ForeignKey("danger_zones.danger_zone_id")
    )

    generated_by = db.Column(
        db.String(50),
        default="System"
    )

    is_active = db.Column(
        db.Boolean,
        default=True
    )

    created_at = db.Column(db.DateTime)

    expires_at = db.Column(db.DateTime)

    water_source = db.relationship(
        "WaterSource",
        back_populates="alerts"
    )

    danger_zone = db.relationship(
        "DangerZone",
        back_populates="alerts"
    )

    def to_dict(self):
        return {
            "alert_id": self.alert_id,
            "alert_type": self.alert_type,
            "severity": self.severity,
            "title": self.title,
            "description": self.description,
            "water_source_id": self.water_source_id,
            "danger_zone_id": self.danger_zone_id,
            "generated_by": self.generated_by,
            "is_active": self.is_active
        }

    def __repr__(self):
        return f"<Alert {self.alert_id}>"