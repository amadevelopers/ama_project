Most of the code here is stock .

Changes made :

Added some necessary apps and userdefined app under INSTALLED APPS :     
    
    'rest_framework',
    'corsheaders',
    'api',
    'inventory'

rest_framework: Integrates the Django Rest Framework, which is a powerful and flexible toolkit for building Web APIs.

corsheaders: Enables Cross-Origin Resource Sharing (CORS) support, allowing the project to make requests to and receive requests from different domains.

api: This is a custom Django app/module. It  contains API-related functionality, such as views, serializers, and URL configurations.

inventory: Another custom Django app/module, handling features related to inventory management.
