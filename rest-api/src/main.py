import flask

import flask_sqlalchemy
db = flask_sqlalchemy.SQLAlchemy()

import flask_marshmallow
ma = flask_marshmallow.Marshmallow()

import flask_migrate
migrate = flask_migrate.Migrate()

import flask_bcrypt
bcrypt = flask_bcrypt.Bcrypt()


def create_app():
    app = flask.Flask(__name__)
    app.config.from_object('default_settings.configuration')

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    from commands import db_cli
    app.register_blueprint(db_cli)

    from controllers import blueprints
    for bp in blueprints:
        app.register_blueprint(bp)

    return app



def test(a, b):
    return a + b