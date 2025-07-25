# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.hypothesis_request import HypothesisRequest  # noqa: E501
from swagger_server.models.hypothesis_response import HypothesisResponse  # noqa: E501
from swagger_server.models.logic_verifyproofs_body import LogicVerifyproofsBody  # noqa: E501
from swagger_server.models.trace_chain_body import TraceChainBody  # noqa: E501
from swagger_server.test import BaseTestCase


class TestSymbolicReasoningController(BaseTestCase):
    """SymbolicReasoningController integration test stubs"""

    def test_logic_trace_chain_post(self):
        """Test case for logic_trace_chain_post

        Trace multi-hop logic chains
        """
        body = TraceChainBody()
        response = self.client.open(
            '/logic/trace/chain',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_logic_verify_proofs_post(self):
        """Test case for logic_verify_proofs_post

        Verify symbolic logic proofs
        """
        body = LogicVerifyproofsBody()
        response = self.client.open(
            '/logic/verify-proofs',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_reasoning_validate_hypothesis_post(self):
        """Test case for reasoning_validate_hypothesis_post

        Validate symbolic hypothesis
        """
        body = HypothesisRequest()
        response = self.client.open(
            '/reasoning/validate-hypothesis',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
