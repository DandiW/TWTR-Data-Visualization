from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask.ext.assets import Environment

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

from app.startup import assets
from app.pages import views