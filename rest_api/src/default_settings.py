import psycopg2
import dotenv
import os

dotenv.load_dotenv()

def get_from_env(var_name):
    value = os.environ.get(var_name)

    if not value:
        raise ValueError(f"{var_name} is not set")

    return value

class Config():
    DEBUG = False
    TESTING = False

    SERVER_NAME = 'localhost:5000'

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    RENDER_AS_BATCH = True
    JWT_SECRET_KEY = get_from_env('JWT_SECRET_KEY')
    
class Development(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{get_from_env('DB_URI')}/development"

    if os.getenv("DB_URL"):
        SQLALCHEMY_DATABASE_URI = get_from_env('DB_URL')

class Testing(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{get_from_env('DB_URI')}/testing" # a separate database for tests only

    if os.getenv("DB_URL"):
        SQLALCHEMY_DATABASE_URI = get_from_env('DB_URL')

class Production(Config):
    SQLALCHEMY_DB_URI = f"postgresql+psycopg2://{get_from_env('DB_URI')}/production"
    # production postgresql database

    if os.getenv("DB_URL"):
        SQLALCHEMY_DATABASE_URI = get_from_env('DB_URL')


environment = get_from_env('FLASK_ENV')

if environment == 'development':
    configuration = Development()
elif environment == 'testing':
    configuration = Testing()
elif environment == 'production':
    configuration = Production()
else:
    raise Exception('FLASK_ENV is not set properly. use development, testing or production')