import connexion
import six

from swagger_server.models.memory_entry import MemoryEntry  # noqa: E501
from swagger_server.models.memory_state import MemoryState  # noqa: E501
from swagger_server import util


def memory_commit_post(body):  # noqa: E501
    """Commit new memory entry

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = MemoryEntry.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def memory_inspect_get(user_id):  # noqa: E501
    """Inspect current memory state

     # noqa: E501

    :param user_id: 
    :type user_id: str

    :rtype: MemoryState
    """
    return 'do some magic!'
