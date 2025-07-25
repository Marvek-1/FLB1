import connexion
import six

from swagger_server.models.dashboard_layout import DashboardLayout  # noqa: E501
from swagger_server.models.dashboard_state_body import DashboardStateBody  # noqa: E501
from swagger_server import util


def dashboard_client_mock_get():  # noqa: E501
    """Return mock dashboard layout

     # noqa: E501


    :rtype: DashboardLayout
    """
    return 'do some magic!'


def dashboard_state_get():  # noqa: E501
    """Get current dashboard state

     # noqa: E501


    :rtype: None
    """
    return 'do some magic!'


def dashboard_state_post(body):  # noqa: E501
    """Update dashboard state

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = DashboardStateBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
