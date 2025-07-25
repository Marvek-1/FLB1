import connexion
from flask import Flask
from flask_cors import CORS
from swagger_server import encoder
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app():
    """Create and configure the Flask app"""
    app = connexion.App(
        __name__, 
        specification_dir='./swagger/',
        arguments={'title': 'MoStar AI API - [Overlord Version]'}
    )
    
    # Add API definition
    app.add_api(
        'swagger.yaml',
        arguments={'title': 'MoStar Consolidated API'},
        pythonic_params=True
    )
    
    # Configure JSON encoder
    app.app.json_encoder = encoder.JSONEncoder
    
    # Enable CORS
    CORS(app.app)
    
    # Add configuration from environment
    app.app.config.update({
        'SECRET_KEY': os.getenv('SECRET_KEY', 'default_secret_key'),
        'API_VERSION': '1.0.0',
        'DEBUG': os.getenv('DEBUG_MODE', 'False') == 'True'
    })
    
    return app

if __name__ == '__main__':
    # Create and run the application
    app = create_app()
    
    # Get port from environment or default to 8080
    port = int(os.getenv('PORT', 8080))
    
    # Run in development mode with hot reload
    app.run(
        host='0.0.0.0', 
        port=port, 
        debug=True,
        use_reloader=True
    )
