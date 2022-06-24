from Sql_Form_Methods import create_relation_names
from StaticMethods import check_fd_in_relation
from Sql_Form_Methods import get_foreign_keys
from Sql_Form_Methods import get_all_relations
from Sql_Form_Methods import create_relations
from Sql_Form_Methods import print_data

relation_name = 'Organization'

Minimal_Cover_Result = [
    [['pnum', 'ssn'], ['name']],
    [['ssn'], ['id']],
    [['pnum', 'ssn'], ['email']],
    [['ssn'], ['address']],
    [['id'], ['dnum']],
    [['dnum'], ['dloc', 'dname']],
    [['dnum'], ['dloc']],
    [['pnum'], ['ploc', 'pname']],
    [['pnum'], ['ploc']]
]

NF3_Result = {
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

relations = {
    'Fully_dependent': [{'ssn', 'pnum'}, {'name'}],
    'partial_1': [{'ssn'}, {'id'}],
    'partial_2': [{'pnum'}, {'pname', 'ploc'}],
    'Multi_1': [{'ssn', 'pnum'}, {'email'}],
    'Multi_2': [{'ssn'}, {'address'}],
    'transitive_1': [{'id'}, {'dnum'}],
    'transitive_2': [{'dnum'}, {'dloc', 'dname'}]
}

data = {
    'relationName': ['Org_id', 'transitive_1'],
    'attributes': [
        {
            'value': 'id', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary',
            'autoIncrement': False, 'null': False
        },
        {
            'value': 'dnum', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'none',
            'autoIncrement': False, 'null': False
        }
    ],
    'foreignKeys': [
        {
            'relationName': 'partial_1',
            'attribute': ['id']
        },
    ]
}


def get_attribute_detail(name, index_value):
    return {
        "value": name,
        "type": "INT",
        "length": "",
        "default": "NONE",
        "index": index_value,
        "autoIncrement": False,
        "null": False
    }


# NF3_Result = {
#     'full': [[['pnum', 'ssn'], ['name']]],
#     'partial': [[['ssn'], ['cnic', 'd_id', 'dnum']],[['pnum'], ['ploc']]],
#     'multi': [[['pnum', 'ssn'], ['email']], [['cnic'],['address']]],
#     'transitive': [[['dnum'], ['dname']], [['dnum', 'pnum'], ['dloc']]]
# }

relation_names = create_relation_names(NF3_Result, relation_name)

all_relations = get_all_relations(NF3_Result, relation_name)
print(relation_names)
Data = create_relations(NF3_Result, relation_names, all_relations)
print(Data)
# print_data(Data, all_relations)

relation_names = {
    'full': [['Organization', 'Fully_dependent']],
    'partial': [
        ['Org_ssn', 'partial_1'],
        ['Org_pnum', 'partial_2']
    ],
    'multi': [
        ['Org_email', 'multi_1'],
        ['Org_address', 'multi_2']
    ],
    'transitive': [
        ['Org_id', 'transitive_1'],
        ['Org_dnum', 'transitive_2']
    ]
}

"""
{
  "Data": [ 
      "0": {
          "relationName": "",
          "attributes": [
              {
                  "value": "",
                  "type": "",
                  "length": "",
                  "default": "NONE",
                  "index": "none",
                  "autoIncrement": false,
                  "null": false                  
              }
          ]  
      }
  ]
}
"""

my_data = {
    'Data': [
        {
            'relationName': ['', 'Fully_dependent'],
            'attributes': [
                {'value': 'pnum', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary',
                 'autoIncrement': False, 'null': False},
                {'value': 'ssn', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary',
                 'autoIncrement': False, 'null': False},
                {'value': 'name', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'none',
                 'autoIncrement': False, 'null': False}
            ],
            'foreignKeys': []
        },
        {
            'relationName': ['_ssn', 'partial_1'],
            'attributes': [
                {'value': 'ssn', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary',
                 'autoIncrement': False, 'null': False},
                {'value': 'id', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'none', 'autoIncrement': False,
                 'null': False}
            ],
            'foreignKeys': [
                {'attribute': {'ssn'}, 'relationName': 'Fully_dependent'}
            ]
        }
    ]
}
