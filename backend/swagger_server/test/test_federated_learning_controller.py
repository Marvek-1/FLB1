# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.federatednode_register_body import FederatednodeRegisterBody  # noqa: E501
from swagger_server.models.federatedtraining_submit_body import FederatedtrainingSubmitBody  # noqa: E501
from swagger_server.models.global_model import GlobalModel  # noqa: E501
from swagger_server.models.node_health_status import NodeHealthStatus  # noqa: E501
from swagger_server.test import BaseTestCase


class TestFederatedLearningController(BaseTestCase):
    """FederatedLearningController integration test stubs"""

    def test_federated_node_register_post(self):
        """Test case for federated_node_register_post

        Register a federated client node
        """
        body = FederatednodeRegisterBody()
        response = self.client.open(
            '/federated-node/register',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_federated_training_global_model_get(self):
        """Test case for federated_training_global_model_get

        Retrieve aggregated model weights
        """
        response = self.client.open(
            '/federated-training/global-model',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_federated_training_submit_post(self):
        """Test case for federated_training_submit_post

        Submit training weights from a federated node
        """
        body = FederatedtrainingSubmitBody()
        response = self.client.open(
            '/federated-training/submit',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_federation_nodes_heartbeat_get(self):
        """Test case for federation_nodes_heartbeat_get

        Monitor federated node health
        """
        response = self.client.open(
            '/federation/nodes/heartbeat',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
