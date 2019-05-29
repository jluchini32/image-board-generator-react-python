# from flask import jsonify, Blueprint
# from flask_restful import (Resource, Api, reqparse, fields, marshal,
#                                marshal_with, url_for)


# import models

# board_fields = {
#     'id': fields.Integer,
#     'title': fields.String,
#     'description': fields.String
# }

# class ImageList(Resource):
#     def __init__(self):
#         self.reqparse = reqparse.RequestParser()

#         self.reqparse.add_argument(
#             'image_url',
#             required=False,
#             help='No url provided',
#             location=['form', 'json']
#             )

#         super().__init__()

# class Image(Resource):
#     def __init__(self):
#         self.reqparse = reqparse.RequestParser()

#         self.reqparse.add_argument(
#             'image_url',
#             required=False,
#             help='No url provided',
#             location=['form', 'json']
#             )

#         super().__init__()

# images_api = Blueprint('resources.images', __name__)

# api = Api(images_api)
# api.add_resource(
#     ImageList,
#     '/images',
# )

# api.add_resource(
#     Image,
#     '/images/<int:id>'
# )