# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.embedding_response import EmbeddingResponse  # noqa: E501
from swagger_server.models.embeddings_body import EmbeddingsBody  # noqa: E501
from swagger_server.test import BaseTestCase


class TestEmbeddingsController(BaseTestCase):
    """EmbeddingsController integration test stubs"""

    def test_embeddings_post(self):
        """Test case for embeddings_post

        Create embeddings for a given input
        """
        body = EmbeddingsBody()
        response = self.client.open(
            '/embeddings',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
