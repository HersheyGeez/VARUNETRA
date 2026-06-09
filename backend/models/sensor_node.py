from extensions import db


class SensorNode(db.Model):
    __tablename__ = "sensor_nodes"

    sensor_node_id = db.Column(
        db.Integer,
        primary_key=True
    )

    water_source_id = db.Column(
        db.Integer,
        db.ForeignKey("water_sources.water_source_id"),
        nullable=False
    )

    node_name = db.Column(
        db.String(150),
        nullable=False
    )

    thingspeak_channel_id = db.Column(
        db.String(100)
    )

    status = db.Column(
        db.String(50),
        default="Active"
    )

    installed_at = db.Column(db.DateTime)

    last_seen = db.Column(db.DateTime)

    created_at = db.Column(db.DateTime)

    updated_at = db.Column(db.DateTime)

    water_source = db.relationship(
        "WaterSource",
        back_populates="sensor_nodes"
    )
    
    sensor_readings = db.relationship(
    "SensorReading",
    back_populates="sensor_node",
    lazy=True
    )

    def __repr__(self):
        return f"<SensorNode {self.node_name}>"