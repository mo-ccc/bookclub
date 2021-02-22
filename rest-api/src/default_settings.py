import psycopg2
import dotenv
import os

dotenv.load_dotenv()

class Config():
    DEBUG = False
    TESTING = False

    SERVER_NAME = 'localhost:5000'

    SQLALCHEMY_TRACK_MODIFICATIONS = False

class Development(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db'

class Testing(Config):
    TESTING = True

class Production(Config):
    SQLALCHEMY_DB_URI = os.getenv('DB_URI')


environment = os.getenv('FLASK_ENV')

if environment == 'development':
    configuration = Development()
elif environment == 'testing':
    configuration = Testing()
elif environment == 'production':
    configuration = Production()
else:
    raise Exception('FLASK_ENV is not set. use development, testing or production')