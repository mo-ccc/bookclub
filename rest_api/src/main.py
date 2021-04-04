import flask
from werkzeug.exceptions import HTTPException

import flask_sqlalchemy
db = flask_sqlalchemy.SQLAlchemy()

import flask_marshmallow
ma = flask_marshmallow.Marshmallow()

import flask_migrate
migrate = flask_migrate.Migrate()

import flask_bcrypt
bcrypt = flask_bcrypt.Bcrypt()

import flask_jwt_extended
jwt = flask_jwt_extended.JWTManager()

import flask_cors
cors = flask_cors.CORS()


def create_app():
    app = flask.Flask(__name__)
    app.config.from_object('default_settings.configuration')

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)

    from commands import db_cli
    app.register_blueprint(db_cli)

    from controllers import blueprints
    for bp in blueprints:
        app.register_blueprint(bp)

    @app.errorhandler(Exception)
    def handle_error(e):
        code = 500
        if isinstance(e, HTTPException):
            code = e.code
        return flask.jsonify(error=str(e)), code

    return app

from services import jwt_behaviour # custom encode/decode methods/handlers