# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.memory_entry import MemoryEntry  # noqa: E501
from swagger_server.models.memory_state import MemoryState  # noqa: E501
from swagger_server.test import BaseTestCase


class TestMemoryManagementController(BaseTestCase):
    """MemoryManagementController integration test stubs"""

    def test_memory_commit_post(self):
        """Test case for memory_commit_post

        Commit new memory entry
        """
        body = MemoryEntry()
        response = self.client.open(
            '/memory/commit',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_memory_inspect_get(self):
        """Test case for memory_inspect_get

        Inspect current memory state
        """
        query_string = [('user_id', 'user_id_example')]
        response = self.client.open(
            '/memory/inspect',
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
