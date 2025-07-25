# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.chat_completion_response import ChatCompletionResponse  # noqa: E501
from swagger_server.models.functions_call_body import FunctionsCallBody  # noqa: E501
from swagger_server.test import BaseTestCase


class TestFunctionCallingController(BaseTestCase):
    """FunctionCallingController integration test stubs"""

    def test_functions_call_post(self):
        """Test case for functions_call_post

        Generate JSON for function calls based on user input
        """
        body = FunctionsCallBody()
        response = self.client.open(
            '/functions/call',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
