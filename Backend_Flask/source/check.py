#
# from AttrDependency import AttrDependency
#
# object = AttrDependency([])
# object.add_dependency([{'ssn'}, {'ename'}])
# object.add_dependency([{'ssn'}, {'email'}])
# print(object)
# object.remove_dependency([{'ssn'}, {'ename'}])
# print(object)


from NF_2 import NF2

fds = [
    [{'A'}, {'B'}],
    [{'A', 'B', 'C', 'D'}, {'E'}],
    [{'E', 'F'}, {'G'}],
    [{'E', 'F'}, {'H'}],
    [{'A', 'C', 'D', 'F'}, {'E'}],
    [{'A', 'C', 'D', 'F'}, {'G'}],
]
object = NF2(fds)
object.find_nf_2()