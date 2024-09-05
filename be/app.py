from flask import Flask, request, jsonify
import db  # Assuming db.py handles the actual database operations

def create_app():
    app = Flask(__name__)

    def success(data):
        return {"status": "success", "data": data}

    def failure(reason):
        return {"status": "failure", "data": reason}

    @app.route("/users", methods=["POST"])
    def create_user():
        data = request.get_json()
        if "username" not in data or "password" not in data:
            return jsonify(failure("Missing required field")), 400
        
        try:
            username = data["username"]
            password = data["password"]
            result = db.create_user(username, password)  
            return success(dict(result))
        except Exception as e:
            return jsonify(failure(str(e))), 400  
    
    @app.route("/users/<id>", methods=["GET"])
    def get_users_id(id):
        result = db.get_user(id)
        if len(result) == 0:
            return failure("user not found")  
        else:
            return success(dict(result))

    @app.route("/users/<id>", methods=["DELETE"])
    def delete_user_route(id):
        result = db.delete_user(id)  # Call the delete function
        
        if not result:  # Check if the result is empty
            return failure("user not found"), 404  # Return 404 if no user was found
        else:
            return success(f"User {id} deleted")  # Confirm the deletion

    @app.route("/users", methods=["GET"])
    def get_users():
        result = db.get_users()
        if len(result) == 0:
            return failure("users not registered")
        else:
            result = [dict(v) for v in result]
            return success(result)
    
    

    return app  

if __name__ == "__main__":
    app = create_app()  # Call create_app to get the Flask app instance
    app.run(debug=True)
