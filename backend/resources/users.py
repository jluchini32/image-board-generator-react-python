import json

from flask import Flask, jsonify, Blueprint, abort, make_response, redirect

from flask_restful import (Resource, Api, reqparse,
                               inputs, fields, marshal,
                               marshal_with, url_for)

from flask_login import login_user, logout_user, login_required, current_user
from flask_cors import CORS
from flask_bcrypt import check_password_hash
import models

user_fields = {
    'username': fields.String,
    'password': fields.String
}


class UserList(Resource):
    def __init__(self):
        print('this is hitting')
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            'username',
            required=True,
            help='No username provided',
            location=['form', 'json']
        )
        self.reqparse.add_argument(
            'password',
            required=True,
            help='No password provided',
            location=['form', 'json']
        )

        super().__init__()

    def get(self):
        all_users = [marshal(user, user_fields) for user in models.User.select()]
        return all_users

    def post(self):
        args = self.reqparse.parse_args()
        # if args['password'] == args['verify_password']:
        print(args, ' this is args')
        user = models.User.create_user(**args)
        print(user, ' user stuff')
        login_user(user)

        return marshal(user, user_fields), 201
        return make_response(
            json.dumps({
                'error': 'Password and password verification do not match'
            }), 400)


class User(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            'username',
            required=True,
            help='No username provided',
            location=['form', 'json']
        )
        self.reqparse.add_argument(
            'password',
            required=True,
            help='No password provided',
            location=['form', 'json']
        )

        super().__init__()



    @marshal_with(user_fields)
    def put(self, id):
        args = self.reqparse.parse_args()
        query = models.User.update(**args).where(models.User.id==id)
        query.execute()
        print(query)
        return (models.User.get(models.User.id==id),201)

    @marshal_with(user_fields)
    def get(self, id):
        try:
            user = models.User.get(models.User.id==id)
        except models.User.DoesNotExist:
            abort(404)
        else:
            return (user, 200)

    def delete(self, id):
        query = models.User.delete().where(models.User.id ==id )
        query.execute()
       

class Login(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            'username',
            required=True,
            help='No username provided',
            location=['form', 'json']
        )
        self.reqparse.add_argument(
            'password',
            required=True,
            help='No password provided',
            location=['form', 'json']
        )

        super().__init__()

    @marshal_with(user_fields)
    def post(self):
        print('this is hitting here')
        args = self.reqparse.parse_args()
        try:
            user = models.User.get(models.User.username == args.username)
        except models.DoesNotExist:
            flash('your email or password do not match', 'error')
        else:
            if check_password_hash(user.password, args.password):
                login_user(user)
                return redirect(url_for('index'))
            else:
                flash('your email or password do not match')

users_api = Blueprint('resources.users', __name__)
api = Api(users_api)

api.add_resource(
    UserList,
    '/registration',
    endpoint='users'
)
api.add_resource(
    User,
    '/<int:id>'
)

api.add_resource(
    Login,
    '/login'
)