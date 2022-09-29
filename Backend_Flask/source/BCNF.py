from source.StaticMethods import convert_to_array
from source.NF_3 import Nf3rd
from source.normalizedRelation import NormalizedRelation


class BcNf(NormalizedRelation):
    def __init__(self, my_rel) -> None:
        super().__init__(relation=my_rel)
        self.__bcnf_result = None

    def get_BCNF_result(self):
        return self.__bcnf_result

    @staticmethod
    def check_fd_in_primeDep(fd, primeDep):

        index = -1
        for i in range(len(primeDep)):
            print(primeDep[i][0])
            if fd == primeDep[i][0]:
                index = i
        return index

    def find_bcnf(self):
        nf_3 = Nf3rd(my_rel=super().get_relation())
        result = nf_3.find_nf_3()
        my_relation = super().get_relation()
        primary = set(my_relation.get_primary_keys())
        NotprimeDep = []
        primeDep = []
        for fd in super().get_minimal_cover_result():
            if len(fd) > 0:
                self.checkPrimaryKeyDependency(fd, primary, primeDep)
                self.checkNonPrimaryKeyDependency(fd, primary, NotprimeDep)
        print(primeDep)

        print(NotprimeDep)

        result['primeDependency'] = self.__get_prime_relation(primeDep)
        # result['noPrimeDependency'] = self.__get_NotPrime_dependent_relation(NotprimeDep)
        print(result)
        return result

    def checkPrimaryKeyDependency(self, fd, primary, primeDep):
        if set(fd[1]).issubset(primary) or set(fd[1]) == (primary):
            primeDep.append(fd)

    @staticmethod
    def checkNonPrimaryKeyDependency(fd, primary, NotprimeDep):
        if not set(fd[1]).issubset(primary) or set(fd[1]) == (primary):
            NotprimeDep.append(fd)

    @staticmethod
    def __get_prime_relation(primeDep):
        if len(primeDep) == 0:
            primeDep = []
        return primeDep

    @staticmethod
    def __get_NotPrime_dependent_relation(NotPrimeDep):
        if len(NotPrimeDep) == 0:
            NotPrimeDep = []
        return NotPrimeDep
