from copy import deepcopy


class AttributeDependency:

    def __init__(self, func_dep):
        self.__func_dep = func_dep

    def set_func_dep(self, func_dep):
        self.__func_dep = func_dep

    def get_func_dep(self):
        return self.__func_dep

    def add_dependency(self, dep):
        fd_list = list(deepcopy(self.get_func_dep()))
        fd_list.append(dep)
        self.set_func_dep(fd_list)

    def remove_dependency(self, dep):
        fd_list = list(deepcopy(self.get_func_dep()))
        fd_list.remove(dep)
        self.set_func_dep(fd_list)

    def __str__(self):
        return f'Functional Dependency List is \n{self.get_func_dep()}'
