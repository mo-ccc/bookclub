import flask
from main import db
from datetime import datetime, timedelta, date

db_cli = flask.Blueprint('db_cli', __name__)

@db_cli.cli.command('drop')
def drop_db():
    db.drop_all()
    db.engine.execute("DROP TABLE IF EXISTS alembic_version;")
    print("dropped all tables")

@db_cli.cli.command('seed')
def seed_db():
    from models.Tenant import Tenant
    t = Tenant(domain_name="tenant1")
    db.session.add(t)
    db.session.flush()

    from models.User import User
    u = User(email="user1@test.com", password="123456", is_owner=True, is_admin=True, tenant_id=1, name="default name")
    db.session.add(u)
    db.session.flush()

    for x in range(1, 3): 
        u = User(email=f"user{x+1}@test.com", password="123456", tenant_id=1, is_admin=False, name="default name")
        db.session.add(u)
    db.session.flush()

    from models.Facility import Facility
    from models.Availability import Availability
    for x in range(1, 3):
        f = Facility(name=f"facility{x}", tenant_id=1) # 123, 456, 789
        db.session.add(f)
        a = Availability(facility=f,
            mondayEnd=30, tuesdayEnd=30, wednesdayEnd=30, thursdayEnd=30,
            fridayEnd=30, saturdayEnd=30, sundayEnd=30
        )
        db.session.add(a)
    db.session.flush()

    from models.Booking import Booking
    for x in range(3):
        b = Booking(user_id=1, facility_id=1, date=date.today(), timeslot=29)
        db.session.add(b)
    db.session.flush()

    db.session.commit()

    