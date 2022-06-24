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


def script_header():
    return '-- NC-SSG SQL dump \n\n' \
           'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; \n' \
           'START TRANSACTION; \n' \
           'SET time_zone = "+00:00"; \n\n'


def get_null_value(attribute):
    return "DEFAULT NULL" if attribute['default'] == 'NULL' or attribute['null'] else 'NOT NULL'


def get_attribute_type(data_type):
    new_data_type = data_type
    if data_type == 'serial':
        new_data_type = 'bigint'
    elif data_type == 'real':
        new_data_type = 'double'
    elif data_type == 'boolean':
        new_data_type = 'tinyint'
    return new_data_type


def get_type_N_length(attribute):
    data_type = get_attribute_type(attribute['type'].lower())

    if len(attribute["length"]) != 0:
        length = f'({attribute["length"]})'
    else:
        length = get_default_length(attribute['type'].lower())

    type_n_length = data_type + length

    return type_n_length


def get_default_length(data_type):
    length = ''
    if data_type == 'int':
        length = '(11)'
    elif data_type == 'tinyint':
        length = '(4)'
    elif data_type == 'smallint':
        length = '(6)'
    elif data_type == 'mediumint':
        length = '(9)'
    elif data_type == 'bigint':
        length = '(20)'
    elif data_type == 'decimal':
        length = '(10, 0)'
    elif data_type == 'boolean':
        length = '(1)'
    elif data_type == 'serial':
        length = '(20)'
    return length


def comment_line():
    return '-- --------------------------------------------------------' + '\n'


def comment_table_header(table_name):
    return '\n' + '-- \n' \
                  f'-- Table structure for table `{table_name}` \n' \
                  '-- \n' \
                  '\n'


def comment_index_header(table_name):
    return '\n' + '-- \n' \
                  f'-- Indexes for table `{table_name}` \n' \
                  '-- \n'


def comment_constraint_header(table_name):
    return '\n' + '-- \n' \
                  f'-- Constraint for table `{table_name}` \n' \
                  '-- \n'


def get_line_terminator(other, last, condition):
    return last if condition else other


def create_table():
    table = ''
    for relation in data:
        attributes = relation['attributes']
        table += comment_table_header(relation["relationName"][0])
        table += f'CREATE TABLE `{relation["relationName"][0]}` ( \n'
        for attr in relation['attributes']:
            condition = (attr == attributes[len(attributes) - 1])
            line_terminator = get_line_terminator(other=',', last='', condition=condition)
            table += f'\t`{attr["value"]}` {get_type_N_length(attr)} {get_null_value(attr)}{line_terminator} \n'

        table += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;' + '\n\n'
        table += comment_line()
    return table


def is_contain_indexes(attributes):
    flag = False
    count = 0
    for attr in attributes:
        if attr['index'] != 'none' or attr['type'].lower() == 'serial':
            flag = True
            count += 1

    return {'flag': flag, 'count': count}


def is_contain_auto_increment(attributes):
    flag = False
    count = 0
    for attr in attributes:
        if attr['autoIncrement'] or attr['type'].lower() == 'serial':
            flag = True
            count += 1

    return {'flag': flag, 'count': count}


def get_primary_keys_of_rel(attributes):
    primary_keys = ''
    for attribute in attributes:
        if attribute['index'].lower() == 'primary':
            primary_keys += f'`{attribute["value"]}`,'

    return primary_keys.rstrip(',')


def add_indexes():
    indexes = ''
    for relation in data:
        attributes = relation['attributes']
        count = 0
        flag = is_contain_indexes(attributes)['flag']
        if flag:
            total = is_contain_indexes(attributes)['count']
            indexes += comment_index_header(relation["relationName"][0])
            indexes += 'ALTER TABLE ' + f'`{relation["relationName"][0]}`' + '\n'
            indexes += f'\tADD PRIMARY KEY ({get_primary_keys_of_rel(attributes)})'

            for attr in attributes:
                if attr['index'].lower() != 'primary':
                    name = attr['value']
                    index = attr['index'].upper() if attr['type'].lower() != 'serial' else 'UNIQUE'
                    key_name = name if index != 'PRIMARY' else ''
                    condition = (count == total - 1)
                    line_terminator = get_line_terminator(other=',', last=';', condition=condition)

                    if index != 'NONE' or attr['type'].lower() == 'serial':
                        indexes += '\t' + f'ADD {index} KEY {key_name} (`{name}`){line_terminator}' + '\n'
                        count += 1
        indexes += '\n'

    return indexes


def add_auto_increment():
    auto_increment = ''
    for relation in data:
        attributes = relation['attributes']
        flag = is_contain_auto_increment(attributes)['flag']
        count = 0
        if flag:
            total = is_contain_auto_increment(attributes)['count']
            auto_increment += comment_index_header(relation["relationName"][0])
            auto_increment += 'ALTER TABLE ' + f'`{relation["relationName"][0]}`' + '\n'
            for attr in attributes:
                name = attr['value']
                condition = (count == total - 1)
                line_terminator = get_line_terminator(other=',', last=';', condition=condition)
                if attr['autoIncrement'] or attr['type'].lower() == 'serial':
                    auto_increment += f'\tMODIFY `{name}` {get_type_N_length(attr)} {get_null_value(attr)} ' \
                                      f'AUTO_INCREMENT{line_terminator}' + '\n'
                    count += 1
            auto_increment += '\n'
    return auto_increment


def get_fk_constraint_name(rel_name, i):
    return rel_name + '_ibfk_' + str(i)


def get_relation_names():
    names = {}
    for relation in data:
        names[relation['relationName'][1]] = relation['relationName'][0]

    return names


def add_constraints():
    all_relation_names = get_relation_names()
    constraints = ''
    count = 1
    for relation in data:
        if len(relation['foreignKeys']) != 0:
            relation_name = relation["relationName"][0]
            constraints += comment_constraint_header(relation_name)
            constraints += f'ALTER TABLE `{relation_name}`' + '\n'
            for fk in relation['foreignKeys']:
                all_attr = (' '.join(['`' + str(elem) + '`,' for elem in fk['attribute']])).rstrip(',')
                constraints += f'\tADD CONSTRAINT `{get_fk_constraint_name(relation_name, count)}` FOREIGN KEY ({all_attr}) REFERENCES `{all_relation_names[fk["relationName"]]}` ({all_attr}) ON DELETE CASCADE ON UPDATE CASCADE;'
                constraints += '\n'

    return constraints


def get_dumped_table_header(value):
    return '-- \n' \
           f'-- {value} for dumped tables \n' \
           '-- \n\n'


string = script_header()

string += create_table()

string += get_dumped_table_header('Indexes')
string += add_indexes()

auto_increment = add_auto_increment()
string += get_dumped_table_header('AUTO_INCREMENT') + auto_increment if len(auto_increment) != 0 else ''

constraints = add_constraints()
string += get_dumped_table_header('Constraints') + constraints if len(constraints) != 0 else ''

string += 'COMMIT;' + '\n'

try:
    file = open('dump_schema.sql', 'w+')
    file.write(string)


except Exception as e:
    print(e)
