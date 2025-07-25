import connexion
import six

from swagger_server.models.oracle_insight import OracleInsight  # noqa: E501
from swagger_server.models.oracle_insight_body import OracleInsightBody  # noqa: E501
from swagger_server import util


def oracle_insight_post(body):  # noqa: E501
    """Query oracle engine for predictions

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: OracleInsight
    """
    if connexion.request.is_json:
        body = OracleInsightBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
