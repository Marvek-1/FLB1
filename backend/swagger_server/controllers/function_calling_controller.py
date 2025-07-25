import connexion
import six

from swagger_server.models.chat_completion_response import ChatCompletionResponse  # noqa: E501
from swagger_server.models.functions_call_body import FunctionsCallBody  # noqa: E501
from swagger_server import util


def functions_call_post(body):  # noqa: E501
    """Generate JSON for function calls based on user input

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: ChatCompletionResponse
    """
    if connexion.request.is_json:
        body = FunctionsCallBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
