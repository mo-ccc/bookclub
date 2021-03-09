from main import create_app
from .test_base import Test_base

class Test_user(Test_base):
    def test_get_users(self):
        response = self.client.get(
            "http://tenant1.localhost:5000/user",
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"}
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("created_at", response.json[0])

    def test_create_user(self):
        response = self.client.post(
            "http://tenant1.localhost:5000/user",
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"},
            json={
                "name": "user",
                "email":"testcreate@test.com",
                "password":"123456"
            }
        )
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response.json)