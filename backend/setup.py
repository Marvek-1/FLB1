# coding: utf-8

import sys
from setuptools import setup, find_packages

NAME = "swagger_server"
VERSION = "1.0.0"
# To install the library, run the following
#
# python setup.py install
#
# prerequisite: setuptools
# http://pypi.python.org/pypi/setuptools

REQUIRES = [
    "connexion",
    "swagger-ui-bundle>=0.0.2"
]

setup(
    name=NAME,
    version=VERSION,
    description="MoStar AI API - [Overlord Version]",
    author_email="",
    url="",
    keywords=["Swagger", "MoStar AI API - [Overlord Version]"],
    install_requires=REQUIRES,
    packages=find_packages(),
    package_data={'': ['swagger/swagger.yaml']},
    include_package_data=True,
    entry_points={
        'console_scripts': ['swagger_server=swagger_server.__main__:main']},
    long_description="""\
    This is the full consolidated API specification for MoStar AI. It includes: - Core persona and assistant endpoints - Federated learning stack - Neuro-symbolic reasoning - Satellite observation - Cybersecurity intelligence - Bioinformatics support - Geospatial alert broadcasting - Oracle-based predictive insight - Dashboard UI scaffolds - Enhanced security and compliance features - Memory and personalization systems - Real-time integrations and webhooks  --- ## IMPLEMENTED FEATURES - Satellite and geospatial alert systems - Bioinformatics visualization - Federated node registration and training submission - Symbolic hypothesis validation - AI assistant interactions via text and image - Feedback loop via roadmap submissions - Pilot testing for Lassa fever interventions - Text generation and image synthesis/completion endpoints - Multi-modal AI capabilities (text, image, audio) - Advanced security and surveillance systems - Integration with major mapping and logistics providers  --- ## ENHANCED CAPABILITIES 🔐 Security &amp; Compliance: Audit trails, session management, fine-grained permissions 🧠 Memory &amp; Personalization: Persistent context, persona chaining, Genesis Memory Ledger 🛰️ Geospatial Intelligence: Real-time satellite data, predictive analytics 📊 Federated Learning: Distributed training, blockchain-style ledgering 🧬 Bioinformatics: Gene analysis, protein structure, epidemic forecasting ⚙️ Symbolic Logic: Theorem validation, multi-hop reasoning chains 🔄 Real-Time UI: Dynamic dashboards, live feedback loops 
    """
)
