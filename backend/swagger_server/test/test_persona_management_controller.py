# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.persona_config import PersonaConfig  # noqa: E501
from swagger_server.test import BaseTestCase


class TestPersonaManagementController(BaseTestCase):
    """PersonaManagementController integration test stubs"""

    def test_persona_id_get(self):
        """Test case for persona_id_get

        Retrieve persona configuration
        """
        response = self.client.open(
            '/persona/{id}'.format(id='id_example'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_persona_id_put(self):
        """Test case for persona_id_put

        Update persona configuration
        """
        body = PersonaConfig()
        response = self.client.open(
            '/persona/{id}'.format(id='id_example'),
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
