import sys
from fdtool.tane import Tane
from source.normalizedRelation import NormalizedRelation
import csv


def read_csv_file():
    global fields
    with open('fdtool/D.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        fields = next(csv_reader)
        for row in csv_reader:
            data.append(row)


def generate_new_fields():
    alphabet = {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h', 9: 'i', 10: 'j', 11: 'k', 12: 'l',
                13: 'm',
                14: 'n', 15: 'o', 16: 'p', 17: 'q', 18: 'r', 19: 's', 20: 't', 21: 'u', 22: 'v', 23: 'w', 24: 'x',
                25: 'y',
                26: 'z'}
    count = 1
    for i in fields:
        new_fields[alphabet[count].upper()] = i
        count += 1
    # print(new_fields)


def write_new_csv():
    with open('fdtool/s.csv', 'w+', newline='') as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow(list(new_fields.keys()))
        for row in data:
            csv_writer.writerow(row)


def find_fds_by_tane():
    read_csv_file()
    generate_new_fields()
    write_new_csv()
    tane_algo = Tane('s.csv', 'Dataset')
    tane_algo.find_fds()


def find_fds_by_fdtool():
    pass


def minimal_cover_filter():
    file = open('fdtool/FD_Info.txt', 'r')
    table_name = file.readline().split(' : ')[1].replace('\n', '')
    attribute_names = tuple(file.readline().rsplit(' : ')[1].replace('\n', '').split(', '))
    file.readline()
    fds = []
    if "Functional Dependencies" in file.readline():
        for fd in file.readlines():
            if fd == '\n':
                break
            line = fd.split(' -> ')
            lhs = set(line[0].replace('{', '').replace('}', '').split(', '))
            rhs = set(line[1].replace('\n', '').replace('{', '').replace('}', '').split(', '))
            fds.append([lhs, rhs])

    n = NormalizedRelation(fd=fds)
    d = n.get_minimal_cover_result()
    for i in d:
        if len(i) != 0:
            print(i)


data = []
fields = []
new_fields = {}

if len(sys.argv) > 1:
    if sys.argv[1] == 'tane':
        find_fds_by_tane()
    elif sys.argv[1] == 'fdtool':
        find_fds_by_fdtool()
    else:
        find_fds_by_fdtool()
else:
    find_fds_by_fdtool()

minimal_cover_filter()
