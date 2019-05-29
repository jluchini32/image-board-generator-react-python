from flask import jsonify, Blueprint
from flask_restful import (Resource, Api, reqparse, fields, marshal,
                               marshal_with, url_for)


import models

board_fields = {
    # 'id': fields.Integer,
    'title': fields.String,
    'description': fields.String
}

class BoardList(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

        self.reqparse.add_argument(
            'title',
            required=True,
            help='No title provided',
            location=['form', 'json']
            )

        self.reqparse.add_argument(
            'description',
            required=False,
            help='No description provided',
            location=['form', 'json']
            )

        super().__init__()

    def getBoards(self):
        all_boards = [marshal(board, board_fields) for board in models.Board.select()]
        return all_boards

    @marshal_with(board_fields)
    def post(self):
        args = self.reqparse.parse_args()
        print(args, ' <----- args(req.body')
        board = models.Board.create(**args)
        print(board, ' <--- board', type(board))

        return (board, 201)

# class Board(Resource):
#     def __init__(self):
#         self.reqparse = reqparse.RequestParser()

#         self.reqparse.add_argument(
#             'title',
#             required=True,
#             help='No title provided',
#             location=['form', 'json']
#             )

#         self.reqparse.add_argument(
#             'description',
#             required=False,
#             help='No description provided',
#             location=['form', 'json']
#             )

#         super().__init__()

# # maybe working just no boards exist?
#     @marshal_with(board_fields)
#     def get(self, id):
#         try:
#             board = models.Board.get(models.Board.id==id)
#         except models.Board.DoesNotExist:
#             about(404)
#         else:
#             return (board, 200)
        
#         return jsonify({'title': 'Joes Board'})

#     @marshal_with(board_fields)
#     def post(self):
#         args = self.reqparse.parse_args()
#         print(args, ' this is args')
#         board = models.Board.create(**args)
#         print(board, ' this is a board')

#         return marshal(board, board_fields, 201)


#     # @marshal_with(board_fields)
#     # def put(self, id):
#     #     #parse the args (get req.body)
#     #     args = self.reqparse.parse_args() 
#     #     query = models.Board.update(**args).where(models.Board.id==id)
#     #     #we have execute the query
#     #     query.execute()
#     #     print(query, "<---this is query")
#     #     #the query doesnt respond with the update object
#     #     return (models.Board.get(models.Board.id==id), 200)

#     # def delete(self, id):
#     #     query = models.Board.delete().where(models.Board.id ==id )
#     #     query.execute()
#     #     return jsonify({'title': 'Joes Board'})



boards_api = Blueprint('resources.boards', __name__)

api = Api(boards_api)
api.add_resource(
    BoardList,
    '/boards',
)

# api.add_resource(
#     Board,
#     '/boards/<int:id>'
# )