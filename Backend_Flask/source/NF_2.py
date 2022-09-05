from copy import copy
from source.normalizedRelation import NormalizedRelation
from copy import deepcopy


class Nf2nd(NormalizedRelation):
    def __init__(self, my_rel) -> None:
        super().__init__(relation=my_rel)
        self.__nf_2_result = None
        self.minimal_cover_res = deepcopy(super().get_minimal_cover_result())

    def get_nf_2_result(self):
        return self.__nf_2_result

    @staticmethod
    def check_fd_in_partial(fd, partial):
        index = -1
        for i in range(len(partial)):
            if fd == partial[i][0]:
                index = i
        return index

    @staticmethod
    def check_attr_in_partial_rhs(fd_lhs, partial_relations):
        index = -1
        for i in range(len(partial_relations)):
            if set(fd_lhs).issubset(set(partial_relations[i][1])):
                index = i
        return index

    def find_nf_2(self):
        result = {}
        my_relation = super().get_relation()
        multi_value = my_relation.get_attr_info()['multi_value']
        primary = set(my_relation.get_attr_info()['primary'])
        fully_dependent_rel = [[]]
        multi_value_rel = []
        full_dependent_rhs = []
        partially_dependent_rel = []
        remaining_fds = []

        for fd in copy(self.minimal_cover_res):
            if len(fd) > 0:
                if fd[1][0] in multi_value:
                    multi_value_rel.append(fd)
                if fd[1][0] not in multi_value:
                    if set(fd[0]) == primary:
                        full_dependent_rhs.append(fd[1][0])
                        fully_dependent_rel = [fd[0]]
                    self.__append_partial_dependent(fd, partially_dependent_rel, primary)
                    self.__append_remaining_fds(fd, remaining_fds, full_dependent_rhs, primary)

        self.handle_remaining_fd(full_dependent_rhs, partially_dependent_rel, remaining_fds)

        fully_dependent_rel = [[fully_dependent_rel[0], full_dependent_rhs]]

        fully_dependent_rel = self.__get_fully_dependent_rel(full_dependent_rhs, fully_dependent_rel, primary)

        result['full'] = fully_dependent_rel
        result['partial'] = partially_dependent_rel
        result['multi'] = multi_value_rel

        return result

    @staticmethod
    def __get_fully_dependent_rel(full_dep_rhs, fully_dependent_rel, primary):
        if len(fully_dependent_rel[0][0]) == 0 and len(fully_dependent_rel[0][1]) == 0:
            fully_dependent_rel = [[list(primary), []]]
        elif len(fully_dependent_rel[0][0]) == 0 and len(fully_dependent_rel[0][1]) != 0:
            fully_dependent_rel = [[list(primary), full_dep_rhs]]
        return fully_dependent_rel

    def handle_remaining_fd(self, full_dep_rhs, partially_dependent_rel, remaining_fds):
        for fd in remaining_fds:
            if set(fd[0]).issubset(set(full_dep_rhs)):
                full_dep_rhs.append(fd[1][0])
            else:
                index = self.check_attr_in_partial_rhs(fd[0], partially_dependent_rel)
                if index != -1:
                    partially_dependent_rel[index][1].append(fd[1][0])
                # else:
                #     print(fd)

    @staticmethod
    def __append_remaining_fds(fd, remaining_fds, full_dependent_rhs, primary):
        if not (set(fd[0]) != primary and set(fd[0]).issubset(primary)):
            if fd[1][0] not in full_dependent_rhs and fd[1][0] not in primary:
                remaining_fds.append(fd)
            # full_dependent_rhs.append(fd[1][0])


    def __append_partial_dependent(self, fd, partial, primary):
        if set(fd[0]) != primary and set(fd[0]).issubset(primary):
            index = self.check_fd_in_partial(fd[0], partial)
            if index != -1:
                partial[index][1].append(fd[1][0])
            else:
                partial.append(fd)
