import connexion
import six

from swagger_server.models.image_generation_response import ImageGenerationResponse  # noqa: E501
from swagger_server.models.images_generations_body import ImagesGenerationsBody  # noqa: E501
from swagger_server import util


def images_edits_post(image, mask, prompts, n, size):  # noqa: E501
    """Edit images based on a prompt

     # noqa: E501

    :param image: 
    :type image: strstr
    :param mask: 
    :type mask: strstr
    :param prompts: 
    :type prompts: str
    :param n: 
    :type n: int
    :param size: 
    :type size: str

    :rtype: ImageGenerationResponse
    """
    return 'do some magic!'


def images_generations_post(body):  # noqa: E501
    """Generate images from text prompts

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: ImageGenerationResponse
    """
    if connexion.request.is_json:
        body = ImagesGenerationsBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def images_variations_post(image, n, size):  # noqa: E501
    """Create variations of an existing image

     # noqa: E501

    :param image: 
    :type image: strstr
    :param n: 
    :type n: int
    :param size: 
    :type size: str

    :rtype: ImageGenerationResponse
    """
    return 'do some magic!'
