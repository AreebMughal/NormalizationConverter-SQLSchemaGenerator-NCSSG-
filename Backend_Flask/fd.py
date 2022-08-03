# fd = [['A', 'C'], ['A', 'K'], ['A', 'D'], ['A', 'B'], ['A', 'G'], ['A', 'E'], ['A', 'M'], ['A', 'F'], ['A', 'I'], ['A', 'J'], ['A', 'L'], ['A', 'H'], ['C', 'B'], ['CD', 'K'], ['CD', 'A'], ['CD', 'G'], ['CD', 'E'], ['CD', 'M'], ['CD', 'F'], ['CD', 'I'], ['CD', 'J'], ['CD', 'L'], ['CD', 'H'], ['DF', 'B'], ['DF', 'G'], ['DF', 'H'], ['DF', 'I'], ['DF', 'J'], ['DF', 'K'], ['DEF', 'C'], ['DEF', 'A'], ['DEF', 'M'], ['DEF', 'L'], ['DFL', 'C'], ['DFL', 'A'], ['DFL', 'E'], ['DFL', 'M'], ['DFM', 'C'], ['DFM', 'A'], ['DFM', 'E'], ['DFM', 'L'], ['BDE', 'J'], ['BDL', 'J'], ['CGJ', 'E'], ['CGL', 'E'], ['CFJ', 'H'], ['CFL', 'H'], ['CFM', 'H'], ['CFJ', 'L'], ['CGJ', 'L'], ['CJM', 'H'], ['DEK', 'J'], ['DKM', 'I'], ['DKL', 'J'], ['FJK', 'H'], ['BDIL', 'E'], ['BDJM', 'E'], ['BDLM', 'E'], ['BEFJ', 'H'], ['BFJL', 'H'], ['BFKM', 'L'], ['CFGI', 'E'], ['CFGK', 'E'], ['CEFM', 'G'], ['CEFH', 'J'], ['CEFH', 'L'], ['CEFL', 'J'], ['CEFM', 'J'], ['CEFM', 'L'], ['CGHI', 'E'], ['CGHK', 'E'], ['CGIM', 'E'], ['CGKM', 'E'], ['CFGI', 'H'], ['CFGH', 'M'], ['CFGI', 'J'], ['CFGI', 'L'], ['CFGI', 'M'], ['CFGL', 'J'], ['CFGJ', 'M'], ['CFGL', 'M'], ['CFHI', 'L'], ['CFHK', 'J'], ['CFHK', 'L'], ['CFIM', 'J'], ['CFIJ', 'M'], ['CFIM', 'L'], ['CFKL', 'J'], ['CFKM', 'J'], ['CFLM', 'J'], ['CFKM', 'L'], ['CGLM', 'H'], ['CGLM', 'J'], ['CHLM', 'J'], ['DGHL', 'E'], ['DGIL', 'E'], ['DGJM', 'E'], ['DGLM', 'E'], ['EFGJ', 'H'], ['FGJL', 'H'], ['BDEHK', 'G'], ['BDEIK', 'M'], ['BDHIK', 'G'], ['BDHKM', 'G'], ['BDGIM', 'K'], ['BDIKL', 'M'], ['BEFGJ', 'M'], ['BEFIL', 'H'], ['BEFHK', 'L'], ['BEFIJ', 'M'], ['BEFJK', 'L'], ['BFGIL', 'H'], ['BFIKM', 'H'], ['BFILM', 'H'], ['CEFHI', 'G'], ['CEFIJ', 'G'], ['CEFIK', 'G'], ['CEFIL', 'G'], ['CEFIK', 'H'], ['CEFHI', 'M'], ['CEFIK', 'J'], ['CEFIK', 'L'], ['CEFIK', 'M'], ['CEFIL', 'M'], ['CFHIK', 'M'], ['CFIKL', 'M'], ['FGILM', 'H'], ['FIKLM', 'H'], ['BEFGHI', 'L'], ['BEFGHK', 'M'], ['BEFGIJ', 'L'], ['BEFGKL', 'M'], ['BEFHIK', 'M'], ['BEFIKL', 'M'], ['BFGHIM', 'L'], ['BFGIJL', 'M'], ['EFGHIM', 'L'], ['EFGHKL', 'M'], ['EFGIJM', 'L'], ['EFGJKL', 'M'], ['EFHIKM', 'L'], ['EFIJKM', 'L']]

# file = open('fd.txt', 'w+')

