# CSbackend/Dockerfile

# Use the official Python image as the base image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Install system dependencies and clean up the cache to reduce image size
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy only the requirements file to leverage Docker cache
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the Django project into the Docker image
COPY . /app/

# Run Django migrations, collect static files, and start the server
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn CSbackend.wsgi:application --bind 0.0.0.0:8000"]

# Optional: Add a health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost:8000/health || exit 1
