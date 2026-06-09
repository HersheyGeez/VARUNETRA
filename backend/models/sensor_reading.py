from extensions import db


class SensorReading(db.Model):
    __tablename__ = "sensor_readings"

    reading_id = db.Column(
        db.Integer,
        primary_key=True
    )

    sensor_node_id = db.Column(
        db.Integer,
        db.ForeignKey("sensor_nodes.sensor_node_id"),
        nullable=False
    )

    water_level = db.Column(db.Numeric(10, 2))

    rainfall = db.Column(db.Numeric(10, 2))

    flow_rate = db.Column(db.Numeric(10, 2))

    battery_level = db.Column(db.Numeric(5, 2))

    source = db.Column(
        db.String(50),
        default="ThingSpeak"
    )

    recorded_at = db.Column(
        db.DateTime,
        nullable=False
    )

    sensor_node = db.relationship(
        "SensorNode",
        back_populates="sensor_readings"
    )

    def __repr__(self):
        return f"<SensorReading {self.reading_id}>"