# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.dashboard_layout import DashboardLayout  # noqa: E501
from swagger_server.models.dashboard_state_body import DashboardStateBody  # noqa: E501
from swagger_server.test import BaseTestCase


class TestDashboardController(BaseTestCase):
    """DashboardController integration test stubs"""

    def test_dashboard_client_mock_get(self):
        """Test case for dashboard_client_mock_get

        Return mock dashboard layout
        """
        response = self.client.open(
            '/dashboard/client-mock',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_dashboard_state_get(self):
        """Test case for dashboard_state_get

        Get current dashboard state
        """
        response = self.client.open(
            '/dashboard/state',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_dashboard_state_post(self):
        """Test case for dashboard_state_post

        Update dashboard state
        """
        body = DashboardStateBody()
        response = self.client.open(
            '/dashboard/state',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
