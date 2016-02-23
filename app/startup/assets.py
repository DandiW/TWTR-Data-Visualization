from flask.ext.assets import Bundle, Environment

from app.app_and_db import app, webassets

js_libs = Bundle("js/jquery.min.js",
                "js/bootstrap.min.js",
                "js/d3.js",
                "js/foundation.min.js",
                "js/knockout.js",
                "js/what-input.min.js",
                 output="js/libs.js")

js_main = Bundle("js/main.js",
                 filters="jsmin",
                 output="js/main.js")

css_libs = Bundle("css/bootstrap.css",
                  "css/font-awesome.css",
                  "css/foundation.min.css",
                  output="css/libs.css")

css_main = Bundle("css/main.css",
                  output="css/styles.css"
                  )

webassets.manifest = 'cache' if not app.config['DEBUG'] else False
webassets.cache = not app.config['DEBUG']
webassets.debug = "merge" if app.config['DEBUG'] == True else False

webassets.register('js_libs', js_libs)
webassets.register('css_libs', css_libs)

webassets.register('js_main', js_main)
webassets.register('css_main', css_main)

