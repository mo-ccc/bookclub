import flask
from main import db

db_cli = flask.Blueprint('db_cli', __name__)

@db_cli.cli.command('drop')
def drop_db():
    db.drop_all()
    db.engine.execute("DROP TABLE IF EXISTS alembic_version;")
    print("dropped all tables")


@db_cli.cli.command('create')
def create_all():
    db.create_all()
    print("created all tables")