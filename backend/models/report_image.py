from extensions import db


class ReportImage(db.Model):
    __tablename__ = "report_images"

    image_id = db.Column(
        db.Integer,
        primary_key=True
    )

    report_id = db.Column(
        db.Integer,
        db.ForeignKey("reports.report_id"),
        nullable=False
    )

    uploaded_by = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id"),
        nullable=False
    )

    image_url = db.Column(
        db.String(500),
        nullable=False
    )

    uploaded_at = db.Column(
        db.DateTime
    )

    report = db.relationship(
        "Report",
        back_populates="images"
    )

    uploader = db.relationship(
        "User",
        back_populates="uploaded_report_images"
    )

    def __repr__(self):
        return f"<ReportImage {self.image_id}>"