Hi guys! 
To install the requirements:

**To run:**
cd wahoowallet-backend

pip install -r requirements.txt

**To start the django project:**
To start, run this:
python -m venv env

Then run one of these, depending on what OS you are using:
.\env\Scripts\activate --If you have windows
source env/bin/activate --If you have Mac or Linux

Note: the env should be held locally instead of in the repo, so you will have to run that everytime.

then following that, and everytime you want to to start the server:
python manage.py runserver

Common Issues:
If you try running the server, and it says you dont have django installed run this:
pip install django

Create an admin account:
type into terminal:
python manage.py createsuperuser

once created, and the servers running go to: 
http://127.0.0.1:8000/admin
and log into using the super user you made

follow the steps, and let me know if you guys do make an admin account