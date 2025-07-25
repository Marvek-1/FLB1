# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.image_generation_response import ImageGenerationResponse  # noqa: E501
from swagger_server.models.images_generations_body import ImagesGenerationsBody  # noqa: E501
from swagger_server.test import BaseTestCase


class TestImageAIController(BaseTestCase):
    """ImageAIController integration test stubs"""

    def test_images_edits_post(self):
        """Test case for images_edits_post

        Edit images based on a prompt
        """
        data = dict(image='image_example',
                    mask='mask_example',
                    prompts='prompts_example',
                    n=56,
                    size='size_example')
        response = self.client.open(
            '/images/edits',
            method='POST',
            data=data,
            content_type='multipart/form-data')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_images_generations_post(self):
        """Test case for images_generations_post

        Generate images from text prompts
        """
        body = ImagesGenerationsBody()
        response = self.client.open(
            '/images/generations',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_images_variations_post(self):
        """Test case for images_variations_post

        Create variations of an existing image
        """
        data = dict(image='image_example',
                    n=56,
                    size='size_example')
        response = self.client.open(
            '/images/variations',
            method='POST',
            data=data,
            content_type='multipart/form-data')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
