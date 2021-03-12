import psycopg2
import dotenv
import os

dotenv.load_dotenv()

def get_from_env(var_name):
    value = os.getenv(var_name)

    if not value:
        raise ValueError(f"{var_name} is not set")

    return value

class Config():
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SERVER_NAME = get_from_env("HOSTNAME")

    JWT_SECRET_KEY = get_from_env('JWT_SECRET_KEY')
    if os.getenv("DB_URL"):
        SQLALCHEMY_DATABASE_URI = get_from_env('DB_URL')
    
class Development(Config):
    DEBUG = True
    if os.getenv("DB_URI"):
        SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{get_from_env('DB_URI')}/development"

class Testing(Config):
    TESTING = True
    if os.getenv("DB_URI"):
        SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{get_from_env('DB_URI')}/testing" # a separate database for tests only

class Production(Config):
    if os.getenv("DB_URI"):
        SQLALCHEMY_DB_URI = f"postgresql+psycopg2://{get_from_env('DB_URI')}/production"
    # production postgresql database

environment = get_from_env('FLASK_ENV')

if environment == 'development':
    configuration = Development()
elif environment == 'testing':
    configuration = Testing()
elif environment == 'production':
    configuration = Production()
else:
    raise ValueError('FLASK_ENV is not set properly. use development, testing or production')