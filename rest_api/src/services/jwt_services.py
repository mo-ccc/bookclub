import flask
import flask_jwt_extended as jwt
from functools import wraps


# there are two wrappers which causes the decorator to require parenthesis
def admin_required():
    def wrapper(fn): # first wrapper
        @wraps(fn)
        def decorator(*args, **kwargs): # second wrapper
            jwt.verify_jwt_in_request()
            claims = jwt.get_jwt()
            if claims["is_admin"] or claims["is_owner"]:
                return fn(*args, **kwargs)
            else:
                return flask.jsonify(msg="Unauthorized"), 403

        return decorator
    return wrapper

def owner_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            jwt.verify_jwt_in_request() # verifies jwt in the request
            claims = jwt.get_jwt() # retrieves all claims in the jwt
            if claims["is_owner"]: # if is_owner is true
                return fn(*args, **kwargs) # return the wrapped function
            else:
                return flask.jsonify(msg="Unauthorized"), 403

        return decorator
    return wrapper