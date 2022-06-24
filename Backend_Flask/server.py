import json
import sys
import traceback

from flask import Flask, request
from flask_cors import CORS

from source.NF_1 import Nf1st
from source.NF_2 import Nf2nd
from source.NF_3 import Nf3rd
from source.Relation import Relation
from source.normalizedRelation import NormalizedRelation
from source.Sql_Form_Methods import create_relation_names
from source.Sql_Form_Methods import get_foreign_keys
from source.Sql_Form_Methods import get_all_relations
from source.Sql_Form_Methods import create_relations
from source.StaticMethods import get_dummy_nf_result

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
        my_relation = Relation(rel_name='Something', input_boxes=input_boxes)
        if object_type == 'minimal_cover':
            normalized_relation = NormalizedRelation(my_relation)
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
            pass
        relation_names = create_relation_names(result, data['relationName']) if object_type != 'minimal_cover' else ''
    except Exception as e:
        my_exception(e)

    return {"result": result, "relation_names": relation_names}


def get_foreign_key(result, current, value):
    for key, value in result.items():
        if key.lower() != 'full':
            pass


@app.route("/members", methods=['GET', 'POST'])
def members():
    return get_result(object_type='minimal_cover', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/NF2", methods=['GET', 'POST'])
def NF2():
    res = get_result(object_type='NF2', input_boxes_dic=request.data.decode('utf-8'))
    return res


@app.route("/NF3", methods=['GET', 'POST'])
def NF3():
    return get_result(object_type='NF3', input_boxes_dic=request.data.decode('utf-8'))


@app.route("/getSqlSchemaData", methods=['GET', 'POST'])
def getSqlSchemaData():
    json_data = {"Data": []}
    try:
        data = json.loads(request.data.decode('utf-8'))
        print(data)
        normal_form = data['normalForm']
        relation_name = data['relationName']
        # res = ''
        print('relname: ', relation_name)
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
   pass


if __name__ == '__main__':
    app.run(debug=True)
