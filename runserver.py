from app.app_and_db import app, db

if __name__ == "__main__":
  app.run(port=9001, debug=True)