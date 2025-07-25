import connexion
import six

from swagger_server.models.federatednode_register_body import FederatednodeRegisterBody  # noqa: E501
from swagger_server.models.federatedtraining_submit_body import FederatedtrainingSubmitBody  # noqa: E501
from swagger_server.models.global_model import GlobalModel  # noqa: E501
from swagger_server.models.node_health_status import NodeHealthStatus  # noqa: E501
from swagger_server import util


def federated_node_register_post(body):  # noqa: E501
    """Register a federated client node

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = FederatednodeRegisterBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def federated_training_global_model_get():  # noqa: E501
    """Retrieve aggregated model weights

     # noqa: E501


    :rtype: GlobalModel
    """
    return 'do some magic!'


def federated_training_submit_post(body):  # noqa: E501
    """Submit training weights from a federated node

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = FederatedtrainingSubmitBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def federation_nodes_heartbeat_get():  # noqa: E501
    """Monitor federated node health

     # noqa: E501


    :rtype: NodeHealthStatus
    """
    return 'do some magic!'
