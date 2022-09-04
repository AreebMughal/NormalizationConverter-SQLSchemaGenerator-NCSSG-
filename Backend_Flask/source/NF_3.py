from copy import deepcopy, copy

from source.NF_2 import Nf2nd
from source.normalizedRelation import NormalizedRelation


class Nf3rd(NormalizedRelation):
    def __init__(self, my_rel) -> None:
        super().__init__(relation=my_rel)
        self.__nf_3_result = None
        self.my_relation = super().get_relation()
        # self.minimal_cover_res = deepcopy(super().get_minimal_cover_result())
        self.minimal_cover_res = None

        # print(self.minimal_cover_res)

    def get_nf_3_result(self):
        return self.__nf_3_result

    @staticmethod
    def check_fd_in_transitive(fd, transitive):
        index = -1
        for i in range(len(transitive)):
            if fd == transitive[i][0]:
                index = i
        return index

    @staticmethod
    def check_fd_in_partial(fd, partial):
        index = -1
        for i in range(len(partial)):
            if fd == partial[i][0]:
                index = i
        return index

    def find_nf_3(self):

        nf_2 = Nf2nd(my_rel=super().get_relation())
        result = nf_2.find_nf_2()
        self.minimal_cover_res = deepcopy(super().get_minimal_cover_result())

        my_relation = super().get_relation()
        primary = set(my_relation.get_primary_keys())
        multi_valued = set(my_relation.get_multi_valued_attribute())
        fully_dependent = []
        transitive = []
        partial = []

        for fd in copy(self.minimal_cover_res):
            if not set(fd[1]).issubset(multi_valued):
                self.__append_fully_dependent(fd, fully_dependent, primary)
                self.__append_transitive_dependent(fd, primary, transitive)
                self.__append_partial_dependent(fd, primary, partial, nf_2)

        result['full'] = self.__get_fully_dependent_relation(fully_dependent)
        result['transitive'] = self.__get_transitive_relation(transitive)
        result['partial'] = partial
        return result

    def __append_transitive_dependent(self, fd, primary, transitive):
        if not set(fd[0]).issubset(primary) and not set(fd[1]).issubset(primary):
            index = self.check_fd_in_transitive(fd[0], transitive)
            if index != -1:
                transitive[index][1].append(fd[1][0])
            else:
                transitive.append(fd)

    @staticmethod
    def __append_fully_dependent(fd, fully_dependent, primary):
        if set(fd[0]) == primary:
            if len(fully_dependent) == 0:
                fully_dependent.append(fd)
            else:
                fully_dependent[0][1].append(fd[1][0])


    def __append_partial_dependent(self, fd, primary, partial, nf2_obj):
        # print(fd[0], fd[1], set(fd[0]) != primary and set(fd[0]).issubset(primary))
        if set(fd[0]) != primary and set(fd[0]).issubset(primary):
            index = self.check_fd_in_partial(fd[0], partial)
            if index != -1:
                partial[index][1].append(fd[1][0])
            else:
                partial.append(fd)

    @staticmethod
    def __get_transitive_relation(transitive):
        if len(transitive) == 0:
            transitive = []
        return transitive

    def __get_fully_dependent_relation(self, fully_dependent):
        if len(fully_dependent) == 0:
            fully_dependent = [[self.my_relation.get_attr_info()['primary'], []]]
        return fully_dependent
