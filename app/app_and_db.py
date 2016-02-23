from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask.ext.assets import Environment
from requests_oauthlib import OAuth1

app = Flask(__name__)

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('sqlite:///twtr.db', convert_unicode=True)
db = scoped_session(sessionmaker(bind=engine))
Base = declarative_base()
Base.query = db.query_property()

def init_db():
  import app.pages.models
  Base.metadata.create_all(bind=engine)

webassets = Environment(app)

oauth = OAuth1('JPQeKnVF4W1LShbqC1Qi9Z7Lv', 'ShX9GzZHnkl8AtaFZLyzSLJox0VJ2knHto2zzAWcKmNKCL3ADC', '22848425-1eiJRI7Lmvy2ubHFlIkkomYWSNKzBu4UMljT8GJyJ', '6LO9ZMPWWHgPA30kJpZZuzb2RP8WBQj3cF6ZowYh02MJj')
from app.startup import assets
from app.pages import views