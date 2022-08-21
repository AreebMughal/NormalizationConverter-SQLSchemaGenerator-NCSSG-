from operator import mod

import numpy
from numpy.ma import shape

from fdtool.fdtool import find_fdtool
from fdtool.tane import Tane
from source.normalizedRelation import NormalizedRelation
import csv


class FdsMiner:

    def __init__(self, file_path, algo_type):
        self.file_path = file_path
        self.algo_type = algo_type
        self.data = []
        self.new_fields = {}
        self.fields = []
        self.data_dict = {
            'relationName': '',
            'inputBoxes': []
        }
        self.frequent_keys = ''

    def read_csv_file(self):
        with open(self.file_path, 'r') as csv_file:
            csv_reader = csv.reader(csv_file)
            self.fields = next(csv_reader)
            for row in csv_reader:
                self.data.append(row)

    def generate_new_fields(self):
        alphabet = {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h', 9: 'i', 10: 'j', 11: 'k', 12: 'l',
                    13: 'm', 14: 'n', 15: 'o', 16: 'p', 17: 'q', 18: 'r', 19: 's', 20: 't', 21: 'u', 22: 'v',
                    23: 'w', 24: 'x', 25: 'y', 26: 'z'}
        count = 1
        for i in self.fields:
            self.new_fields[alphabet[count].upper()] = i
            count += 1
        # print(new_fields)

    def write_new_csv(self):
        with open('./datasets/newDataset.csv', 'w+', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            csv_writer.writerow(list(self.new_fields.keys()))
            for row in self.data:
                csv_writer.writerow(row)

    def find_fds_by_tane(self):
        self.read_csv_file()
        self.generate_new_fields()
        self.write_new_csv()
        tane_algo = Tane('./datasets/newDataset.csv', self.file_path.split('/')[2].split('.')[0])
        tane_algo.find_fds()

    def find_fds_by_fdtool(self):
        find_fdtool(self.file_path)

    @staticmethod
    def print_data(data):
        for i in data:
            if len(i) != 0:
                print(i)

    def revert_fields_name(self, minimal_cover_result):
        new_result = []
        for fd in minimal_cover_result:
            if len(fd) != 0:
                lhs = []
                rhs = []
                for el in fd[0]:
                    lhs.append(self.new_fields[el])
                for el in fd[1]:
                    rhs.append(self.new_fields[el])
                new_result.append([lhs, rhs])
        return new_result

    def create_input_boxes(self, attribute_names):
        id = 1
        for attr in attribute_names:
            input_box = {
                'id': id,
                'value': attr,
                'width': 90,
                'dependency': [],
                'primary': {attr}.issubset(self.frequent_keys),
                'multiValue': False,
            }
            self.data_dict['inputBoxes'].append(input_box)
            id += 1

    def get_id(self, element):
        for attribute in self.data_dict['inputBoxes']:
            if attribute['value'] == element:
                return attribute['id']

    def add_dependencies(self, fds):
        dependencies = []
        for fd in fds:
            lhs = []
            if len(fd) > 1:
                for ele in fd[0]:
                    lhs.append(self.get_id(ele))
                current_attr = self.get_id(fd[1][0])
                dependencies.append([lhs, current_attr])

        # print(dependencies)
        for dep in dependencies:
            # print(dep)
            self.data_dict['inputBoxes'][int(dep[1] - 1)]['dependency'].append(dep[0])

    def minimal_cover_filter(self):
        file = open('./fdtool/FD_Info.txt', 'r')
        table_name = file.readline().split(' : ')[1].replace('\n', '')
        attribute_names = tuple(file.readline().rsplit(' : ')[1].replace('\n', '').split(', '))
        file.readline()
        all_fds = self.read_all_fds(file)

        n = NormalizedRelation(fd=all_fds)
        fds = n.get_minimal_cover_result()
        # print(n.find_candidate_key(attributes_set=set(attribute_names)))
        if self.algo_type == 'tane':
            fds = self.revert_fields_name(fds[:])
            attribute_names = self.fields
        # self.print_data(fds)
        self.get_most_frequent_key(fds)
        self.data_dict['relationName'] = table_name
        self.create_input_boxes(attribute_names)
        self.add_dependencies(fds)


    def get_most_frequent_key(self, fds):
        keys = [set(fd[0]) for fd in fds if len(fd) != 0]
        unique_keys = []
        [unique_keys.append(key) for key in keys if key not in unique_keys]
        counts = numpy.zeros(len(unique_keys), dtype='int')
        for key in keys:
            if key in unique_keys:
                counts[unique_keys.index(key)] += 1
        self.frequent_keys = (unique_keys[numpy.where(counts == max(counts))[0][0]])
        # print(numpy.array(self.frequent_keys))


    @staticmethod
    def read_all_fds(file):
        all_fds = []
        if "Functional Dependencies" in file.readline():
            for fd in file.readlines():
                if fd == '\n':
                    break
                line = fd.split(' -> ')
                lhs = set(line[0].replace('{', '').replace('}', '').split(', '))
                rhs = set(line[1].replace('\n', '').replace('{', '').replace('}', '').split(', '))
                all_fds.append([lhs, rhs])
        return all_fds

    def fd_mining(self):
        if self.algo_type == 'tane':
            self.find_fds_by_tane()
        else:
            self.find_fds_by_fdtool()

        self.minimal_cover_filter()
        return {'data': self.data_dict, 'keys': list(self.frequent_keys)}

# fds = [
#            [['ssn'], ['Address1']],
#            [['ssn'], ['Name']],
#            [['ssn'], ['Email1']],
#            [['Name', 'ssn'], ['Email1']],
#            [['ssn'], ['pname']],
#            [['ssn'], ['dname']],
#            [['ssn'], ['dnum']],
#            [['ssn'], ['Address2']],
#            [['ssn'], ['DId']],
#            [['ssn'], ['Email2']],
#            [['ssn'], ['ploc']],
#            [['Name'], ['ssn']],
#            [['ssn'], ['pnum']]
#        ]
