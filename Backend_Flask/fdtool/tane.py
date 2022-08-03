"""------------------------------------------------------------------------------------------
TANE Algorithm for discovery of exact functional dependencies
Author: Nabiha Asghar, nasghar@uwaterloo.ca
February 2015
Use for research purposes only.
Please do not re-distribute without written permission from the author
Any commerical uses strictly forbidden.
Code is provided without any guarantees.
----------------------------------------------------------------------------------------------"""
from pandas import *
from collections import defaultdict
import sys


class Tane:

    def __init__(self, file_name, table_name):
        self.file = open('fdtool/FD_Info.txt', 'w+')
        self.file.write('Table : ' + table_name + '\n')
        self.data_2D = read_csv('fdtool/'+file_name)
        self.total_tuples = len(self.data_2D.index)
        self.list_of_columns = list(self.data_2D.columns.values)  # returns ['A', 'B', 'C', 'D', .....]
        self.table_t = ['NULL'] * self.total_tuples  # this is for the table T used in the function stripped_product

        self.dict_c_plus = {'NULL': self.list_of_columns}
        self.dict_partitions = {}  # maps 'stringslikethis' to a list of lists, each of which contains indices
        self.computeSingletonPartitions()
        self.final_list_of_FDs = []
        # print dict_c_plus['NULL']

    def find_fds(self):
        L0 = []
        L1 = self.list_of_columns[:]  # L1 is a copy of list_of_columns
        index = 1
        L = [L0, L1]

        while not (L[index] == []):
            self.compute_dependencies(L[index], self.list_of_columns[:])
            self.prune(L[index])
            temp = self.generate_next_level(L[index])
            L.append(temp)
            index = index + 1

        print("List of all FDs: ", self.final_list_of_FDs)
        print("Total number of FDs found: ", len(self.final_list_of_FDs))

        self.file.write(
            'Columns : ' + str(self.list_of_columns).replace('[', '').replace(']', '').replace("'", '') + '\n\n')
        self.file.write('Functional Dependencies: \n')

        for fd in self.final_list_of_FDs:
            lhs = ', '.join(fd[0])
            rhs = fd[1]
            self.file.write('{' + lhs + '} -> {' + rhs + '}\n')

        self.file.write('\n')
        self.file.write('#by tane')
        self.file.close()

    @staticmethod
    def list_duplicates(seq):
        tally = defaultdict(list)
        for i, item in enumerate(seq):
            tally[item].append(i)
        return ((key, locs) for key, locs in tally.items()
                if len(locs) > 0)

    def find_C_plus(self, x):  # this computes the Cplus of x as an intersection of smaller Cplus sets
        thesets = []
        for a in x:
            if x.replace(a, '') in self.dict_c_plus.keys():
                temp = self.dict_c_plus[x.replace(a, '')]
            else:
                temp = self.find_C_plus(x.replace(a, ''))  # compute C+(X\{A}) for each A at a time
            # dictCplus[x.replace(a,'')] = temp
            thesets.insert(0, set(temp))
        if list(set.intersection(*thesets)) == []:
            cplus = []
        else:
            cplus = list(set.intersection(*thesets))  # compute the intersection in line 2 of pseudocode
        return cplus

    def compute_dependencies(self, level, listofcols):
        for x in level:
            thesets = []
            for a in x:
                if x.replace(a, '') in self.dict_c_plus.keys():
                    temp = self.dict_c_plus[x.replace(a, '')]
                else:
                    temp = self.computeCplus(x.replace(a, ''))  # compute C+(X\{A}) for each A at a time
                    self.dict_c_plus[x.replace(a, '')] = temp
                thesets.insert(0, set(temp))
            if list(set.intersection(*thesets)) == []:
                self.dict_c_plus[x] = []
            else:
                self.dict_c_plus[x] = list(
                    set.intersection(*thesets))  # compute the intersection in line 2 of pseudocode
        for x in level:
            for a in x:
                if a in self.dict_c_plus[x]:
                    # if x=='BCJ': print "dictCplus['BCJ'] = ", dictCplus[x]
                    if self.validfd(x.replace(a, ''), a):  # line 5
                        self.final_list_of_FDs.append([x.replace(a, ''), a])  # line 6
                        self.dict_c_plus[x].remove(a)  # line 7

                        listofcols = self.list_of_columns[:]
                        for j in x:  # this loop computes R\X
                            if j in listofcols: listofcols.remove(j)

                        for b in listofcols:  # this loop removes each b in R\X from C+(X)
                            if b in self.dict_c_plus[x]: self.dict_c_plus[x].remove(b)

    # this computes the Cplus from the first definition in section 3.2.2 of TANE paper.
    # output should be a list of single attributes
    def computeCplus(self, x):
        listofcols = self.list_of_columns[:]
        if x == '': return listofcols  # because C+{phi} = R
        cplus = []
        for a in listofcols:
            for b in x:
                temp = x.replace(a, '')
                temp = temp.replace(b, '')
                if not self.validfd(temp, b):
                    cplus.append(a)
        return cplus

    def validfd(self, y, z):
        if y == '' or z == '': return False
        ey = self.computeE(y)
        eyz = self.computeE(y + z)
        if ey == eyz:
            return True
        else:
            return False

    def computeE(self, x):
        doublenorm = 0
        for i in self.dict_partitions[''.join(sorted(x))]:
            doublenorm = doublenorm + len(i)
        e = (doublenorm - len(self.dict_partitions[''.join(sorted(x))])) / float(self.total_tuples)
        return e

    def check_superkey(self, x):
        if (self.dict_partitions[x] == [[]]) or (self.dict_partitions[x] == []):
            return True
        else:
            return False

    def prune(self, level):
        stufftobedeletedfromlevel = []
        for x in level:  # line 1
            if self.dict_c_plus[x] == []:  # line 2
                level.remove(x)  # line 3
            if self.check_superkey(x):  # line 4   ### should this check for a key, instead of super key??? Not sure.
                temp = self.dict_c_plus[x][:]
                for i in x:  # this loop computes C+(X) \ X
                    if i in temp: temp.remove(i)
                for a in temp:  # line 5
                    thesets = []
                    for b in x:
                        if not (''.join(sorted((x + a).replace(b, ''))) in self.dict_c_plus.keys()):
                            self.dict_c_plus[''.join(sorted((x + a).replace(b, '')))] = self.find_C_plus(
                                ''.join(sorted((x + a).replace(b, ''))))
                        thesets.insert(0, set(self.dict_c_plus[''.join(sorted((x + a).replace(b, '')))]))
                    if a in list(set.intersection(*thesets)):  # line 6
                        self.final_list_of_FDs.append([x, a])  # line 7
                # print "adding key FD: ", [x,a]
                if x in level: stufftobedeletedfromlevel.append(x)  # line 8
        for item in stufftobedeletedfromlevel:
            level.remove(item)

    def generate_next_level(self, level):
        nextlevel = []
        for i in range(0, len(level)):  # pick an element
            for j in range(i + 1, len(level)):  # compare it to every element that comes after it.
                if (not level[i] == level[j]) and level[i][0:-1] == level[j][0:-1]:  # i.e. line 2 and 3
                    x = level[i] + level[j][-1]  # line 4
                    flag = True
                    for a in x:  # this entire for loop is for the 'for all' check in line 5
                        if not (x.replace(a, '') in level):
                            flag = False
                    if flag == True:
                        nextlevel.append(x)
                        self.stripped_product(x, level[i], level[j])
                        # compute partition of x as pi_y * pi_z (where y is level[i] and z is level[j])
        return nextlevel

    def stripped_product(self, x, y, z):

        tableS = [''] * len(self.table_t)
        partitionY = self.dict_partitions[
            ''.join(sorted(y))]  # partitionY is a list of lists, each list is an equivalence class
        partitionZ = self.dict_partitions[''.join(sorted(z))]
        partitionofx = []  # line 1
        for i in range(len(partitionY)):  # line 2
            for t in partitionY[i]:  # line 3
                self.table_t[t] = i
            tableS[i] = ''  # line 4
        for i in range(len(partitionZ)):  # line 5
            for t in partitionZ[i]:  # line 6
                if not (self.table_t[t] == 'NULL'):  # line 7
                    tableS[self.table_t[t]] = sorted(list(set(tableS[self.table_t[t]]) | set([t])))
            for t in partitionZ[i]:  # line 8
                if (not (self.table_t[t] == 'NULL')) and len(tableS[self.table_t[t]]) >= 2:  # line 9
                    partitionofx.append(tableS[self.table_t[t]])
                if not (self.table_t[t] == 'NULL'): tableS[self.table_t[t]] = ''  # line 10
        for i in range(len(partitionY)):  # line 11
            for t in partitionY[i]:  # line 12
                self.table_t[t] = 'NULL'
        self.dict_partitions[''.join(sorted(x))] = partitionofx

    def computeSingletonPartitions(self):
        for a in self.list_of_columns:
            self.dict_partitions[a] = []
            # list_duplicates returns 2-tuples, where 1st is a value, and
            # 2nd is a list of indices where that value occurs
            for element in self.list_duplicates(self.data_2D[a].tolist()):
                if len(element[1]) > 1:  # ignore singleton equivalence classes
                    self.dict_partitions[a].append(element[1])
