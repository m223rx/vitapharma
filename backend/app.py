from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime
from dotenv import load_dotenv
import os
import psycopg2

app = Flask(__name__)
load_dotenv()
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config["JWT_ALGORITHM"] = "HS256"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=1)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)


def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        databsase="digital_minds",
        user="root",
        password=""
    )
    return conn


def save_user(first_name, last_name, email, phone_num, adress, country, role):
    con = get_db_connection()
    cur = con.cursor()
    cur.execute(
        'INSERT INTO users(first_name, last_name, email, phone_num, adress, country, role, password_hash) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)',
        (first_name, last_name, email, phone_num, adress, country, role)
    )
    con.commit()
    cur.close()
    con.close()


def find_user_by_email(email):
    con = get_db_connection()
    cur = con.cursor()
    cur.execute("SELECT * FROM users where email = %s", (email))
    user = cur.fetchone()
    cur.close()
    con.close()
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

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    if not first_name or not last_name or not phone_num or not country:
        return jsonify({"message": "First and/or last name, phone number and country are required"}), 400

    
    


    if any(user["email"] == email for user in users):
        return jsonify({"message": "User already exists"}), 400

    password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    # will be changed to save in mysql db
    save_user()

    return jsonify({"message": "User registrated succesfully"}), 201


@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    # find user
    user = next((user for user in users if user["email"] == email), None)
    if not user or not bcrypt.check_password_hash(bcrypt.generate_password_hash(user["password"]).decode("utf-8"), password):
        return jsonify({"Message": "Invalid email or password"}), 401

    # generate token
    access_token = create_access_token(identity=user["id"])
    return jsonify({"access_token": access_token}), 200


if __name__ == "__main__":
    app.run(debug=True)
