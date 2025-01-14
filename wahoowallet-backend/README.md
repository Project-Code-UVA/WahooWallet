Hi guys! 
To install the requirements:

**To run:**
cd wahoowallet-backend

pip install -r requirements.txt

**To start the django project:**
To start, run this:
python -m venv env

Then run one of these, depending on what OS you are using:
.\venv\Scripts\activate --If you have windows
source venv/bin/activate --If you have Mac or Linux

Note: the env should be held locally instead of in the repo, so you will have to run that everytime.

For the first time you run it, run this:
django-admin startproject backend .

then following that, and everytime you want to to start the server:
python manage.py runserver

Common Issues:
If you try running the server, and it says you dont have django installed run this:
pip install django