# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.transcription_response import TranscriptionResponse  # noqa: E501
from swagger_server.test import BaseTestCase


class TestAudioAIController(BaseTestCase):
    """AudioAIController integration test stubs"""

    def test_audio_transcriptions_post(self):
        """Test case for audio_transcriptions_post

        Create a transcription of an audio file
        """
        data = dict(file='file_example',
                    model='model_example',
                    prompt='prompt_example',
                    response_format='response_format_example',
                    temperature=0)
        response = self.client.open(
            '/audio/transcriptions',
            method='POST',
            data=data,
            content_type='multipart/form-data')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_audio_translations_post(self):
        """Test case for audio_translations_post

        Create a translation of an audio file
        """
        data = dict(file='file_example',
                    model='model_example',
                    prompt='prompt_example',
                    response_format='response_format_example')
        response = self.client.open(
            '/audio/translations',
            method='POST',
            data=data,
            content_type='multipart/form-data')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
