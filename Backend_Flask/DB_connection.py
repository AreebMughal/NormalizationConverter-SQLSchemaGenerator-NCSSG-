
# 2 attributes ikk hi ko identify krr rahe hain composite
#import libraries
import mysql.connector
from flask import Flask, render_template, request
from flask_mysqldb import MySQL
import MySQLdb.cursors
app = Flask(__name__)

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="ncssg"

)

mycursor = mydb.cursor()
@app.route('/')

@app.route('/projectreg',methods=['GET','POST'])
def projectreg():

    #
    # dic = {
    #
    #     'fds': [
    #         [{'ssn'}, {'ename'}],
    #         [{'ssn'}, {'email'}],
    #         [{'ssn'}, {'dnum'}],
    #         [{'ssn', 'dnum'}, {'dname'}],
    #         [{'dnum'}, {'dloc'}]
    #     ],
    #     'primary': ['ssn'],
    #     'multi_value': []
    # }
    # attributes = ('ssn','ename','email','dnum','dname','dloc')
    # multi = dic['multi_value']
    # primary = dic['primary']
    # for att in attributes:
    #     constraint = ""
    #     for matt in multi:
    #         if matt == att :
    #             constraint = "multi_value"
    #     for patt in primary:
    #         if patt == att :
    #             constraint = "primary"
    #     mycursor.execute("insert into attribute (att_name,rel_id,constraints)values(%s,%s,%s)",
    #                      (att, int(1), constraint))
    #
    #
    # fd = dic['fds']
    # for array in fd:
    #     att = array[1].pop()
    #     deps = array[0]
    #     for dep in deps:
    #         depend = dep
    #         mycursor.execute("insert into dependency (rel_id,att_name,fun_dep)values(%s,%s,%s)",(int(1),att,depend))
    #
    # mydb.commit()
    # mycursor.close()

    # mycursor.execute("select * from dependency")
    # D = mycursor.fetchone()[0]
    mycursor.execute("select * from dependency")
    res = mycursor.fetchall()

    dic = {}
    fds = []

    if len(res) > 0:
        for row in res:
            i=0



            fds.append([row[1], row[2]])

            i=i+1
    dic['fds']=fds
    mycursor.execute("select * from attribute")
    resprimary = mycursor.fetchall()
    primary = []
    multi=[]
    if len(resprimary)>0:
        for row in resprimary:
            if row[2] == "primary":
                primary.append(row[0])
            if row[2] == "multi_value":
                multi.append(row[0])
    dic['primary'] = primary
    dic['multi_value'] = multi






    return dic

# @app.route('/users')
# def users():
#     res = mycursor.execute("select * from dependency")
#     if res>0:
#         udata = mycursor.fetchall()
#         return render_template('users.html',userDetails = udata)

if __name__ == '__main__':
    app.run(port=5000,debug=True)