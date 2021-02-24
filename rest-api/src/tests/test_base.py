import unittest
from main import db, create_app
import commands

class Test_base(unittest.TestCase):
    # ran before every test
    @classmethod
    def setUp(cls):
        cls.app = create_app() # creates an app
        cls.app.config.from_object('default_settings.Testing') # uses testing configuration
        cls.app_context = cls.app.app_context() # app_context is retrieved
        cls.app_context.push() # binds app context to the current context
        cls.client = cls.app.test_client() # test client is made using the app context
        db.drop_all()
        db.create_all()
        
        # invokes 'flask db_cli seed' in console
        # runner = cls.app.test_cli_runner()
        # runner.invoke(args=["db_cli", "seed"])
        
    # ran after every test
    @classmethod
    def tearDown(cls):
        db.session.remove()
        db.drop_all()
        db.create_all()
        cls.app_context.pop() # app context is popped from the context