from source.normalizedRelation import NormalizedRelation
fds = [
    [{'A'}, {'C'}],
    [{'A'}, {'M'}],
    [{'A'}, {'J'}],
    [{'A'}, {'L'}],
    [{'A'}, {'I'}],
    [{'A'}, {'K'}],
    [{'A'}, {'D'}],
    [{'A'}, {'E'}],
    [{'A'}, {'G'}],
    [{'A'}, {'H'}],
    [{'A'}, {'B'}],
    [{'A'}, {'F'}],
    [{'C'}, {'B'}],
    [{'C', 'D'}, {'M'}],
    [{'C', 'D'}, {'J'}],
    [{'C', 'D'}, {'L'}],
    [{'C', 'D'}, {'I'}],
    [{'C', 'D'}, {'F'}],
    [{'C', 'D'}, {'E'}],
    [{'C', 'D'}, {'G'}],
    [{'C', 'D'}, {'H'}],
    [{'C', 'D'}, {'K'}],
    [{'C', 'D'}, {'A'}],
    [{'D', 'F'}, {'J'}],
    [{'D', 'F'}, {'I'}],
    [{'D', 'F'}, {'K'}],
    [{'D', 'F'}, {'G'}],
    [{'D', 'F'}, {'H'}],
    [{'D', 'F'}, {'B'}],
    [{'C', 'M', 'J'}, {'H'}],
    [{'C', 'M', 'F'}, {'H'}],
    [{'C', 'J', 'F'}, {'L'}],
    [{'C', 'J', 'F'}, {'H'}],
    [{'C', 'L', 'F'}, {'H'}],
    [{'M', 'F', 'D'}, {'C'}],
    [{'M', 'F', 'D'}, {'A'}],
    [{'M', 'F', 'D'}, {'L'}],
    [{'M', 'F', 'D'}, {'E'}],
    [{'L', 'F', 'D'}, {'C'}],
    [{'L', 'F', 'D'}, {'M'}],
    [{'L', 'F', 'D'}, {'A'}],
    [{'L', 'F', 'D'}, {'E'}],
    [{'F', 'D', 'E'}, {'C'}],
    [{'F', 'D', 'E'}, {'M'}],
    [{'F', 'D', 'E'}, {'L'}],
    [{'F', 'D', 'E'}, {'A'}],
    [{'C', 'J', 'G'}, {'L'}],
    [{'C', 'J', 'G'}, {'E'}],
    [{'C', 'L', 'G'}, {'E'}],
    [{'L', 'D', 'B'}, {'J'}],
    [{'D', 'E', 'B'}, {'J'}],
    [{'J', 'F', 'K'}, {'H'}],
    [{'M', 'D', 'K'}, {'I'}],
    [{'L', 'D', 'K'}, {'J'}],
    [{'D', 'E', 'K'}, {'J'}],
    [{'C', 'M', 'L', 'G'}, {'J'}],
    [{'C', 'M', 'L', 'G'}, {'H'}],
    [{'C', 'M', 'I', 'G'}, {'E'}],
    [{'C', 'M', 'K', 'G'}, {'E'}],
    [{'M', 'J', 'D', 'G'}, {'E'}],
    [{'M', 'L', 'D', 'G'}, {'E'}],
    [{'L', 'I', 'D', 'G'}, {'E'}],
    [{'C', 'M', 'L', 'H'}, {'J'}],
    [{'C', 'I', 'G', 'H'}, {'E'}],
    [{'C', 'K', 'G', 'H'}, {'E'}],
    [{'L', 'D', 'G', 'H'}, {'E'}],
    [{'M', 'J', 'D', 'B'}, {'E'}],
    [{'M', 'L', 'D', 'B'}, {'E'}],
    [{'L', 'I', 'D', 'B'}, {'E'}],
    [{'C', 'M', 'L', 'F'}, {'J'}],
    [{'C', 'M', 'I', 'F'}, {'J'}],
    [{'C', 'M', 'I', 'F'}, {'L'}],
    [{'C', 'J', 'I', 'F'}, {'M'}],
    [{'C', 'M', 'K', 'F'}, {'J'}],
    [{'C', 'M', 'K', 'F'}, {'L'}],
    [{'C', 'L', 'K', 'F'}, {'J'}],
    [{'C', 'M', 'E', 'F'}, {'J'}],
    [{'C', 'M', 'E', 'F'}, {'L'}],
    [{'C', 'M', 'E', 'F'}, {'G'}],
    [{'C', 'L', 'E', 'F'}, {'J'}],
    [{'C', 'J', 'G', 'F'}, {'M'}],
    [{'C', 'L', 'G', 'F'}, {'M'}],
    [{'C', 'L', 'G', 'F'}, {'J'}],
    [{'J', 'L', 'G', 'F'}, {'H'}],
    [{'C', 'I', 'G', 'F'}, {'M'}],
    [{'C', 'I', 'G', 'F'}, {'J'}],
    [{'C', 'I', 'G', 'F'}, {'L'}],
    [{'C', 'I', 'G', 'F'}, {'E'}],
    [{'C', 'I', 'G', 'F'}, {'H'}],
    [{'C', 'K', 'G', 'F'}, {'E'}],
    [{'J', 'E', 'G', 'F'}, {'H'}],
    [{'C', 'I', 'H', 'F'}, {'L'}],
    [{'C', 'K', 'H', 'F'}, {'J'}],
    [{'C', 'K', 'H', 'F'}, {'L'}],
    [{'C', 'E', 'H', 'F'}, {'J'}],
    [{'C', 'E', 'H', 'F'}, {'L'}],
    [{'C', 'G', 'H', 'F'}, {'M'}],
    [{'J', 'L', 'B', 'F'}, {'H'}],
    [{'M', 'K', 'B', 'F'}, {'L'}],
    [{'J', 'E', 'B', 'F'}, {'H'}],
    [{'M', 'L', 'I', 'F', 'G'}, {'H'}],
    [{'M', 'L', 'I', 'F', 'B'}, {'H'}],
    [{'J', 'I', 'F', 'E', 'B'}, {'M'}],
    [{'L', 'I', 'F', 'E', 'B'}, {'H'}],
    [{'L', 'I', 'F', 'G', 'B'}, {'H'}],
    [{'M', 'I', 'D', 'G', 'B'}, {'K'}],
    [{'J', 'F', 'E', 'G', 'B'}, {'M'}],
    [{'M', 'L', 'I', 'F', 'K'}, {'H'}],
    [{'C', 'I', 'F', 'E', 'K'}, {'M'}],
    [{'C', 'I', 'F', 'E', 'K'}, {'J'}],
    [{'C', 'I', 'F', 'E', 'K'}, {'L'}],
    [{'C', 'I', 'F', 'E', 'K'}, {'G'}],
    [{'C', 'I', 'F', 'E', 'K'}, {'H'}],
    [{'M', 'I', 'F', 'B', 'K'}, {'H'}],
    [{'L', 'I', 'D', 'B', 'K'}, {'M'}],
    [{'J', 'F', 'E', 'B', 'K'}, {'L'}],
    [{'I', 'D', 'E', 'B', 'K'}, {'M'}],
    [{'M', 'D', 'H', 'B', 'K'}, {'G'}],
    [{'I', 'D', 'H', 'B', 'K'}, {'G'}],
    [{'F', 'E', 'H', 'B', 'K'}, {'L'}],
    [{'D', 'E', 'H', 'B', 'K'}, {'G'}],
    [{'M', 'J', 'I', 'K', 'E', 'F'}, {'L'}],
    [{'M', 'J', 'I', 'E', 'G', 'F'}, {'L'}],
    [{'J', 'L', 'K', 'E', 'G', 'F'}, {'M'}],
    [{'M', 'I', 'K', 'E', 'H', 'F'}, {'L'}],
    [{'M', 'I', 'E', 'G', 'H', 'F'}, {'L'}],
    [{'L', 'K', 'E', 'G', 'H', 'F'}, {'M'}],
    [{'L', 'I', 'K', 'E', 'B', 'F'}, {'M'}],
    [{'J', 'L', 'I', 'G', 'B', 'F'}, {'M'}],
    [{'J', 'I', 'E', 'G', 'B', 'F'}, {'L'}],
    [{'L', 'K', 'E', 'G', 'B', 'F'}, {'M'}],
    [{'I', 'K', 'E', 'H', 'B', 'F'}, {'M'}],
    [{'M', 'I', 'G', 'H', 'B', 'F'}, {'L'}],
    [{'I', 'E', 'G', 'H', 'B', 'F'}, {'L'}],
    [{'K', 'E', 'G', 'H', 'B', 'F'}, {'M'}]
]

n = NormalizedRelation(fd=fds)
d = n.get_minimal_cover_result()
for i in d:
    if len(i) != 0:
        print(i)