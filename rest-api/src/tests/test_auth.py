from main import create_app
from .test_base import Test_base

class Test_auth(Test_base):
    def test_registration(self):
        response = self.client.post(
            "http://tenant1.localhost:5000/register",
            json={
                "name": "test user",
                "email": "testauth@test.com",
                "password": "123456"
            }
        )
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response.json)
        self.assertEqual(response.json["is_admin"], False)

    def test_login(self):
        response = self.client.post(
            "http://tenant1.localhost:5000/login",
            json={
                "email": "user1@test.com",
                "password": "123456"
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.json)