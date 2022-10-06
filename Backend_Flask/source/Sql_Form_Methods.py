from server import *


class SqlFormAttributeConstraints:
    def __init__(self, data, normal_form, relation_name, nf_result=None):
        if nf_result is None:
            nf_result = get_result(object_type=normal_form, input_boxes_dic=data)['result']
        self.nf_result = nf_result
        print(type(nf_result))
        self.relation_name = relation_name
        self.relation_names = self.create_relation_names()
        self.all_relations = self.get_all_relations_list()

    def get_sql_form_data(self):
        json_data = self.create_relations(self.relation_names, self.all_relations)
        return json_data

    def get_relation_names(self):
        return self.relation_names

    def get_all_relations(self):
        return self.all_relations

    @staticmethod
    def current_name_count(name, relation_names_list):
        count = 0
        for rel_name_l in relation_names_list:
            for name_list in rel_name_l:
                for rel_name in name_list:
                    print(rel_name, name, rel_name == name)
                    if rel_name == name:
                        count += 1
        return count

    def create_relation_names(self):
        relation_name = self.relation_name
        relation_names = {'full': [[relation_name, 'Fully_dependent']]}
        rel_name = relation_name[:3]
        for key, value in self.nf_result.items():
            count = 1
            if key.lower() != 'full' and len(value) > 0:
                relation_names[key] = []
                for rel in value:
                    name = rel[1][0] if key.lower() == 'multi' else rel[0][0]
                    name = rel_name + '_' + name
                    same_name_count = self.current_name_count(name, list(relation_names.values()))
                    name += (('_' + str(same_name_count)) if same_name_count != 0 else '')
                    relation_names[key].append([name, key + '_' + str(count)])
                    count += 1

        return relation_names

    @staticmethod
    def check_fk_in_relation(all_foreign_keys, attribute):
        index = -1
        for i in range(len(all_foreign_keys)):
            # print(attribute, all_foreign_keys[i]['attribute'])
            if set(attribute).issubset(all_foreign_keys[i]['attribute']):
                index = i
        return index

    @staticmethod
    def check_relation_name(relation_names, value):
        result = list(filter(lambda x: x.startswith(value), relation_names))
        return False, '' if len(result) == 0 else True, result[0]

    @staticmethod
    def get_foreign_relation_of(relations):
        foreign_relation = []
        for rel in relations:
            foreign_relation.append(rel.split('_')[0].lower())
        return foreign_relation

    def get_foreign_keys(self, relation, all_relations, current):
        foreign_keys = []
        # print(all_relations)
        primary_keys = all_relations['Fully_dependent'][0]
        # print(current, ':')
        for key, rel in all_relations.items():
            if key != current:
                relation_lhs = set(relation[0])
                if len(primary_keys) > 1 and (current == 'multi' or current == 'Fully_dependent'):
                    if relation_lhs == rel[0]:
                        pass
                for attr in relation[0]:
                    if 'Fully_dependent' in current and 'primeDependency' in key:
                        if {attr}.issubset(rel[1]):
                            self.append_foreign_key(foreign_keys, key, [attr])
                    else:
                        if len(rel) > 1:
                            if {attr}.issubset(rel[0]) or {attr}.issubset(rel[1]):
                                self.append_foreign_key(foreign_keys, key, [attr])
                        elif {attr}.issubset(rel[0]):
                            self.append_foreign_key(foreign_keys, key, [attr])

        for element in foreign_keys:
            print('->', element['relationName'])
            relations = self.get_foreign_relation_of(element['relationName'])
            print('=>', relations)
            if 'fully' in relations and len(primary_keys) == 1:
                element['relationName'] = 'Fully_dependent'
            elif 'partial' in relations:
                index = relations.index('partial')
                element['relationName'] = element['relationName'][index]
            elif 'fully' in relations:
                element['relationName'] = 'Fully_dependent'
            elif 'primedependency' in relations:
                index = relations.index('primedependency')
                element['relationName'] = element['relationName'][index]
            elif 'transitive' in relations:
                index = relations.index('transitive')
                element['relationName'] = element['relationName'][index]
            elif 'multi' in relations:
                index = relations.index('multi')
                element['relationName'] = element['relationName'][index]

            # element['attribute'] = list(element['attribute'])
            # print('.... ', element['attribute'])
        # print('-->', foreign_keys)
            print('==', element['relationName'])
        return foreign_keys

    def append_foreign_key(self, foreign_keys, key, relation_lhs):
        index = self.check_fk_in_relation(foreign_keys, relation_lhs)
        if index == -1:
            foreign_keys.append({"attribute": relation_lhs, "relationName": [key]})
        else:
            foreign_keys[index]['relationName'].append(key)

    def get_all_relations_list(self):
        all_relations = {}
        relation_names = self.create_relation_names()

        for key, relations in self.nf_result.items():
            index = 0
            for relation in relations:
                if len(relation) > 1:
                    all_relations[relation_names[key][index][1]] = ([set(relation[0]), set(relation[1])])
                elif len(relation) == 1:
                    all_relations[relation_names[key][index][1]] = ([set(relation[0])])
                index += 1
        # print(all_relations)
        return all_relations

    @staticmethod
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

    def create_relations(self, relation_names, all_relations):
        json_data = {"Data": []}
        for key, value in self.nf_result.items():
            index = 0
            if len(value) > 0:
                for rel in value:
                    relation = {"relationName": relation_names[key][index], "attributes": [], "foreignKeys": []}
                    if key.lower() != 'multi':
                        for attr in rel[0]:
                            relation["attributes"].append(self.get_attribute_detail(attr, "primary"))
                        for attr in rel[1]:
                            relation["attributes"].append(self.get_attribute_detail(attr, "none"))
                    elif key.lower() == 'multi':
                        for arr in rel:
                            for attr in arr:
                                relation["attributes"].append(self.get_attribute_detail(attr, "primary"))
                    if key.lower() != 'partial':
                        relation['foreignKeys'] = self.get_foreign_keys(rel, all_relations,
                                                                        relation_names[key][index][1])
                    index += 1
                    json_data['Data'].append(relation)

        # print_data(json_data, all_relations)
        return json_data
        # print(json_data)

    def get_all_foreign_keys_list(self):
        fk = {}
        for key, value in self.nf_result.items():
            index = 0
            if len(value) > 0:
                for rel in value:
                    if key.lower() != 'partial':
                        name = self.relation_names[key][index][0]
                        fk[name] = self.get_foreign_keys(rel, self.all_relations, self.relation_names[key][index][1])
                        index += 1
        c = 0
        print('\n\n')
        for key, value in fk.items():
            c += 1
            print(str(c) + ') Relation Name:', key)
            print('Foreign Key Relationship:')
            for val in value:
                print('\tAttributes:', val['attribute'])
                print('\tRelation:', val['relationName'])
            print('\n')

        return fk

    @staticmethod
    def print_data(Data, all_relations):
        c = 0
        for data in Data['Data']:
            for key, value in data.items():
                if key == 'relationName':
                    c += 1
                    print(str(c) + ') Relation Name:', value[0], ' || ', value[1], ':')
                    print('\t', all_relations[value[1]])
                if key == 'foreignKeys':
                    print('Foreign Key Relationship:')
                    for val in value:
                        print('\tAttributes:', val['attribute'])
                        print('\tRelation:', val['relationName'])
                    print('\n')
