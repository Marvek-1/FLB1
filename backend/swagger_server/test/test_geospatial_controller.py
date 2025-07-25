# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.alerts_subscribe_body import AlertsSubscribeBody  # noqa: E501
from swagger_server.test import BaseTestCase


class TestGeospatialController(BaseTestCase):
    """GeospatialController integration test stubs"""

    def test_geo_alerts_live_get(self):
        """Test case for geo_alerts_live_get

        Stream real-time geospatial alerts (WebSocket upgrade)
        """
        response = self.client.open(
            '/geo/alerts/live',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_geo_alerts_subscribe_post(self):
        """Test case for geo_alerts_subscribe_post

        Subscribe to specific geospatial alert types
        """
        body = AlertsSubscribeBody()
        response = self.client.open(
            '/geo/alerts/subscribe',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_satellite_imagery_get(self):
        """Test case for satellite_imagery_get

        Access satellite imagery data
        """
        query_string = [('lat', 1.2),
                        ('lon', 1.2),
                        ('zoom', 10),
                        ('date_range', 'date_range_example')]
        response = self.client.open(
            '/satellite/imagery',
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
