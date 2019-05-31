from flask import Flask, g
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
import models
from flask_cors import CORS

from resources.boards import boards_api
from resources.users import users_api
import config

app = Flask(__name__)
app.secret_key = config.SECRET_KEY
app.config['CORS_HEADERS'] = 'Content-Type'

login_manager = LoginManager()
login_manager.init_app(app)


@app.before_request
def before_request():
    """Connect to the database before each request"""
    g.db = models.DATABASE
    g.db.connect()

@app.after_request
def after_request(response):
    """Close the database connection after each request"""
    g.db.close()
    return response


@login_manager.user_loader
def load_user(userid):
    try:
        return models.User.get(models.User.id==userid)
    except models.DoesNotExist:
        return None


CORS(boards_api, origins=["http://localhost:3000"], supports_credentials=True)
CORS(users_api, origins= ["http://localhost:3000"], supports_credentials=True)
CORS(origins= ["http://localhost:3000"], supports_credentials=True)
CORS(origins= ["https://api.unsplash.com/search/photos"], supports_credentials=True)
app.register_blueprint(boards_api, url_prefix='/api/v1')
app.register_blueprint(users_api, url_prefix='/users')


@app.route("/logout")
@login_required
def logout():
    logout_user()

@app.route('/')
def index():
    return 'index'


if __name__ == '__main__':
    models.initialize() 
    app.run(debug=config.DEBUG, port=config.PORT)