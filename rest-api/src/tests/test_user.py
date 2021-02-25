from main import create_app
from .test_base import Test_base

class Test_user(Test_base):
    def test_get_users(self):
        response = self.client.get(
            "http://tenant1.localhost:5000/user",
            headers={"Set-Cookie":self.get_token_for_user(1)}
        )
        print(response.json)
        self.assertEqual(response.status_code, 200)
        self.assertIn("created_at", response.json[0])