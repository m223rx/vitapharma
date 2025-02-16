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


load_dotenv()
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config["JWT_ALGORITHM"] = "HS256"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=1)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)


def verify_phone_number_country(phone_number, country_code):
    try:
        # Parse the phone number
        parsed_number = phonenumbers.parse(phone_number, country_code)

        # Check if the number is valid
        if not phonenumbers.is_valid_number(parsed_number):
            return False, "Invalid phone number"

        # Get the region (country) of the phone number
        region = geocoder.description_for_number(parsed_number, "en")

        # Check if the region matches the expected country
        if region.lower() == country_code.lower():
            return True, f"The phone number is from {region}"
        else:
            return False, f"The phone number is not from {country_code}. It is from {region}"

    except phonenumbers.phonenumberutil.NumberParseException as e:
        return False, f"Error parsing phone number: {e}"


def get_db_connection():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="digital_minds"
    )
    return db


def save_user(first_name, last_name, email, phone_num, adress, country, role, password):
    db = get_db_connection()
    cur = db.cursor()
    cur.execute(
        'INSERT INTO users(first_name, last_name, email, phone_num, adress, country, role, password_hash) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)',
        (first_name, last_name, email, phone_num, adress, country, role, password)
    )
    db.commit()
    cur.close()
    db.close()


def get_all_users():
    db = get_db_connection()
    cur = db.cursor(dictionary=True)
    cur.execute("SELECT * FROM users")
    users = cur.fetchall()
    cur.close()
    db.close()
    return users


def find_user_by_email(email):
    db = get_db_connection()
    cur = db.cursor()
    cur.execute("SELECT * FROM users where email = %s", (email))
    user = cur.fetchone()
    cur.close()
    db.close()
    return user


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    phone_num = data.get("phone_num")
    adress = data.get("adress")
    country = data.get("country")
    role = data.get("role", "user")
    users = get_all_users()

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    if not first_name or not last_name or not phone_num or not country:
        return jsonify({"message": "First and/or last name, phone number and country are required"}), 400

    if any(user["email"] == email for user in users):
        return jsonify({"message": "User already exists"}), 400

    b, msg = verify_phone_number_country(phone_num, country)
    if not b:
        return jsonify({"message": msg}), 400

    password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    # will be changed to save in mysql db
    save_user(first_name, last_name, email, phone_num, adress, country, role, password_hash)

    return jsonify({"message": "User registrated succesfully"}), 201


@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    users = get_all_users()
    print(users)
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    # find user
    user = next((user for user in users if user["email"] == email), None)
    if not user or not bcrypt.check_password_hash(user["password_hash"],password):
        return jsonify({"Message": "Invalid email or password"}), 401

    # generate token
    access_token = create_access_token(identity=user["id"])
    return jsonify({"access_token": access_token}), 200


if __name__ == "__main__":
    app.run(debug=True)
