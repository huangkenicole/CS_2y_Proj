


import os
import json
import psycopg2

# Connect to your PostgreSQL database
# conn = psycopg2.connect("dbname=pubmed_test user=admin password=admin123.")
conn = psycopg2.connect(
    host="localhost",
    database="pubmed_test",
    user="admin",
    password="Admin123."
)

cur = conn.cursor() # 游标对象用于执行SQL查询和操作数据库。创建一个游标对象

# Path to the test folder
folder_path = '/depression'

count = 0
# List all JSON files in the folder
for file_name in os.listdir(folder_path):
    if file_name.endswith('.json'):
        file_path = os.path.join(folder_path, file_name)

        # Read the JSON file
        with open(file_path, 'r') as file:
            data = json.load(file)

            # Insert data into the table 使用游标对象执行SQL查询
            cur.execute("INSERT INTO test1 (data) VALUES (%s)", [json.dumps(data)])
            # 注意这里是吧json-字符串保存的
            count += 1

print(f"Success Number: {count}")
# Commit the changes and close the connection 记得关闭游标和连接以释放资源：
conn.commit() # 提交更改到数据库

# conn.commit() 需要在你完成对数据库的修改操作后调用。通常情况下，当你执行诸如插入、更新、删除等会修改数据库数据的操作时
# PostgreSQL（pgsql）默认情况下是不自动提交事务的，它使用隐式事务模式。这意味着当你执行一个SQL查询时，它将创建一个事务，但不会自动提交该事务，除非你显式地调用 commit() 方法来提交事务。
cur.close()
conn.close()
