import connexion
import six

from swagger_server.models.inline_response200 import InlineResponse200  # noqa: E501
from swagger_server.models.pilot_testing_body import PilotTestingBody  # noqa: E501
from swagger_server import util


def pilot_testing_post(body):  # noqa: E501
    """Conduct pilot interventions in identified hotspots

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: InlineResponse200
    """
    if connexion.request.is_json:
        body = PilotTestingBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
