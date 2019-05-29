# from flask_wtf import FlaskForm as Form

# from models import User

# from wtforms import Stringfield, PasswordField, TextAreaField
# from wtforms.validators import (DataRequired, Regexp, ValidationError, Email, Length, EqualTo)

# def name_exists(form, field):
#     if User.select().where(User.username == field.data).exists():
#         raise ValidationError('User with that name already exists.')

# class RegisterForm(Form):
#     username = Stringfield(
#         'Username',
#         validators = [
#             DataRequired(),
#             Regexp(
#                 r'^[a-zA-Z0-9_]+$',
#                 message=("Username should only be one word, letters, numbers, and underscores")
#             ),
#             name_exists
#         ])
    
#     password = PasswordField(
#         'Password',
#         validators=[
#             DataRequired(),
#             Length(min=2),
#             EqualTo('password2', message='Passwords must match')
#         ])

#     password2 = PasswordField(
#         'Confirm Password',
#         validators=[DataRequired()]
#     )