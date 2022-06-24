from copy import deepcopy
from source.StaticMethods import convert_to_json
from source.StaticMethods import convert_to_array


class NormalizedRelation:
    def __init__(self, relation):
        self.__relation = relation
        self.fds = (relation.get_attribute_dependency()).get_func_dep()
        self.minimal_cover = self.get_minimal_cover()

    def get_fd(self):
        return self.fds

    def get_relation(self):
        return self.__relation

    def get_minimal_cover_result(self):
        return convert_to_array(self.minimal_cover)

    def attribute_closure(self, fds, find_closure_of):
        result = find_closure_of
        old_result = set()
        while old_result != result:
            old_result = result
            for fd in fds:
                lhs = fd[0]
                rhs = fd[1]
                if lhs.issubset(result):
                    result = result.union(rhs)
        return result

    def find_candidate_key(self):
        attributes_set = set(self.get_relation().get_attr_info()['attributes'])
        rhs = {list(fd[1])[0] for fd in self.fds}
        candidate_key = attributes_set.difference(rhs)
        print('Candidate Key: ', candidate_key)

    def remove_trivial(self):
        self.fds = [fd for fd in self.fds if not fd[1].issubset(fd[0])]

    def remove_transitivity(self):
        for i in range(len(self.fds)):
            lhs = self.fds[i][0]
            rhs = self.fds[i][1]
            my_set = lhs.union(rhs)
            for j in range(len(self.fds)):
                fd = self.fds[j]
                if my_set.issubset(fd[0]):
                    # new_fd = [fd[0].difference(my_set).union(lhs), fd[1]]
                    self.fds[j] = [fd[0].difference(my_set).union(lhs), fd[1]]

    def check_same_rhs(self):
        min_lhs_fds = []
        for fd in self.fds:
            li = [f[1] for f in self.fds if f[1] == fd[1]]
            if len(li) > 1:
                rhs = li[0]
                all_lhs_of_same_rhs = [f[0] for f in self.fds if f[1] == rhs]
                min_lhs = min(all_lhs_of_same_rhs, key=len)
                new_fd = [min_lhs, rhs]
                if new_fd not in min_lhs_fds:
                    min_lhs_fds.append(new_fd)

        # Now replace maximum lhs of same rhs with minimum lhs
        for i in range(len(self.fds)):
            fd = self.fds[i]
            for f in min_lhs_fds:
                if f[1] == fd[1]:
                    self.fds[i][0] = f[0]

    def step1_minimal_cover(self):
        return self.fds

    def step2_minimal_cover(self):
        self.remove_trivial()
        self.remove_transitivity()
        self.check_same_rhs()
        return self.fds

    def fd_closure(self, fds, index):
        new_fds = []
        for i in range(len(fds)):
            fd = fds[i]
            if i != index and len(fd) != 0:
                new_fds.append(fd)
        # print('new Fds' , new_fds)
        return self.attribute_closure(new_fds, fds[index][0])

    def step3_minimal_cover(self):
        for i in range(len(self.fds)):
            if i < len(self.fds):
                rhs = self.fds[i][1]
                closure = self.fd_closure(self.fds, i)
                # print(f'closure set of {lhs}: ', closure)
                if rhs.issubset(closure):
                    self.fds[i] = []
        return self.fds

    def get_minimal_cover_JSON(self):
        return {
            'step_1': convert_to_json(deepcopy(self.step1_minimal_cover())),
            'step_2': convert_to_json(deepcopy(self.step2_minimal_cover())),
            'step_3': convert_to_json(deepcopy(self.step3_minimal_cover()))
        }

    def get_minimal_cover(self):
        self.step1_minimal_cover()
        self.step2_minimal_cover()
        return self.step3_minimal_cover()
