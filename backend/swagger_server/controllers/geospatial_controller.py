import connexion
import six

from swagger_server.models.alerts_subscribe_body import AlertsSubscribeBody  # noqa: E501
from swagger_server import util


def geo_alerts_live_get():  # noqa: E501
    """Stream real-time geospatial alerts (WebSocket upgrade)

     # noqa: E501


    :rtype: None
    """
    return 'do some magic!'


def geo_alerts_subscribe_post(body):  # noqa: E501
    """Subscribe to specific geospatial alert types

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = AlertsSubscribeBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def satellite_imagery_get(lat, lon, zoom=None, date_range=None):  # noqa: E501
    """Access satellite imagery data

     # noqa: E501

    :param lat: 
    :type lat: float
    :param lon: 
    :type lon: float
    :param zoom: 
    :type zoom: int
    :param date_range: 
    :type date_range: str

    :rtype: None
    """
    return 'do some magic!'
