import json
import sys
import traceback
import os

from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import send_file

from Fd_Miner import FdsMiner
from source.DrawingImage.rel_map_1nf import RelationalMapping1nf
from source.DrawingImage.rel_map_2nf import RelationalMapping2nf
from source.DrawingImage.rel_map_3nf import RelationalMapping3nf
from source.DrawingImage.rel_map_bcnf import RelationalMappingBcnf
from source.DrawingImage.relationalMapping import RelationalMapping
from source.NF_1 import Nf1st
from source.NF_2 import Nf2nd
from source.NF_3 import Nf3rd
from source.BCNF import BcNf
from source.Relation import Relation
from source.Sql_Form_Methods import *
from source.normalizedRelation import NormalizedRelation
from source.Sql_Form_Methods import *
from source.SqlScript import SqlScript
from os.path import exists

app = Flask(__name__)
CORS(app)


def Find_CK(minimal_cover):
    L_H_S = []
    R_H_S = []

    for each_FD in minimal_cover:
        counter = 0
        for each_side in each_FD:
            if counter % 2 == 0:
                for i in each_side:
                    L_H_S.append(i)
            else:
                R_H_S.append(each_side[0])
            counter += 1
    CK = []
    for i in L_H_S:
        if i in R_H_S:
            pass
        else:
            CK.append(i)
    CK = set(CK)
    return CK, L_H_S, R_H_S


def primaryKeyCheck(pk, fds):
    result = {}
    fdNonPK = []
    # fdPK = []
    countPrimary = 0
    countNonPrimary = 0
    print("fds  ", fds)
    for fd in fds:
        lhs = set(fd[0])
        if lhs.issubset(pk):

            countPrimary += 1
        else:
            countNonPrimary += 1
            fdNonPK.append(fd)
    if countPrimary < countNonPrimary:
        # fdNonPK.append("You are determining more attributes with a non prime attribute. " \
        #                     "Please review your primary key selection.")
        result['countPK'] = fdNonPK
    result['countZero'] = []
    if countPrimary == 0:
        # fdPK.append(fds)
        # fdPK.append("Selected Primary key is not determining any attribute which may lead " \
        #                       "to problem. Please review your primary key selection. ")
        result['countZero'] = fds
    print(result)
    for each in result:
        print(len(result[each]))
        for i in range(len(result[each])):
            print(result[each][i][0])
            result[each][i] = [list(result[each][i][0]), list(result[each][i][1])]

    print(result)
    return result


def my_exception(e):
    print('exp: ', e)
    traceback.print_exception(*sys.exc_info())


def get_result(object_type, input_boxes_dic):
    result = {}
    relation_names = []
    print('==>', type(input_boxes_dic))
    try:
        data = json.loads(input_boxes_dic)
        input_boxes = data['inputBoxes']
        relation_name = data['relationName']
        my_relation = Relation(rel_name=relation_name, input_boxes=input_boxes)
        if object_type == 'minimal_cover':
            normalized_relation = NormalizedRelation(relation=my_relation)
            result = normalized_relation.get_minimal_cover_JSON()
        elif object_type == '1NF':
            nf_1 = Nf1st(my_rel=my_relation)
            result = nf_1.find_nf_1()
        elif object_type == '2NF':
            nf_2 = Nf2nd(my_rel=my_relation)
            result = nf_2.find_nf_2()
        elif object_type == '3NF':
            nf_3 = Nf3rd(my_rel=my_relation)
            result = nf_3.find_nf_3()
        elif object_type == 'BCNF':
            bcnf = BcNf(my_rel=my_relation)
            result = bcnf.find_bcnf()

        relation_names = ''
        if object_type != 'minimal_cover':
            sql_form = SqlFormAttributeConstraints(data, object_type, relation_name, nf_result=result)
            relation_names = sql_form.get_relation_names()
        print(relation_names)
    except Exception as e:
        my_exception(e)

    return {"result": result, "relation_names": relation_names}


def get_relationalMapping(nf_type, api_data):
    # print('\n\n ===> ', api_data, '\n\n')
    result = '1'
    try:
        data = json.loads(api_data)
        input_boxes = data['inputBoxes']
        relation_name = data['relationName']
        my_relation = Relation(rel_name=relation_name, input_boxes=input_boxes)
        nf_result = get_result(object_type=nf_type, input_boxes_dic=request.data.decode('utf-8'))['result']
        rm = ''
        if nf_type == 'RM':
            dic = my_relation.extract_data(input_boxes)
            rm = RelationalMapping(dic)

        elif nf_type == '1NF':
            normalized_relation = NormalizedRelation(relation=my_relation)
            dic = my_relation.extract_data(input_boxes)
            # dic['fds'] = normalized_relation.get_minimal_cover()
            # new_dict = {'fds': dic['fds'], 'primary': dic['primary'], 'multi_value': dic['multi_value']}
            rm = RelationalMapping1nf(dic)

        elif nf_type == '2NF' or nf_type == '3NF' or nf_type == 'BCNF':
            normalized_relation = NormalizedRelation(relation=my_relation)
            minimal_cover_result = normalized_relation.get_minimal_cover()

            sql_form = SqlFormAttributeConstraints(data, nf_type, relation_name, nf_result=nf_result)
            all_relations = sql_form.get_all_relations()
            relation_names = sql_form.get_relation_names()
            fk = sql_form.get_all_foreign_keys_list()

            # print('Minimal Cover:\n', minimal_cover_result)
            # print('All Relation:\n', all_relations)
            # print('All Relation Names:\n', relation_names)
            # print('Foreign Key:\n', fk)
            if nf_type == '2NF':
                rm = RelationalMapping2nf(all_relations, relation_names, fk, minimal_cover_result)
            elif nf_type == '3NF':
                rm = RelationalMapping3nf(all_relations, relation_names, fk)
            elif nf_type == 'BCNF':
                rm = RelationalMappingBcnf(all_relations, relation_names, fk)
        else:
            result = '0'
    except Exception as e:
        # result = '0'
        my_exception(e)
    # del rm
    if result == '0':
        return result
    else:
        return send_file(f'./{nf_type}.png', mimetype='image') if exists(f'./{nf_type}.png') else '0'


