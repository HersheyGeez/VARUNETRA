from extensions import db


class WaterSourceImage(db.Model):
    __tablename__ = "water_source_images"

    image_id = db.Column(
        db.Integer,
        primary_key=True
    )

    water_source_id = db.Column(
        db.Integer,
        db.ForeignKey("water_sources.water_source_id"),
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

    water_source = db.relationship(
        "WaterSource",
        back_populates="images"
    )

    uploader = db.relationship(
        "User",
        back_populates="uploaded_water_source_images"
    )

    def __repr__(self):
        return f"<WaterSourceImage {self.image_id}>"