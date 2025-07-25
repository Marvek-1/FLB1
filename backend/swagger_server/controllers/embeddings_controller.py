import connexion
import six

from swagger_server.models.embedding_response import EmbeddingResponse  # noqa: E501
from swagger_server.models.embeddings_body import EmbeddingsBody  # noqa: E501
from swagger_server import util


def embeddings_post(body):  # noqa: E501
    """Create embeddings for a given input

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: EmbeddingResponse
    """
    if connexion.request.is_json:
        body = EmbeddingsBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
