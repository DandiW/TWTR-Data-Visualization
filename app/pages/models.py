from app.app_and_db import Base, db
from sqlalchemy import Column, Integer, String, TIMESTAMP

class Response(Base):
  __tablename__ = 'responses'
  id = Column(Integer, primary_key=True)
  time = Column(TIMESTAMP())
  city = Column(String(120))

  response = Column(String(100000))

class City(Base):
  __tablename__ = 'cities'
  id = Column(Integer, primary_key=True)
  city = Column(String(120))
  woeid = Column(String(10))
  longitude = Column(String(20))
  latitude = Column(String(20))

  def __str__(self):
    return self.city