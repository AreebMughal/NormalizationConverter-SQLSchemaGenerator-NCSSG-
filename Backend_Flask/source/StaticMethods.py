def convert_to_array(fds):
    for i in range(0, len(fds)):
        for j in range(0, len(fds[i])):
            x = list(fds[i][j])
            fds[i][j] = sorted(x)

    return fds


def convert_to_json(fds):
    converted_json = {}
    counter = 1
    convert_to_array(fds)

    for fd in fds:
        if len(fd) > 0:
            converted_json[str(counter)] = fd
            counter += 1

    return converted_json


def check_fd_in_relation(fd, relation):
    index = -1
    for i in range(len(relation)):
        if fd == relation[i][0]:
            index = i
    return index


def get_dummy_nf_result():
    return {
        'full': [
            [['pnum', 'ssn'], ['name']]
        ],
        'partial': [
            [['ssn'], ['id']],
            [['pnum'], ['ploc', 'pname']]
        ],
        'multi': [
            [['pnum', 'ssn'], ['email']],
            [['ssn'], ['address']]
        ],
        'transitive': [
            [['id'], ['dnum']],
            [['dnum'], ['dloc', 'dname']]
        ]
    }
