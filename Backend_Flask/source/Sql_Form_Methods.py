def create_relation_names(nf_result, relation_name):
    relation_names = {'full': [[relation_name, 'Fully_dependent']]}
    rel_name = relation_name[:3]
    for key, value in nf_result.items():
        count = 1
        if key.lower() != 'full' and len(value) > 0:
            relation_names[key] = []
            for rel in value:
                name = rel[1][0] if key.lower() == 'multi' else rel[0][0]
                relation_names[key].append([(rel_name + '_' + name), key + '_' + str(count)])
                count += 1

    return relation_names


def check_fk_in_relation(all_foreign_keys, attribute):
    index = -1
    for i in range(len(all_foreign_keys)):
        # print(attribute, all_foreign_keys[i]['attribute'])
        if set(attribute).issubset(all_foreign_keys[i]['attribute']):
            index = i
    return index


def check_relation_name(relation_names, value):
    result = list(filter(lambda x: x.startswith(value), relation_names))
    return False, '' if len(result) == 0 else True, result[0]


def get_foreign_relation_of(relations):
    foreign_relation = []
    for rel in relations:
        foreign_relation.append(rel.split('_')[0].lower())
    return foreign_relation


def get_foreign_keys(relation, all_relations, current):
    foreign_keys = []
    primary_keys = all_relations['Fully_dependent'][0]
    print(current, ':')
    for key, rel in all_relations.items():
        if key != current:
            relation_lhs = set(relation[0])
            if len(primary_keys) > 1 and (current == 'multi' or current == 'Fully_dependent'):
                if relation_lhs == rel[0]:
                    pass
                    # print('*', current, rel[0])
            # if 'partial' in current:
            #     if relation_lhs.issubset(rel[0]) and key == 'Fully_dependent':
            #         append_foreign_key(foreign_keys, key, relation[0])
            # if relation_lhs.issubset(rel[0]) or relation_lhs.issubset(rel[1]):
            #     append_foreign_key(foreign_keys, key, relation[0])
            # elif not('Fully_dependent' in current):
            #     print(' in - current', current)
            for attr in relation[0]:
                if {attr}.issubset(rel[0]) or {attr}.issubset(rel[1]):
                    append_foreign_key(foreign_keys, key, [attr])

    for element in foreign_keys:
        relations = get_foreign_relation_of(element['relationName'])
        print('Relations:', relations)
        if 'fully' in relations and len(primary_keys) == 1:
            element['relationName'] = 'Fully_dependent'
        # elif 'fully' in relations:
        #     element['relationName'] = 'Fully_dependent'
        elif 'partial' in relations:
            index = relations.index('partial')
            element['relationName'] = element['relationName'][index]
        elif 'transitive' in relations:
            index = relations.index('transitive')
            element['relationName'] = element['relationName'][index]
        elif 'multi' in relations:
            index = relations.index('multi')
            element['relationName'] = element['relationName'][index]
        # element['attribute'] = list(element['attribute'])
        # print('.... ', element['attribute'])
    print('-->', foreign_keys)

    return foreign_keys


def append_foreign_key(foreign_keys, key, relation_lhs):
    index = check_fk_in_relation(foreign_keys, relation_lhs)
    if index == -1:
        foreign_keys.append({"attribute": relation_lhs, "relationName": [key]})
    else:
        foreign_keys[index]['relationName'].append(key)


def get_all_relations(nf_result, relation_name):
    all_relations = {}
    relation_names = create_relation_names(nf_result, relation_name)

    for key, relations in nf_result.items():
        index = 0
        for relation in relations:
            all_relations[relation_names[key][index][1]] = ([set(relation[0]), set(relation[1])])
            index += 1
    # print(all_relations)
    return all_relations


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


def create_relations(nf_result, relation_names, all_relations):
    json_data = {"Data": []}
    for key, value in nf_result.items():
        index = 0
        if len(value) > 0:
            for rel in value:
                relation = {"relationName": relation_names[key][index], "attributes": [], "foreignKeys": []}
                if key.lower() != 'multi':
                    for attr in rel[0]:
                        relation["attributes"].append(get_attribute_detail(attr, "primary"))
                    for attr in rel[1]:
                        relation["attributes"].append(get_attribute_detail(attr, "none"))
                elif key.lower() == 'multi':
                    for arr in rel:
                        for attr in arr:
                            relation["attributes"].append(get_attribute_detail(attr, "primary"))
                if key.lower() != 'partial':
                    relation['foreignKeys'] = get_foreign_keys(rel, all_relations, relation_names[key][index][1])
                index += 1
                json_data['Data'].append(relation)

    print_data(json_data, all_relations)
    return json_data
    # print(json_data)


def print_data(Data, all_relations):
    fk = []
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
