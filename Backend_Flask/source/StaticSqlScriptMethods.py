def script_header():
    return '-- NC-SSG SQL dump \n\n' \
           'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; \n' \
           'START TRANSACTION; \n' \
           'SET time_zone = "+00:00"; \n\n'


def comment_line():
    return '-- --------------------------------------------------------' + '\n'


def comment_table_header(table_name):
    return '\n' + '-- \n' \
                  f'-- Table structure for table `{table_name}` \n' \
                  '-- \n' \
                  '\n'


def comment_index_header(table_name):
    return '\n' + '-- \n' \
                  f'-- Indexes for table `{table_name}` \n' \
                  '-- \n'


def comment_constraint_header(table_name):
    return '\n' + '-- \n' \
                  f'-- Constraint for table `{table_name}` \n' \
                  '-- \n'


def get_dumped_table_header(value):
    return '-- \n' \
           f'-- {value} for dumped tables \n' \
           '-- \n\n'


def get_line_terminator(other, last, condition):
    return last if condition else other


def get_default_length(data_type):
    length = ''
    if data_type == 'int':
        length = '(11)'
    elif data_type == 'tinyint':
        length = '(4)'
    elif data_type == 'smallint':
        length = '(6)'
    elif data_type == 'mediumint':
        length = '(9)'
    elif data_type == 'bigint':
        length = '(20)'
    elif data_type == 'decimal':
        length = '(10, 0)'
    elif data_type == 'boolean':
        length = '(1)'
    elif data_type == 'serial':
        length = '(20)'
    return length


def get_attribute_type(data_type):
    new_data_type = data_type
    if data_type == 'serial':
        new_data_type = 'bigint'
    elif data_type == 'real':
        new_data_type = 'double'
    elif data_type == 'boolean':
        new_data_type = 'tinyint'
    return new_data_type
