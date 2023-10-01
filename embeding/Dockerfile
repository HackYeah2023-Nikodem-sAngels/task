# Use an official Python runtime as a parent image
FROM python:3.8

# Set the working directory to /app
WORKDIR /app

# Install Jupyter Notebook and other needed packages
RUN pip install pandas openai jupyter matplotlib plotly scipy scikit-learn psycopg2 urlparse

# Copy the current directory contents into the container at /app
COPY . /app

# Expose port 8888 for Jupyter Notebook
EXPOSE 8888

# Run Jupyter Notebook
CMD ["python", "main.py"]
