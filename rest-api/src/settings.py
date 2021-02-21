import psycopg2
import dotenv
import os

dotenv.load_dotenv()

class Config():
    DEBUG = False
    TESTING = False

    SQLALCHEMY_TRACK_MODIFICATIONS = False

class Development(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db'

class Testing(Config):
    TESTING = True

class Production(Config):
    SQLALCHEMY_DB_URI = os.getenv('DB_URI')


if os.getenv('FLASK_ENV') == 'development':
    configuration = Development()
elif os.getenv('FLASK_ENV') == 'testing':
    configuration = Testing()
elif os.getenv('FLASK_ENV') == 'production':
    configuration = Production()
else:
    raise Exception('FLASK_ENV is not set. use development, testing or production')