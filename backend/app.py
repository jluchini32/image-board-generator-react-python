from flask import Flask, g
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
import models
from flask_cors import CORS
from flask_bcrypt import check_password_hash

from resources.boards import boards_api
from resources.users import users_api
# from resources.images import images_api
import config

app = Flask(__name__)
app.secret_key = config.SECRET_KEY

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
# CORS(images_api, origins= ["http://localhost:3000"], supports_credentials=True)
app.register_blueprint(boards_api, url_prefix='/api/v1')
app.register_blueprint(users_api, url_prefix='/users')
# app.register_blueprint(images_api, url_prefix='/images')


@app.route('/')
def index():
    return 'index'

# @app.route('/register', methods=('GET', 'POST'))
# def register():
#     form = forms.RegisterForm()
#     if form.validate_on_submit():
#         flash('Congratulations! You registered', 'success')
#         models.User.create_user(
#             username=form.username.data,
#             password=form.password.data
#             )

#         return redirect(url_for('index'))
#     return render_template('register.html', form=form)


if __name__ == '__main__':
    models.initialize() 
    app.run(debug=config.DEBUG, port=config.PORT)