import psycopg2
import dotenv
import os

dotenv.load_dotenv()

class Config():
    DEBUG = False
    TESTING = False

    SERVER_NAME = 'localhost:5000'

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_COOKIE_CSRF_PROTECT = False # come back to this later
    
class Development(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/development.db' # a temporary sqlite database

class Testing(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db' # a separate database for tests only

class Production(Config):
    SQLALCHEMY_DB_URI = f"postgresql+psycopg2://{os.getenv('DB_URI')}"
    # production postgresql database


environment = os.getenv('FLASK_ENV')

if environment == 'development':
    configuration = Development()
elif environment == 'testing':
    configuration = Testing()
elif environment == 'production':
    configuration = Production()
else:
    raise Exception('FLASK_ENV is not set. use development, testing or production')