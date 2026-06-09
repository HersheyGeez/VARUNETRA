from extensions import db


class Role(db.Model):
    __tablename__ = "roles"

    role_id = db.Column(db.Integer, primary_key=True)

    role_name = db.Column(
        db.String(50),
        nullable=False,
        unique=True
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=False
    )

    users = db.relationship(
    "User",
    back_populates="role",
    lazy=True
)

    def __repr__(self):
        return f"<Role {self.role_name}>"