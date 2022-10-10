import sys
import traceback


def my_except(e):
    print('-> exp: ', e)
    traceback.print_exception(*sys.exc_info())
