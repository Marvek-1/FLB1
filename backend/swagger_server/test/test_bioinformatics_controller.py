# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.bio_coursealignment_body import BioCoursealignmentBody  # noqa: E501
from swagger_server.models.bio_publicationforecast_body import BioPublicationforecastBody  # noqa: E501
from swagger_server.models.bio_softwarecompetencyanalysis_body import BioSoftwarecompetencyanalysisBody  # noqa: E501
from swagger_server.test import BaseTestCase


class TestBioinformaticsController(BaseTestCase):
    """BioinformaticsController integration test stubs"""

    def test_bio_course_alignment_post(self):
        """Test case for bio_course_alignment_post

        Align bioinformatics course content with curriculum standards
        """
        body = BioCoursealignmentBody()
        response = self.client.open(
            '/bio/course-alignment',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_bio_publication_forecast_post(self):
        """Test case for bio_publication_forecast_post

        Forecast trends in bioinformatics academic publications
        """
        body = BioPublicationforecastBody()
        response = self.client.open(
            '/bio/publication-forecast',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_bio_software_competency_analysis_post(self):
        """Test case for bio_software_competency_analysis_post

        Analyze student proficiency in bioinformatics software
        """
        body = BioSoftwarecompetencyanalysisBody()
        response = self.client.open(
            '/bio/software-competency-analysis',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
