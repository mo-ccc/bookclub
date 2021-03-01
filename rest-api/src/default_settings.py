import psycopg2
import dotenv
import os

dotenv.load_dotenv()

class Config():
    DEBUG = False
    TESTING = False

    SERVER_NAME = 'localhost:5000'

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    RENDER_AS_BATCH = True
    
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