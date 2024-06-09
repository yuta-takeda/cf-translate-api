#!/usr/bin/env python3
import json
import datetime

def json_to_sql(filepath):
    now = datetime.datetime.now()
    sql_values = []
    with open(filepath, "r") as f:
        lines = f.readlines()
        for line in lines:
            json_line = json.loads(line)

            japanese_name = json_line["Item"]["ja"]["S"]
            english_name = json_line["Item"]["en"]["S"]

            # ' はエスケープする
            sql = f"""('{japanese_name.replace("'", "''")}', '{english_name.replace("'", "''")}', '{now}', '{now}')"""
            sql_values.append(sql)

    return sql_values

def create_insert_statement(table_name, sql_values):
    base_statement = f"INSERT INTO {table_name} (japanese_name, english_name, created_at, updated_at) VALUES "
    sql_count = len(sql_values)
    statement = ""
    result = []

    for i, sql in enumerate(sql_values):
        # 大量のデータをまとめて INSERT すると Cloudflare 側でエラーが出るので、500件づつ処理
        if (i % 500 == 0 and i != 0) or i == sql_count:
            statement += sql
            statement = base_statement + statement + ";"
            result.append(statement)
            statement = ""
        else:
            statement += f"{sql}, "

    return result

def main():
    table_names = ["artists", "groups", "series"]
    for table_name in table_names:
        sql_values = json_to_sql(f"./dynamodb/translate-{table_name}.json")
        statements = create_insert_statement(table_name, sql_values)
        with open(f"{table_name}_translated.txt", "w") as f:
            for statement in statements:
                f.write(f"{statement}\n")

main()
