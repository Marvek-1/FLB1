import connexion
import six

from swagger_server.models.aiassistant_body import AiassistantBody  # noqa: E501
from swagger_server.models.assistant_response import AssistantResponse  # noqa: E501
from swagger_server.models.chat_completion_response import ChatCompletionResponse  # noqa: E501
from swagger_server.models.chat_completions_body import ChatCompletionsBody  # noqa: E501
from swagger_server.models.error_response import ErrorResponse  # noqa: E501
from swagger_server import util


def ai_assistant_post(body):  # noqa: E501
    """Chat with Mo AI assistant

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: AssistantResponse
    """
    if connexion.request.is_json:
        body = AiassistantBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def create_chat_completion(body):  # noqa: E501
    """Generate text completions based on provided messages and images

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: ChatCompletionResponse
    """
    if connexion.request.is_json:
        body = ChatCompletionsBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
