from peewee import *

from flask_login import UserMixin
from flask_bcrypt import generate_password_hash

DATABASE = SqliteDatabase('imageboardcreator.db')

class User(UserMixin, Model):
    username = CharField(unique=True)
    password = CharField(max_length=100)
    is_admin = BooleanField(default=False)
    
    class Meta:
        database = DATABASE
        
    @classmethod
    def create_user(cls, username, password, **kwargs):
        try:
            cls.select().where(
                (cls.username==username)
            ).get()
        except cls.DoesNotExist:
            user = cls(username=username)
            user.password = generate_password_hash(password)
            user.save()
            return user
        else:
            raise Exception('that user already exists')

class Board(Model):
    title = CharField()
    description = CharField()
    # images: []

    class Meta:
        database = DATABASE


# class Images(Model):
#     image_url = CharField()

#     class Meta:
#         database = DATABASE











def initialize():
    DATABASE.connect()
    DATABASE.create_tables([User, Board], safe=True)
    DATABASE.close()