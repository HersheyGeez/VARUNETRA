from extensions import db


class Report(db.Model):
    __tablename__ = "reports"

    report_id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id"),
        nullable=False
    )

    water_source_id = db.Column(
        db.Integer,
        db.ForeignKey("water_sources.water_source_id"),
        nullable=True
    )

    latitude = db.Column(
        db.Numeric(10, 8),
        nullable=False
    )

    longitude = db.Column(
        db.Numeric(11, 8),
        nullable=False
    )

    report_type = db.Column(
        db.String(50),
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

    severity = db.Column(
        db.String(20),
        default="Medium"
    )

    status = db.Column(
        db.String(50),
        default="Pending"
    )

    verified_by = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id"),
        nullable=True
    )

    verified_at = db.Column(db.DateTime)

    created_at = db.Column(db.DateTime)

    updated_at = db.Column(db.DateTime)

    reporter = db.relationship(
        "User",
        foreign_keys=[user_id],
        back_populates="reports_created"
    )

    verifier = db.relationship(
        "User",
        foreign_keys=[verified_by],
        back_populates="reports_verified"
    )

    water_source = db.relationship(
        "WaterSource",
        back_populates="reports"
    )
    
    images = db.relationship(
    "ReportImage",
    back_populates="report",
    lazy=True
    )

    def to_dict(self):
        return {
            "report_id": self.report_id,
            "user_id": self.user_id,
            "water_source_id": self.water_source_id,
            "latitude": float(self.latitude),
            "longitude": float(self.longitude),
            "report_type": self.report_type,
            "title": self.title,
            "description": self.description,
            "severity": self.severity,
            "status": self.status,
            "verified_by": self.verified_by
        }

    def __repr__(self):
        return f"<Report {self.report_id}>"