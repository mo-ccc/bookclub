from main import create_app
from .test_base import Test_base

class Test_tenant(Test_base):
    def test_post(self):
        response = self.client.post(
            "http://localhost:5000/",
            json={
                "user": {"email": "test1@test.com", "password": "123456"},
                "tenant": {"domain_name": "first"}
            }
        )
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response.json)
        self.assertEqual(True, response.json["is_owner"])

    def test_get(self):
        response = self.client.get(
            "http://tenant1.localhost:5000/"
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("primary_color", response.json)
