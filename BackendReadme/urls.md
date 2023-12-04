
This module configures the URL patters=ns in the django project.


# module to provide the admin interface 
from django.contrib import admin

path('admin/', admin.site.urls): This maps the URL path 'admin/' to the Django admin interface. Users can access the admin panel by visiting this URL.

path('api/', include('api.urls')): This includes the URL patterns defined in the 'api.urls' module under the 'api/' path. It allows for delegating specific paths to different apps or modules.

path('inventory/', include('inventory.urls')): Similarly, this includes the URL patterns defined in the 'inventory.urls' module under the 'inventory/' path.
                                                inventory contains models and serializers for the project Database 
                                                
