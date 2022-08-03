from source.normalizedRelation import NormalizedRelation


csv = 

file = open('fdtool/FD_Info.txt', 'r')

table_name = file.readline().split(' : ')[1].replace('\n', '')
print(table_name)

attribute_names = tuple(file.readline().rsplit(' : ')[1].replace('\n', '').split(', '))
print(attribute_names)

print(file.readline())
fds = []
if "Functional Dependencies" in file.readline():
    for fd in file.readlines():
        if fd == '\n':
            break
        line = fd.split(' -> ')

        lhs = set(line[0].replace('{', '').replace('}', '').split(', '))
        rhs = set(line[1].replace('\n', '').replace('{', '').replace('}', '').split(', '))
        fds.append([lhs, rhs])

print(fds)

n = NormalizedRelation(fd=fds)
d = n.get_minimal_cover_result()
for i in d:
    if len(i) != 0:
        print(i)
