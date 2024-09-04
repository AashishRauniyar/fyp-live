import unittest


from sqlalchemy import create_engine, text

def connect_to_db():
    #postgressql is protocol field, psycopg2 is driver field, postgres is username, Aashish977$ is password, localhost is host, 5432 is port, fyp is database name
    engine = create_engine("postgresql+psycopg2://postgres:Aashish977$@localhost:5432/fyp")
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


# def delete_user(user_id):
#     statement = text("DELETE FROM users WHERE id = :user_id RETURNING id")
#     params = {"user_id": user_id}
#     result = run_query(statement, params)
#     return result.mappings().all()

class TestDatabaseMethods(unittest.TestCase):

    def test_create_user(self):
        reset_database()
        username = "test_user_1"
        password = "test_pass_1"
        user = create_user(username, password)
        self.assertEqual(user, {"id":1})


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
