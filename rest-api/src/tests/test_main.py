from main import test
import unittest

class Test_main(unittest.TestCase):
    def test_add(self):
        self.assertEqual(test(1, 1), 2)