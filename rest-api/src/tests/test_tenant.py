from main import create_app
from .test_base import Test_base

class Test_tenant(Test_base):
    def test_post(self):
        response = self.client.post(
            "http://localhost:5000/",
            json={
                "user": {"name": "owner of", "email": "test1@test.com", "password": "123456"},
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

    def test_patch(self):
        response = self.client.patch(
            "http://tenant1.localhost:5000/",
            json={
	            "primary_color": "#20F000",
	            "secondary_color": "#E004A1",
	            "open_registration": True,
	            "location": "area 51",
	            "statement": "a statement",
	            "description": "a description",
	            "phone": "04522981771"
            },
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"}
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("default_account_expiry_time", response.json)

    def test_delete(self):
        response = self.client.delete(
            "http://tenant1.localhost:5000/",
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"}
        )
        self.assertEqual(response.status_code, 200)
        
        test_existence = self.client.get(
            "http://tenant1.localhost:5000/"
        )
        self.assertEqual(test_existence.status_code, 404)