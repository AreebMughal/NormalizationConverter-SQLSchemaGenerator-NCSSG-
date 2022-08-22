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
from source.Sql_Form_Methods import create_relation_names
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


@app.route("/minimalCover", methods=['GET', 'POST'])
def minimalCover():
    return get_result(object_type='minimal_cover', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/NF1", methods=['GET', 'POST'])
def NF1():
    return get_result(object_type='NF1', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/NF2", methods=['GET', 'POST'])
def NF2():
    res = get_result(object_type='NF2', input_boxes_dic=request.data.decode('utf-8'))
    return res


@app.route("/NF3", methods=['GET', 'POST'])
def NF3():
    return get_result(object_type='NF3', input_boxes_dic=request.data.decode('utf-8'))

@app.route("/BCNF", methods=['GET', 'POST'])
def BCNF():
    return get_result(object_type='BCNF', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/getSqlSchemaData", methods=['GET', 'POST'])
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
        # print(res)
    except Exception as e:
        my_exception(e)
    # print(json_data)
    return json_data


@app.route("/sqlSchemaGenerator", methods=['GET', 'POST'])
def sqlSchemaGenerator():
    script_string = ''
    try:
        data = json.loads(request.data.decode('utf-8'))
        script = SqlScript(data['data'])
        script_string = script.write_sql_script()
        file = open('dump_schema.sql', 'w+')
        file.write(script_string)
        # path = os.path.abspath('./dump_schema.sql')
    except Exception as e:
        my_exception(e)

    return script_string


@app.route("/preliminaryCheck", methods=['GET', 'POST'])
def preliminaryCheck():
    try:
        data = json.loads(request.data.decode('utf-8'))
        input_boxes = data['inputBoxes']
        # relation_name = data['relationName']
        relation_name = 'Something'
        my_relation = Relation(rel_name=relation_name, input_boxes=input_boxes)

    except Exception as e:
        my_exception(e)
    return ''


@app.route("/relationalMapping", methods=['GET', 'POST'])
def relationalMapping():
    try:
        data = json.loads(request.data.decode('utf-8'))
        input_boxes = data['inputBoxes']
        # relation_name = data['relationName']
        relation_name = 'Something'
        my_relation = Relation(rel_name=relation_name, input_boxes=input_boxes)
        dic = my_relation.extract_data(input_boxes)
        print(dic)
        rl = RelationalMapping(dic)

    except Exception as e:
        my_exception(e)
    return ''


@app.route('/fdMining', methods=['GET', 'POST'])
def fdMining():
    data = '0'
    try:
        print(len(request.files))
        if len(request.files) > 0:
            print('--'*30)
            file = request.files['file']
            file.save(os.path.join('./datasets/', secure_filename(file.filename)))
            fd_miner = FdsMiner('./datasets/'+file.filename, 'fdtool')
            data = fd_miner.fd_mining()
            print('adsf', len(data['inputBoxes']))
        # filename = file.filename
        # print(f"Uploading file {filename}")
        # file_bytes = file.read()
        # file_content = BytesIO(file_bytes).readlines()
        # print(file_content)
    except Exception as e:
        my_exception(e)

    return data


if __name__ == '__main__':
    app.run(debug=True)

    # res = get_dummy_nf_result()
    #
    # rel_names = create_relation_names(res, 'Organization')
    # # names_dictionary = {}
    # # for key, value in rel_names.items():
    # #     names_dictionary[value[1]] = value[0]
    # #
    # # print('=>', names_dictionary)
    #
    # fk = {}
    # all_relation = get_all_relations(nf_result=res, relation_name='Organization')
    #
    # for key, value in res.items():
    #     index = 0
    #     if len(value) > 0:
    #         for rel in value:
    #             if key.lower() != 'full':
    #                 name = rel_names[key][index][0]
    #                 fk[name] = get_foreign_keys(rel, all_relation, rel_names[key][index][1])
    #                 index += 1
    #
    # print(fk)

    # fk = {
    #     'Org_ssn': [
    #         {'attribute': ['ssn'], 'relationName': 'Fully_dependent'}
    #     ],
    #     'Org_pnum': [
    #         {'attribute': ['pnum'], 'relationName': 'Fully_dependent'}
    #     ],
    #     'Org_email': [
    #         {'attribute': ['pnum', 'ssn'], 'relationName': 'Fully_dependent'}
    #     ],
    #     'Org_address': [
    #         {'attribute': ['ssn'], 'relationName': 'Fully_dependent'}
    #     ],
    #     'Org_id': [
    #         {'attribute': ['id'], 'relationName': 'partial_1'}
    #     ],
    #     'Org_dnum': [
    #         {'attribute': ['dnum'], 'relationName': 'transitive_1'}
    #     ]
    # }
