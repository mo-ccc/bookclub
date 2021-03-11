from main import create_app
from .test_base import Test_base

class Test_booking(Test_base):
    def test_post(self):
        response = self.client.post(
            "http://tenant1.localhost:5000/facility/1",
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"},
            json={
                "date": "2022-03-19",
                "timeslot": 10
            }
        )
        self.assertEqual(response.status_code, 201)
    
    def test_owned_delete(self):
        response = self.client.delete(
            "http://tenant1.localhost:5000/booking/1",
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"}
        )
        self.assertEqual(response.status_code, 200)

    def test_admin_delete(self):
        response = self.client.delete(
            "http://tenant1.localhost:5000/bookings-control/1",
            headers={"Authorization":f"Bearer {self.get_token_for_user(1)}"}
        )
        self.assertEqual(response.status_code, 200)