from app.app_and_db import app, db
from app.pages.models import City, Response
from datetime import datetime
from flask import jsonify, render_template, redirect, request, url_for

import twitter

@app.route('/')
def index():
  return render_template('pages/home_page.html')

@app.route('/api/city/<string:name>')
def city(name):
  name = name.lower()
  city = City.query.filter(City.city == name).first()
  if city is None:
    return 'invalid city'
  cached_response = Response.query.filter(Response.city == name).first()
  if cached_response is not None:
    return str(cached_response.response)

  #These are private access tokens for my personal account. Please keep them secret.
  api = twitter.Api(consumer_key='JPQeKnVF4W1LShbqC1Qi9Z7Lv',
                      consumer_secret='ShX9GzZHnkl8AtaFZLyzSLJox0VJ2knHto2zzAWcKmNKCL3ADC',
                      access_token_key='22848425-1eiJRI7Lmvy2ubHFlIkkomYWSNKzBu4UMljT8GJyJ',
                      access_token_secret='6LO9ZMPWWHgPA30kJpZZuzb2RP8WBQj3cF6ZowYh02MJj')
  api_response = api.GetTrendsWoeid(city.woeid)
  response = Response(time=datetime.now(), city=name, response=str(api_response))
  db.add(response)
  db.commit()
  #save response
  return str(response.response)

@app.route('/api/cities')
def cities():
  cities = City.query.all()
  response = []
  for city in cities:
    response.append(str(city))
  return str(response)

@app.teardown_appcontext
def shutdown_session(exception=None):
  db.remove()