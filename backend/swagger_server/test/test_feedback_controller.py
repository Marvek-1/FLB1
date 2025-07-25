# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.feedback_response import FeedbackResponse  # noqa: E501
from swagger_server.models.feedback_submission import FeedbackSubmission  # noqa: E501
from swagger_server.test import BaseTestCase


class TestFeedbackController(BaseTestCase):
    """FeedbackController integration test stubs"""

    def test_roadmap_feedback_post(self):
        """Test case for roadmap_feedback_post

        Submit feedback on enhancement roadmap
        """
        body = FeedbackSubmission()
        response = self.client.open(
            '/roadmap-feedback',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
