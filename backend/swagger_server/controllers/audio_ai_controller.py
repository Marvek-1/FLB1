import connexion
import six

from swagger_server.models.transcription_response import TranscriptionResponse  # noqa: E501
from swagger_server import util


def audio_transcriptions_post(file, model, prompt, response_format, temperature):  # noqa: E501
    """Create a transcription of an audio file

     # noqa: E501

    :param file: 
    :type file: strstr
    :param model: 
    :type model: str
    :param prompt: 
    :type prompt: str
    :param response_format: 
    :type response_format: str
    :param temperature: 
    :type temperature: float

    :rtype: TranscriptionResponse
    """
    return 'do some magic!'


def audio_translations_post(file, model, prompt, response_format):  # noqa: E501
    """Create a translation of an audio file

     # noqa: E501

    :param file: 
    :type file: strstr
    :param model: 
    :type model: str
    :param prompt: 
    :type prompt: str
    :param response_format: 
    :type response_format: str

    :rtype: TranscriptionResponse
    """
    return 'do some magic!'
