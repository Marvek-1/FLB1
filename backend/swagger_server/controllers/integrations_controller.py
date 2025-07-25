import connexion
import six

from swagger_server.models.generic_integration import GenericIntegration  # noqa: E501
from swagger_server.models.mapbox_integration import MapboxIntegration  # noqa: E501
from swagger_server import util


def integration_design_figma_post(body):  # noqa: E501
    """Integrate with Figma for design collaboration

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = GenericIntegration.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def integration_mapping_mapbox_post(body):  # noqa: E501
    """Integrate with Mapbox for mapping services

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = MapboxIntegration.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def integration_mapping_openlayers_post(body):  # noqa: E501
    """Integrate with OpenLayers for web mapping

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = GenericIntegration.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def integration_supply_chain_dhl_post(body):  # noqa: E501
    """Integrate with DHL for logistics

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = GenericIntegration.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
