import connexion
import six

from swagger_server.models.hypothesis_request import HypothesisRequest  # noqa: E501
from swagger_server.models.hypothesis_response import HypothesisResponse  # noqa: E501
from swagger_server.models.logic_verifyproofs_body import LogicVerifyproofsBody  # noqa: E501
from swagger_server.models.trace_chain_body import TraceChainBody  # noqa: E501
from swagger_server import util


def logic_trace_chain_post(body):  # noqa: E501
    """Trace multi-hop logic chains

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = TraceChainBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def logic_verify_proofs_post(body):  # noqa: E501
    """Verify symbolic logic proofs

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = LogicVerifyproofsBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def reasoning_validate_hypothesis_post(body):  # noqa: E501
    """Validate symbolic hypothesis

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: HypothesisResponse
    """
    if connexion.request.is_json:
        body = HypothesisRequest.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
