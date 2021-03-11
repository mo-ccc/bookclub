from main import create_app
from .test_base import Test_base

class Test_facility(Test_base):
    def test_get(self):
        response = self.client.get(
            "http://tenant1.localhost:5000/facility"
        )
        self.assertEqual(response.status_code, 200)
        self.assertIs(list, type(response.json))

    def test_detail_get(self):
        response = self.client.get(
            "http://tenant1.localhost:5000/facility/1/2022-03-19"
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("counts", response.json)

    def test_post(self):
        response = self.client.post(
            "http://tenant1.localhost:5000/facility",
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"},
            json={
                "name": "new facility",
            }
        )
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response.json)

    def test_delete(self):
        response = self.client.delete(
            "http://tenant1.localhost:5000/facility/1",
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"}
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json)

    def test_patch(self):
        response = self.client.patch(
            "http://tenant1.localhost:5000/facility/1",
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"},
            json={
                "name": "new name"
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json)