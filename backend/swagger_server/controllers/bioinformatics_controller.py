import connexion
import six

from swagger_server.models.bio_coursealignment_body import BioCoursealignmentBody  # noqa: E501
from swagger_server.models.bio_publicationforecast_body import BioPublicationforecastBody  # noqa: E501
from swagger_server.models.bio_softwarecompetencyanalysis_body import BioSoftwarecompetencyanalysisBody  # noqa: E501
from swagger_server import util


def bio_course_alignment_post(body):  # noqa: E501
    """Align bioinformatics course content with curriculum standards

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = BioCoursealignmentBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def bio_publication_forecast_post(body):  # noqa: E501
    """Forecast trends in bioinformatics academic publications

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = BioPublicationforecastBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def bio_software_competency_analysis_post(body):  # noqa: E501
    """Analyze student proficiency in bioinformatics software

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = BioSoftwarecompetencyanalysisBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
