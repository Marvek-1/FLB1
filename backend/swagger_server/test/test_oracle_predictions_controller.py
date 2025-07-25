# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.oracle_insight import OracleInsight  # noqa: E501
from swagger_server.models.oracle_insight_body import OracleInsightBody  # noqa: E501
from swagger_server.test import BaseTestCase


class TestOraclePredictionsController(BaseTestCase):
    """OraclePredictionsController integration test stubs"""

    def test_oracle_insight_post(self):
        """Test case for oracle_insight_post

        Query oracle engine for predictions
        """
        body = OracleInsightBody()
        response = self.client.open(
            '/oracle/insight',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
