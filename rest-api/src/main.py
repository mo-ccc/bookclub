import flask

import flask_sqlalchemy
db = flask_sqlalchemy.SQLAlchemy()

import flask_marshmallow
ma = flask_marshmallow.Marshmallow()

import flask_migrate
migrate = flask_migrate.Migrate()

from flask.ext.bcrypt import Bcrypt
bcrypt = Bcrypt()


def create_app():
    app = flask.Flask(__name__)
    app.config.from_object('settings.configuration')

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)


    return app



def test(a, b):
    return a + b