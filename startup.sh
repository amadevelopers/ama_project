#!/bin/bash

if [ ! -d "amaenv" ]; then
    python3 -m venv amaenv
fi

source amaenv/bin/activate

pip install -r requirements.txt

# Check if port 8000 is in use
is_port_in_use() {
    nc -z 127.0.0.1 8000
    return $?
}

# Function to find an available random port
find_random_port() {
    local random_port
    while true; do
        random_port=$((RANDOM % 10000 + 10000))  # Choose a random port between 10000 and 20000
        is_port_in_use $random_port || break
    done
    echo $random_port
}

echo "Where do you want to deploy?"
echo "1. localhost"
echo "2. local IP"

read -p "Enter the option number: " deployment_option

start_django() {
    case $1 in
        1)
            if is_port_in_use; then
                read -p "Port 8000 is already in use. Do you want to kill the process and start on 8000? (Y/N): " kill_option
                if [ "$kill_option" == "Y" ] || [ "$kill_option" == "y" ]; then
                    fuser -k 8000/tcp
                    python3 manage.py runserver
                else
                    PORT=$(find_random_port)
                    echo "Starting Django on port $PORT."
                    python3 manage.py runserver 0.0.0.0:$PORT
                fi
            else
                python3 manage.py runserver
            fi
            ;;
        2)
            if is_port_in_use; then
                read -p "Port 8000 is already in use. Do you want to kill the process and start on 8000? (Y/N): " kill_option
                if [ "$kill_option" == "Y" ] || [ "$kill_option" == "y" ]; then
                    fuser -k 8000/tcp
                    python3 manage.py runserver 0.0.0.0:8000
                else
                    PORT=$(find_random_port)
                    echo "Starting Django on port $PORT."
                    python3 manage.py runserver 0.0.0.0:$PORT
                fi
            else
                python3 manage.py runserver 0.0.0.0:8000
            fi
            ;;
        *)
            echo "Invalid option. Starting Django locally."
            python3 manage.py runserver
            ;;
    esac
}

start_django $deployment_option
