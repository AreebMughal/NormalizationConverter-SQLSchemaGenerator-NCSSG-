from source.StaticMethods import convert_to_array
from source.normalizedRelation import NormalizedRelation


class Nf1st(NormalizedRelation):
    def __init__(self, my_rel) -> None:
        super().__init__(relation=my_rel)
        self.__nf_1_result = None

    def get_nf_1_result(self):
        return self.__nf_1_result

    def find_nf_1(self):
        minimal_cover_res = convert_to_array(super().get_minimal_cover_result())
        my_relation = super().get_relation()
        primary = my_relation.get_attr_info()['primary']
        attributes = my_relation.get_attr_info()['attributes']
        print(minimal_cover_res)

        full_dependent_rhs = []
        minimal_cover_res_attr = []
        for fd in minimal_cover_res:
            if len(fd) > 0:
                if fd[0] not in minimal_cover_res_attr:
                    minimal_cover_res_attr.append(fd[0][0])
                if fd[1] not in minimal_cover_res_attr:
                    minimal_cover_res_attr.append(fd[1][0])

        print('Attributes:', attributes)
        print('Minimal Cover Attributes:', minimal_cover_res_attr)

        for attr in attributes:
            if attr in minimal_cover_res_attr and attr not in primary:
                full_dependent_rhs.append(attr)

        fully = [[primary, full_dependent_rhs]]
        print('End Result:', fully)

        return {'full': fully}