@app.route("/minimalCover", methods=['POST'])
def minimalCover():
    return get_result(object_type='minimal_cover', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/NF1", methods=['POST', 'GET'])
def NF1():
    return get_result(object_type='1NF', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/NF2", methods=['POST', 'GET'])
def NF2():
    res = get_result(object_type='2NF', input_boxes_dic=request.data.decode('utf-8'))
    return res


@app.route("/NF3", methods=['POST', 'GET'])
def NF3():
    return get_result(object_type='3NF', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/BCNF", methods=['POST'])
def BCNF():
    return get_result(object_type='BCNF', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/relationalMapping", methods=['POST', 'GET'])
def relationalMapping():
    nf_type = 'RM'
    if len(request.data.decode('utf-8')) != 0:
        return get_relationalMapping(nf_type, request.data.decode('utf-8'))
    else:
        return send_file(f'./{nf_type}.png', mimetype='image') if exists(f'./{nf_type}.png') else '0'


@app.route("/relationalMapping_1nf", methods=['POST', 'GET'])
def relationalMapping_1nf():
    nf_type = '1NF'
    if len(request.data.decode('utf-8')) != 0:
        return get_relationalMapping(nf_type, request.data.decode('utf-8'))
    else:
        return send_file(f'./{nf_type}.png', mimetype='image') if exists(f'./{nf_type}.png') else '0'


@app.route("/relationalMapping_2nf", methods=['POST', 'GET'])
def relationalMapping_2nf():
    nf_type = '2NF'
    if len(request.data.decode('utf-8')) != 0:
        return get_relationalMapping(nf_type, request.data.decode('utf-8'))
    else:
        return send_file(f'./{nf_type}.png', mimetype='image') if exists(f'./{nf_type}.png') else '0'


@app.route("/relationalMapping_3nf", methods=['POST', 'GET'])
def relationalMapping_3nf():
    nf_type = '3NF'
    if len(request.data.decode('utf-8')) != 0:
        return get_relationalMapping(nf_type, request.data.decode('utf-8'))
    else:
        return send_file(f'./{nf_type}.png', mimetype='image') if exists(f'./{nf_type}.png') else '0'


@app.route("/relationalMapping_bcnf", methods=['POST', 'GET'])
def relationalMapping_bcnf():
    nf_type = 'BCNF'
    if len(request.data.decode('utf-8')) != 0:
        return get_relationalMapping(nf_type, request.data.decode('utf-8'))
    else:
        return send_file(f'./{nf_type}.png', mimetype='image') if exists(f'./{nf_type}.png') else '0'


@app.route("/getSqlSchemaData", methods=['POST'])
def getSqlSchemaData():
    json_data = {"Data": []}
    try:
        data = json.loads(request.data.decode('utf-8'))
        normal_form = data['normalForm']
        relation_name = data['relationName']
        sql_form = SqlFormAttributeConstraints(request.data.decode('utf-8'), normal_form, relation_name)
        json_data = sql_form.get_sql_form_data()

    except Exception as e:
        my_exception(e)
    return json_data


@app.route("/sqlSchemaGenerator", methods=['POST'])
def sqlSchemaGenerator():
    script_string = ''
    try:
        data = json.loads(request.data.decode('utf-8'))
        script = SqlScript(data['data'])
        script_string = script.write_sql_script()
        file = open('dump_schema.sql', 'w+')
        file.write(script_string)
    except Exception as e:
        my_exception(e)

    return script_string


@app.route("/preliminaryCheck", methods=['POST'])
def preliminaryCheck():
    checkCount = ''
    try:
        data = json.loads(request.data.decode('utf-8'))
        input_boxes = data['inputBoxes']
        relation_name = data['relationName']
        my_relation = Relation(rel_name=relation_name, input_boxes=input_boxes)
        PK = my_relation.get_primary_keys()
        fds = (my_relation.get_attribute_dependency()).get_func_dep()
        # print('Fds:', fds)
        checkCount = primaryKeyCheck(set(PK), fds)

    except Exception as e:
        my_exception(e)
    return checkCount


@app.route('/fdMining', methods=['POST'])
def fdMining():
    data = '0'
    try:
        if len(request.files) > 0:
            file = request.files['file']
            file.save(os.path.join('./datasets/', secure_filename(file.filename)))
            fd_miner = FdsMiner('./datasets/' + file.filename, 'fdtool')
            data = fd_miner.fd_mining()
    except Exception as e:
        my_exception(e)

    return data


@app.route('/loadData', methods=['POST'])
def loadData():
    data = '0'
    try:
        if len(request.files) > 0:
            file = request.files['file']
            file.save(os.path.join('./user_work/', secure_filename(file.filename)))
            read_file = open('./user_work/' + file.filename, 'r')
            data = read_file.readline()
    except Exception as e:
        my_exception(e)

    return data


@app.route('/image', methods=['GET'])
def image():
    return send_file('./1NF.png', mimetype='image')


if __name__ == '__main__':
    app.run(debug=True)
