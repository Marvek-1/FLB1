# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.generic_integration import GenericIntegration  # noqa: E501
from swagger_server.models.mapbox_integration import MapboxIntegration  # noqa: E501
from swagger_server.test import BaseTestCase


class TestIntegrationsController(BaseTestCase):
    """IntegrationsController integration test stubs"""

    def test_integration_design_figma_post(self):
        """Test case for integration_design_figma_post

        Integrate with Figma for design collaboration
        """
        body = GenericIntegration()
        response = self.client.open(
            '/integration/design/figma',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_integration_mapping_mapbox_post(self):
        """Test case for integration_mapping_mapbox_post

        Integrate with Mapbox for mapping services
        """
        body = MapboxIntegration()
        response = self.client.open(
            '/integration/mapping/mapbox',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_integration_mapping_openlayers_post(self):
        """Test case for integration_mapping_openlayers_post

        Integrate with OpenLayers for web mapping
        """
        body = GenericIntegration()
        response = self.client.open(
            '/integration/mapping/openlayers',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_integration_supply_chain_dhl_post(self):
        """Test case for integration_supply_chain_dhl_post

        Integrate with DHL for logistics
        """
        body = GenericIntegration()
        response = self.client.open(
            '/integration/supply-chain/dhl',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
