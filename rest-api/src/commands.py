import flask
from main import db

db_cli = flask.Blueprint('db_cli', __name__)

@db_cli.cli.command('drop')
def drop_db():
    db.drop_all()
    db.engine.execute("DROP TABLE IF EXISTS alembic_version;")
    print("dropped all tables")

@db_cli.cli.command('seed')
def seed_db():
    from models.Tenant import Tenant
    for x in range(1, 4):
        t = Tenant(domain_name=f"tenant{x}")
        db.session.add(t)
    db.session.flush()

    from models.User import User
    for x in range(1, 4):
        u = User(email="user1@test.com", password="123456", is_owner=True, is_admin=True, tenant_id=x)
        db.session.add(u)
    db.session.flush()

    for y in range(1, 4):
        for x in range(1, 3):
            u = User(email=f"user{x+1}@test.com", password="123456", tenant_id=y, is_admin=False)
            db.session.add(u)
    db.session.flush()

    from models.Facility import Facility
    for y in range(1, 4):
        for x in range(1, 3):
            f = Facility(name=f"facility{x}", tenant_id=y)
            db.session.add(f)
    db.session.flush()

    db.session.commit()

    