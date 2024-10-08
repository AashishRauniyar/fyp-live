import unittest


from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def connect_to_db():
    # Use environment variables for DB credentials
    db_url = f"postgresql+psycopg2://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    engine = create_engine(db_url)
    return engine

def run_query(stmt,params):
    engine = connect_to_db()
    with engine.connect() as conn:
        result = conn.execute(stmt,params)
        conn.commit()
        conn.close()
        return result

def reset_database():
    with open("..\\db\\init.sql") as file:
        stmt = text(file.read())
        # if this fails, it is okay to crash, we don't want a try..except
        run_query(stmt, {})
    return

def create_user(username, password):
    statement = text("INSERT INTO users (username, password) VALUES (:username, :password) RETURNING id")
    params = {"username": username, "password": password}
    result = run_query(statement, params)
    return result.mappings().all()[0]


def get_user(id):
    stmt = text("select id, username from users where id=:id")
    params = {"id": id}
    try:
        result = run_query(stmt, params)
    except:
        raise
    result = result.mappings().all()
    return {} if len(result) == 0 else result[0]



def get_users():
    stmt = text("select id, username from users")
    params = {}
    result = run_query(stmt, params)
    return result.mappings().all()

def delete_user(user_id):
    statement = text("DELETE FROM users WHERE id = :user_id RETURNING id")
    params = {"user_id": user_id}
    result = run_query(statement, params)
    return result.mappings().all()

def update_user(user_id, username, password):
    statement = text("UPDATE users SET username = :username, password = :password WHERE id = :user_id RETURNING id")
    params = {"user_id": user_id, "username": username, "password": password}
    result = run_query(statement, params)
    return result.mappings().all()

class TestDatabaseMethods(unittest.TestCase):

    def test_create_user(self):
        reset_database()
        username = "test_user_1"
        password = "test_pass_1"
        user = create_user(username, password)
        self.assertEqual(user, {"id":1})


    def test_select_user(self):
        reset_database()
        username = "test_user_1"
        password = "test_pass_1"
        user = create_user(username, password)
        self.assertEqual(user, {"id":1})

        selected_user = get_user(user["id"])
        self.assertEqual(selected_user, {"id":1, "username":username})

    # def test_delete_user(self):
    #     reset_database()
    #     username = "test_user_1"
    #     password = "test_pass_1"
    #     user = create_user(username, password)
    #     self.assertEqual(user, {"id": 1})

    #     deleted_user = delete_user(user["id"])
    #     self.assertEqual(deleted_user, [{"id": 1}])

    #     # Verify that the user is no longer in the database
    #     statement = text("SELECT id FROM users WHERE id = :user_id")
    #     params = {"user_id": user["id"]}
    #     result = run_query(statement, params)
    #     self.assertEqual(result.mappings().all(), [])


if __name__ == "__main__":
    unittest.main()
