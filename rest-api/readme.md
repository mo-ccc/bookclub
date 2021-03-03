<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
This is where the flask api resides. The api - built in python - interfaces with an sql database.

## Getting Started
### Prerequisites
- python3
- python3-pip
- python3-venv
- postgresql
- s3 bucket

### Installation
The app makes use of the venv pip package to create a virtual environment. Therefore the package will need to be installed in order to run the app. Thereafter the install instructions are as below (Linux Only):

Clone the repo `git clone github.com/mo-ccc/bookclub.git`
Change Directory into the rest-api src folder `cd bookclub/rest-api/src`
Make sure venv is installed then run: `sudo apt-get install python3-venv`
Create the virtual environment: `python3 -m venv venv`
Activate the virtual environment: `source venv/bin/activate`
Update pip: `pip install --upgrade pip`
Install the dependencies from requirments.txt: `pip install -r requirements.txt`
Edit the .env file
upgrade the connected database with: `flask db upgrade`
export the FLASK_APP environment variable to main.py: `export FLASK_APP=main.py`
export the FLASK_ENV environment variable to production: `export FLASK_ENV=production`
run gunicorn on the port of your choice: `gunicorn -b 0.0.0.0:{port} "main:create_app"`
Note: It is recommended to setup the web server with https to secure session cookies. See nginx.