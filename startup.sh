#!/bin/bash

cd ama_project
source amaenv/bin/activate 
python3 manage.py runserver 0.0.0.0:8000
