import connexion
import six

from swagger_server.models.persona_config import PersonaConfig  # noqa: E501
from swagger_server import util


def persona_id_get(id):  # noqa: E501
    """Retrieve persona configuration

     # noqa: E501

    :param id: 
    :type id: str

    :rtype: PersonaConfig
    """
    return 'do some magic!'


def persona_id_put(body, id):  # noqa: E501
    """Update persona configuration

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param id: 
    :type id: str

    :rtype: None
    """
    if connexion.request.is_json:
        body = PersonaConfig.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
