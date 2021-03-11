from main import create_app
from .test_base import Test_base

class Test_user_actions(Test_base):
    def test_get_own_user(self):
        response = self.client.get(
            "http://tenant1.localhost:5000/myuser",
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"}
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json)
        self.assertEqual(True, response.json["is_owner"])

    def test_patch_own_user(self):
        response = self.client.patch(
            "http://tenant1.localhost:5000/myuser",
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"},
            json={
                "name": "new name"
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json)

    def test_get_history(self):
        response = self.client.get(
            "http://tenant1.localhost:5000/booking-history",
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"}
        )
        self.assertEqual(response.status_code, 200)