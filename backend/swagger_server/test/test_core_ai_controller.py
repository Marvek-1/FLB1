# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.aiassistant_body import AiassistantBody  # noqa: E501
from swagger_server.models.assistant_response import AssistantResponse  # noqa: E501
from swagger_server.models.chat_completion_response import ChatCompletionResponse  # noqa: E501
from swagger_server.models.chat_completions_body import ChatCompletionsBody  # noqa: E501
from swagger_server.models.error_response import ErrorResponse  # noqa: E501
from swagger_server.test import BaseTestCase


class TestCoreAIController(BaseTestCase):
    """CoreAIController integration test stubs"""

    def test_ai_assistant_post(self):
        """Test case for ai_assistant_post

        Chat with Mo AI assistant
        """
        body = AiassistantBody()
        response = self.client.open(
            '/ai-assistant',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_create_chat_completion(self):
        """Test case for create_chat_completion

        Generate text completions based on provided messages and images
        """
        body = ChatCompletionsBody()
        response = self.client.open(
            '/chat/completions',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
