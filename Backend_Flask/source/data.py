# data = [
#     {
#         'relationName': 'new',
#         'attributes': [
#             {
#                 'value': 'ssn', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'ename', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'unique',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'email', 'type': 'mediumtext', 'length': '', 'default': 'NULL', 'index': 'none',
#                 'autoIncrement': False, 'null': True
#             }
#         ]
#     },
#     {
#         'relationName': 'some',
#         'attributes': [
#             {
#                 'value': 'ssn', 'type': 'tinyint', 'length': '100', 'default': 'NONE', 'index': 'primary',
#                 'autoIncrement': True, 'null': False
#             },
#             {
#                 'value': 'ename', 'type': 'varchar', 'length': '2000', 'default': 'NULL', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#         ]
#     },
#     {
#         'relationName': 'Numbers',
#         'attributes': [
#             {
#                 'value': 'col_int', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'col_tinyInt', 'type': 'TINYINT', 'length': '', 'default': 'NONE', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'col_smallInt', 'type': 'SMALLINT', 'length': '', 'default': 'NONE', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'col_medInt', 'type': 'MEDIUMINT', 'length': '', 'default': 'NONE', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'col_Bigint', 'type': 'BIGINT', 'length': '', 'default': 'NONE', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'col_dec', 'type': 'DECIMAL', 'length': '', 'default': 'NONE', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'col_float', 'type': 'FLOAT', 'length': '', 'default': 'NONE', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'col_double', 'type': 'DOUBLE', 'length': '', 'default': 'NONE', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'col_real', 'type': 'REAL', 'length': '', 'default': 'NONE', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'col_bit', 'type': 'BIT', 'length': '1', 'default': 'NONE', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'col_boolean', 'type': 'BOOLEAN', 'length': '', 'default': 'NONE', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#             {
#                 'value': 'col_serial', 'type': 'SERIAL', 'length': '', 'default': 'NONE', 'index': 'none',
#                 'autoIncrement': False, 'null': False
#             },
#         ]
#
#     }
# ]

data = [
    {
        'relationName': ['Organization', 'Fully_dependent'],
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
        'relationName': ['Org_ssn', 'partial_1'],
        'attributes': [
            {'value': 'ssn', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary', 'autoIncrement': False,
             'null': False},
            {'value': 'id', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'none', 'autoIncrement': False,
             'null': False}
        ],
        'foreignKeys': [{'attribute': ['ssn'], 'relationName': 'Fully_dependent'}]
    },
    {
        'relationName': ['Org_pnum', 'partial_2'],
        'attributes': [
            {'value': 'pnum', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary',
             'autoIncrement': False,
             'null': False},
            {'value': 'ploc', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'none', 'autoIncrement': False,
             'null': False},
            {'value': 'pname', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'none', 'autoIncrement': False,
             'null': False}], 'foreignKeys': [{'attribute': ['pnum'], 'relationName': 'Fully_dependent'}]},
    {'relationName': ['Org_email', 'multi_1'], 'attributes': [
        {'value': 'pnum', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary', 'autoIncrement': False,
         'null': False},
        {'value': 'ssn', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary', 'autoIncrement': False,
         'null': False},
        {'value': 'email', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary', 'autoIncrement': False,
         'null': False}], 'foreignKeys': [{'attribute': ['ssn', 'pnum'], 'relationName': 'Fully_dependent'}]},
    {'relationName': ['Org_address', 'multi_2'], 'attributes': [
        {'value': 'ssn', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary', 'autoIncrement': False,
         'null': False},
        {'value': 'address', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary', 'autoIncrement': False,
         'null': False}], 'foreignKeys': [{'attribute': ['ssn'], 'relationName': 'Fully_dependent'}]},
    {'relationName': ['Org_id', 'transitive_1'], 'attributes': [
        {'value': 'id', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary', 'autoIncrement': False,
         'null': False},
        {'value': 'dnum', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'none', 'autoIncrement': False,
         'null': False}], 'foreignKeys': [{'attribute': ['id'], 'relationName': 'partial_1'}]},
    {'relationName': ['Org_dnum', 'transitive_2'], 'attributes': [
        {'value': 'dnum', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'primary', 'autoIncrement': False,
         'null': False},
        {'value': 'dloc', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'none', 'autoIncrement': False,
         'null': False},
        {'value': 'dname', 'type': 'INT', 'length': '', 'default': 'NONE', 'index': 'none', 'autoIncrement': False,
         'null': False}], 'foreignKeys': [{'attribute': ['dnum'], 'relationName': 'transitive_1'}]}
]


