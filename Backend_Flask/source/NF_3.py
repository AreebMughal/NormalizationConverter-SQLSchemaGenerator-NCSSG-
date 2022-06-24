from source.NF_2 import Nf2nd
from source.normalizedRelation import NormalizedRelation


class Nf3rd(NormalizedRelation):
    def __init__(self, my_rel) -> None:
        super().__init__(my_rel)
        self.__nf_3_result = None

    def get_nf_3_result(self):
        return self.__nf_3_result

    @staticmethod
    def check_fd_in_transitive(fd, transitive):
        index = -1
        for i in range(len(transitive)):
            if fd == transitive[i][0]:
                index = i
        return index

    def find_nf_3(self):
        nf_2 = Nf2nd(my_rel=super().get_relation())
        result = nf_2.find_nf_2()

        my_relation = super().get_relation()
        primary = set(my_relation.get_primary_keys())
        multi_valued = set(my_relation.get_multi_valued_attribute())
        fully_dependent = []
        transitive = []
        for fd in super().get_minimal_cover_result():
            if not set(fd[1]).issubset(multi_valued):
                self.__append_fully_dependent(fd, fully_dependent, primary)
                self.__append_transitive_dependent(fd, primary, transitive)

        result['full'] = self.__get_fully_dependent_relation(fully_dependent)
        result['transitive'] = self.__get_transitive_relation(transitive)

        return result

    def __append_transitive_dependent(self, fd, primary, transitive):
        if not set(fd[0]).issubset(primary):
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

    @staticmethod
    def __get_transitive_relation(transitive):
        if len(transitive) == 0:
            transitive = []
        return transitive

    @staticmethod
    def __get_fully_dependent_relation(fully_dependent):
        if len(fully_dependent) == 0:
            fully_dependent = []
        return fully_dependent
