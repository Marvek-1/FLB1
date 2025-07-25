import connexion
import six

from swagger_server.models.feedback_response import FeedbackResponse  # noqa: E501
from swagger_server.models.feedback_submission import FeedbackSubmission  # noqa: E501
from swagger_server import util


def roadmap_feedback_post(body):  # noqa: E501
    """Submit feedback on enhancement roadmap

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: FeedbackResponse
    """
    if connexion.request.is_json:
        body = FeedbackSubmission.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
