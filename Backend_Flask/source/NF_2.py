from source.normalizedRelation import NormalizedRelation


class Nf2nd(NormalizedRelation):
    def __init__(self, my_rel) -> None:
        super().__init__(relation=my_rel)
        self.__nf_2_result = None

    def get_nf_2_result(self):
        return self.__nf_2_result

    @staticmethod
    def check_fd_in_partial(fd, partial):
        index = -1
        for i in range(len(partial)):
            if fd == partial[i][0]:
                index = i
        return index

    def find_nf_2(self):
        result = {}
        minimal_cover_res = super().get_minimal_cover_result()
        my_relation = super().get_relation()
        multi_value = my_relation.get_attr_info()['multi_value']
        primary = set(my_relation.get_attr_info()['primary'])

        fully_dependent_rel = [[]]
        multi_value_rel = []
        full_dependent_rhs = []
        partially_dependent_rel = []
        for fd in minimal_cover_res:
            if len(fd) > 0:
                if fd[1][0] in multi_value:
                    multi_value_rel.append(fd)
                if fd[1][0] not in multi_value:
                    if set(fd[0]) == primary:
                        full_dependent_rhs.append(fd[1][0])
                        fully_dependent_rel = [fd[0]]

                    if set(fd[0]) != primary and set(fd[0]).issubset(primary):
                        index = self.check_fd_in_partial(fd[0], partially_dependent_rel)
                        if index != -1:
                            partially_dependent_rel[index][1].append(fd[1][0])
                        else:
                            partially_dependent_rel.append(fd)
                    else:
                        if fd[1][0] not in full_dependent_rhs and fd[1][0] not in primary:
                            full_dependent_rhs.append(fd[1][0])

        fully_dependent_rel = [[fully_dependent_rel[0], full_dependent_rhs]]
        if len(fully_dependent_rel[0][0]) == 0:
            fully_dependent_rel = [[my_relation.get_attr_info()['primary']]]
        result['full'] = fully_dependent_rel
        result['partial'] = partially_dependent_rel
        result['multi'] = multi_value_rel

        return result
