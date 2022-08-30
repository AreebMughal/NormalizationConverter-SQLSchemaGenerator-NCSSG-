import json
import sys
import traceback
import os
from io import BytesIO

import numpy as np
from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify
from flask_cors import CORS

from Fd_Miner import FdsMiner
from source.DrawingImage.relationalMapping import RelationalMapping
from source.NF_1 import Nf1st
from source.NF_2 import Nf2nd
from source.NF_3 import Nf3rd
from source.BCNF import BcNf
from source.Relation import Relation
from source.normalizedRelation import NormalizedRelation
from source.Sql_Form_Methods import create_relation_names, get_all_foreign_keys_list
from source.Sql_Form_Methods import get_foreign_keys
from source.Sql_Form_Methods import get_all_relations
from source.Sql_Form_Methods import create_relations
from source.StaticMethods import get_dummy_nf_result
from source.SqlScript import SqlScript

app = Flask(__name__)
CORS(app)

ress = {
    'full': [
        [['pnum', 'ssn'], ['name']]
    ],
    'partial': [
        [['ssn'], ['id']],
        [['pnum'], ['ploc', 'pname']]
    ],
    'multi': [
        [['pnum', 'ssn'], ['email']],
        [['ssn'], ['address']]
    ],
    'transitive': [
        [['id'], ['dnum']],
        [['dnum'], ['dloc', 'dname']]
    ]
}


def my_exception(e):
    print('exp: ', e)
    traceback.print_exception(*sys.exc_info())


def get_result(object_type, input_boxes_dic):
    result = {}
    relation_names = []
    try:
        data = json.loads(input_boxes_dic)
        input_boxes = data['inputBoxes']
        relation_name = data['relationName']
        my_relation = Relation(rel_name=relation_name, input_boxes=input_boxes)
        if object_type == 'minimal_cover':
            normalized_relation = NormalizedRelation(relation=my_relation)
            result = normalized_relation.get_minimal_cover_JSON()
        elif object_type == 'NF1':
            nf_1 = Nf1st(my_rel=my_relation)
            result = nf_1.find_nf_1()
        elif object_type == 'NF2':
            nf_2 = Nf2nd(my_rel=my_relation)
            result = nf_2.find_nf_2()
        elif object_type == 'NF3':
            nf_3 = Nf3rd(my_rel=my_relation)
            result = nf_3.find_nf_3()
        elif object_type == 'BCNF':
            bcnf = BcNf(my_rel=my_relation)
            result = bcnf.find_bcnf()
        relation_names = create_relation_names(result, data['relationName']) if object_type != 'minimal_cover' else ''
    except Exception as e:
        my_exception(e)

    return {"result": result, "relation_names": relation_names}


def get_relationalMapping(nf_type, api_data):
    result = '1'
    try:
        data = json.loads(api_data)
        input_boxes = data['inputBoxes']
        relation_name = data['relationName']
        my_relation = Relation(rel_name=relation_name, input_boxes=input_boxes)
        nf_result = get_result(object_type=nf_type, input_boxes_dic=request.data.decode('utf-8'))['result']

        if nf_type == 'NF1':
            dic = my_relation.extract_data(input_boxes)
            rel_map = RelationalMapping(dic)
        elif nf_type == 'NF2' or nf_type == 'NF3' or nf_type == 'BCNF':
            normalized_relation = NormalizedRelation(relation=my_relation)
            minimal_cover_result = normalized_relation.get_minimal_cover()
            all_relations = get_all_relations(nf_result, relation_name)
            relation_names = create_relation_names(nf_result, relation_name)
            fk = get_all_foreign_keys_list(nf_result, relation_names, all_relations)

            print('Minimal Cover:\n', minimal_cover_result)
            print('All Relation:\n', all_relations)
            print('All Relation Names:\n', relation_names)
            print('Foreign Key:\n', fk)
        else:
            result = '0'
    except Exception as e:
        my_exception(e)
    return result


@app.route("/minimalCover", methods=['POST'])
def minimalCover():
    return get_result(object_type='minimal_cover', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/NF1", methods=['POST'])
def NF1():
    return get_result(object_type='NF1', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/NF2", methods=['POST'])
def NF2():
    res = get_result(object_type='NF2', input_boxes_dic=request.data.decode('utf-8'))
    return res


@app.route("/NF3", methods=['POST'])
def NF3():
    return get_result(object_type='NF3', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/BCNF", methods=['POST'])
def BCNF():
    return get_result(object_type='BCNF', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/relationalMapping", methods=['POST'])
def relationalMapping():
    return get_relationalMapping('NF2', request.data.decode('utf-8'))


@app.route("/relationalMapping_nf2", methods=['POST'])
def relationalMapping_nf2():
    return get_relationalMapping('NF2', request.data.decode('utf-8'))


@app.route("/relationalMapping_nf3", methods=['POST'])
def relationalMapping_nf3():
    return get_relationalMapping('NF3', request.data.decode('utf-8'))


@app.route("/relationalMapping_bcnf", methods=['POST'])
def relationalMapping_bcnf():
    return get_relationalMapping('BCNF', request.data.decode('utf-8'))


@app.route("/getSqlSchemaData", methods=['POST'])
def getSqlSchemaData():
    json_data = {"Data": []}
    try:
        data = json.loads(request.data.decode('utf-8'))
        normal_form = data['normalForm']
        relation_name = data['relationName']
        if normal_form == 'BCNF':
            res = get_dummy_nf_result()
            all_relations = get_all_relations(res, 'Practice')
            json_data = create_relations(res, create_relation_names(res, 'Practice'), all_relations)
        else:
            res = get_result(object_type=normal_form, input_boxes_dic=request.data.decode('utf-8'))['result']
            all_relations = get_all_relations(res, relation_name)
            json_data = create_relations(res, create_relation_names(res, relation_name), all_relations)

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
    countPrimary = 0
    countNonPrimary = 0
    print('==> ', fds)
    for fd in fds:
        print(fd)
        lhs = set(fd[0])
        print(lhs)
        # rhs = set(fd[1])
        if lhs.issubset(pk):
            countPrimary += 1
        else:
            countNonPrimary += 1
    if countPrimary < countNonPrimary:
        result['countPK'] = "You are determining more attributes with a non prime attribute. Please review your primary key selection."
    if (countPrimary == 0):
        result['countZero'] = "Selected Primary key is not determining any attribute which may lead to problem. Please review your primary key selection. "
    print(result)
    return result


@app.route("/preliminaryCheck", methods=['POST'])
def preliminaryCheck():
    checkCount = ''
    try:
        data = json.loads(request.data.decode('utf-8'))
        input_boxes = data['inputBoxes']
        relation_name = data['relationName']
        my_relation = Relation(rel_name=relation_name, input_boxes=input_boxes)
        normalized_relation = NormalizedRelation(my_relation)
        PK = my_relation.get_primary_keys()
        fds = (my_relation.get_attribute_dependency()).get_func_dep()
        print('Fds:', fds)

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


if __name__ == '__main__':
    app.run(debug=True)
