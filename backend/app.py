from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime
from dotenv import load_dotenv
import os
import mysql.connector
import phonenumbers
from phonenumbers import geocoder, carrier


app = Flask(__name__)
