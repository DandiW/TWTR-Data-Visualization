from app.app_and_db import app, db, oauth
from app.pages.models import City, Response
from datetime import datetime
from flask import jsonify, render_template, redirect, request, url_for

import requests

base_url = "https://api.twitter.com/1.1/{0}"

@app.route('/')
def index():
  return render_template('pages/home_page.html')

@app.route('/api/city/<string:city_name>/<string:trend>/<string:sentiment>')
def get_tweets(city_name, trend, sentiment):
  name = city_name.lower()
  city = City.query.filter(City.city == name).first()
  if city is None:
    return 'invalid city'
  geocode = "{0}%2C{1}%2C15mi".format(city.latitude, city.longitude)
  url = base_url.format("search/tweets.json?q=" + requests.utils.quote(trend) + requests.utils.quote(sentiment) + "&geocode=" + geocode)
  print url
  api_response = requests.get(url=url, auth=oauth).text
  return api_response

@app.route('/api/city/<string:name>')
def city(name):
  name = name.lower()
  city = City.query.filter(City.city == name).first()
  if city is None:
    return 'invalid city'
  cached_response = Response.query.filter(Response.city == name).first()
  if cached_response is not None:
    if (datetime.now() - cached_response.time).total_seconds() < (60*25):
      return str(cached_response.response)
    else:
      db.delete(cached_response)
  print "hi"
  url = base_url.format("trends/place.json?id=" + city.woeid)
  api_response = requests.get(url=url, auth=oauth).text
  response = Response(time=datetime.now(), city=name, response=str(api_response))
  db.add(response)
  db.commit()
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