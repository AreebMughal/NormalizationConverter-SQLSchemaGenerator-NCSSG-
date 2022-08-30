from source.AttributeDependency import AttributeDependency


class Relation:
    def __init__(self, rel_name, input_boxes) -> None:
        self.__rel_name = rel_name
        dic = self.extract_data(input_boxes)
        self.__attributes_name = dic['attributes']
        self.__primary_key = dic['primary']
        self.__multi_valued_attribute = dic['multi_value']
        self.__attribute_dependency = AttributeDependency(func_dep=dic['fds'])
        # self.__attribute_dependency = dic['fds']

    def get_rel_name(self):
        return self.__rel_name

    def get_attr_info(self):
        return {'attributes': self.__attributes_name, 'primary': self.__primary_key,
                'multi_value': self.__multi_valued_attribute}

    def get_primary_keys(self):
        return self.__primary_key

    def get_multi_valued_attribute(self):
        return self.__multi_valued_attribute

    def get_attributes_name(self):
        return self.__attributes_name

    def get_attribute_dependency(self):
        return self.__attribute_dependency

    def set_attribute_dependency(self, attribute_dependency):
        self.__attribute_dependency = attribute_dependency

    def extract_data(self, input_boxes):
        fds = []
        primary = []
        multi_value = []
        attributes = []
        for inputBox in input_boxes:
            attributes.append(inputBox['value'])
            if inputBox['primary']:
                primary.append(inputBox['value'])
            if inputBox['multiValue']:
                multi_value.append(inputBox['value'])
            for dep in inputBox['dependency']:
                if len(dep) > 0:
                    fds.append([set(dep), {inputBox['value']}])

        return {'fds': fds, 'primary': primary, 'multi_value': multi_value, 'attributes': tuple(attributes)}

    def __str__(self):
        return f'Relation Name: {self.get_rel_name()} \nAttributes Information: {self.get_attr_info()} \nFunctional ' \
               f'Dependencies: {self.get_attribute_dependency()} '
