from source.StaticSqlScriptMethods import script_header
from source.StaticSqlScriptMethods import comment_index_header
from source.StaticSqlScriptMethods import comment_table_header
from source.StaticSqlScriptMethods import comment_constraint_header
from source.StaticSqlScriptMethods import comment_line
from source.StaticSqlScriptMethods import get_default_length
from source.StaticSqlScriptMethods import get_line_terminator
from source.StaticSqlScriptMethods import get_dumped_table_header
from source.StaticSqlScriptMethods import get_attribute_type


class SqlScript:
    def __init__(self, data):
        self.data = data
        self.attributes = None

    def set_attributes(self, attributes):
        self.attributes = attributes

    @staticmethod
    def get_null_value(attribute):
        return "DEFAULT NULL" if attribute['default'] == 'NULL' or attribute['null'] else 'NOT NULL'

    @staticmethod
    def get_type_n_length(attribute):
        data_type = get_attribute_type(attribute['type'].lower())

        if len(attribute["length"]) != 0:
            length = f'({attribute["length"]})'
        else:
            length = get_default_length(attribute['type'].lower())

        type_n_length = data_type + length

        return type_n_length

    def create_table(self):
        table = ''
        for relation in self.data:
            attributes = relation['attributes']
            table += comment_table_header(relation["relationName"][0])
            table += f'CREATE TABLE `{relation["relationName"][0]}` ( \n'
            for attr in relation['attributes']:
                condition = (attr == attributes[len(attributes) - 1])
                line_terminator = get_line_terminator(other=',', last='', condition=condition)
                table += f'\t`{attr["value"]}` {self.get_type_n_length(attr)} {self.get_null_value(attr)}{line_terminator} \n'

            table += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;' + '\n\n'
            table += comment_line()
        return table

    def is_contain_indexes(self):
        flag = False
        count = 0
        for attr in self.attributes:
            if attr['index'] != 'none' or attr['type'].lower() == 'serial':
                flag = True
                count += 1

        return flag, count

    def is_contain_auto_increment(self):
        flag = False
        count = 0
        for attr in self.attributes:
            if attr['autoIncrement'] or attr['type'].lower() == 'serial':
                flag = True
                count += 1

        return flag, count

    def get_primary_keys_of_rel(self):
        primary_keys = ''
        for attribute in self.attributes:
            if attribute['index'].lower() == 'primary':
                primary_keys += f'`{attribute["value"]}`,'

        return primary_keys.rstrip(',')

    def add_indexes(self):
        indexes = ''
        for relation in self.data:
            attributes = relation['attributes']
            count = 0
            self.set_attributes(relation['attributes'])
            flag, total = self.is_contain_indexes()
            if flag:
                indexes += comment_index_header(relation["relationName"][0])
                indexes += 'ALTER TABLE ' + f'`{relation["relationName"][0]}`' + '\n'
                indexes += f'\tADD PRIMARY KEY ({self.get_primary_keys_of_rel()})'

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

    def add_auto_increment(self):
        auto_increment = ''
        for relation in self.data:
            attributes = relation['attributes']
            self.set_attributes(relation['attributes'])
            flag, total = self.is_contain_auto_increment()
            count = 0
            if flag:
                auto_increment += comment_index_header(relation["relationName"][0])
                auto_increment += 'ALTER TABLE ' + f'`{relation["relationName"][0]}`' + '\n'
                for attr in attributes:
                    name = attr['value']
                    condition = (count == total - 1)
                    line_terminator = get_line_terminator(other=',', last=';', condition=condition)
                    if attr['autoIncrement'] or attr['type'].lower() == 'serial':
                        auto_increment += f'\tMODIFY `{name}` {self.get_type_n_length(attr)} {self.get_null_value(attr)} ' \
                                          f'AUTO_INCREMENT{line_terminator}' + '\n'
                        count += 1
                auto_increment += '\n'
        return auto_increment

    @staticmethod
    def get_fk_constraint_name(rel_name, i):
        return rel_name + '_ibfk_' + str(i)

    def get_relation_names(self):
        names = {}
        for relation in self.data:
            names[relation['relationName'][1]] = relation['relationName'][0]

        return names

    def add_constraints(self):
        all_relation_names = self.get_relation_names()
        constraints = ''
        count = 1
        for relation in self.data:
            if len(relation['foreignKeys']) != 0:
                relation_name = relation["relationName"][0]
                constraints += comment_constraint_header(relation_name)
                constraints += f'ALTER TABLE `{relation_name}`' + '\n'
                for fk in relation['foreignKeys']:
                    all_attr = (' '.join(['`' + str(elem) + '`,' for elem in fk['attribute']])).rstrip(',')
                    constraints += f'\tADD CONSTRAINT `{self.get_fk_constraint_name(relation_name, count)}` FOREIGN KEY ({all_attr}) ' \
                                   f'REFERENCES `{all_relation_names[fk["relationName"]]}` ({all_attr}) \n\tON DELETE ' \
                                   'CASCADE ON UPDATE CASCADE; '
                    constraints += '\n'

        return constraints

    def write_sql_script(self):
        string = script_header()
        string += self.create_table()
        string += get_dumped_table_header('Indexes')
        string += self.add_indexes()
        auto_increment = self.add_auto_increment()
        string += get_dumped_table_header('AUTO_INCREMENT') + auto_increment if len(auto_increment) != 0 else ''
        constraints = self.add_constraints()
        string += get_dumped_table_header('Constraints') + constraints if len(constraints) != 0 else ''
        string += 'COMMIT;' + '\n'

        return string
