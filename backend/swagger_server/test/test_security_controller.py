# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.audit_logs import AuditLogs  # noqa: E501
from swagger_server.models.security_enhanced_body import SecurityEnhancedBody  # noqa: E501
from swagger_server.models.session_revoke_body import SessionRevokeBody  # noqa: E501
from swagger_server.test import BaseTestCase


class TestSecurityController(BaseTestCase):
    """SecurityController integration test stubs"""

    def test_security_enhanced_post(self):
        """Test case for security_enhanced_post

        Enhance security measures
        """
        body = SecurityEnhancedBody()
        response = self.client.open(
            '/security/enhanced',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_security_logs_get(self):
        """Test case for security_logs_get

        Retrieve security audit logs
        """
        query_string = [('start_date', '2013-10-20T19:20:30+01:00'),
                        ('end_date', '2013-10-20T19:20:30+01:00'),
                        ('log_level', 'log_level_example')]
        response = self.client.open(
            '/security/logs',
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_session_revoke_post(self):
        """Test case for session_revoke_post

        Revoke user session
        """
        body = SessionRevokeBody()
        response = self.client.open(
            '/session/revoke',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
