import turtle
from tkinter import *
import cv2
from turtle import *
from PIL import Image
from turtle import Turtle, Screen

class RelationalMapping1nf:
    def __init__(self,dics):
        self.__dic = dics
        self.__multivalue = dics['multi_value']
        self.__primary = dics['primary']
        self.__TURTLE_SIZE = 20
        self.__screen = turtle.Screen()
        self.__yertle = Turtle(shape="turtle", visible=False)
        self.preprocessing()


    def preprocessing(self):
        turtle.tracer(0)
        turtle.speed(1)
        screenTk = self.__screen.getcanvas().winfo_toplevel()
        screenTk.attributes("-fullscreen", True)

        elements = self.getattribute(self.__dic)
        single_compo = self.find_single_composite(self.__dic['fds'], elements)
        self.drawattr(elements, self.__multivalue, self.__primary, single_compo)

        turtle.getcanvas().postscript(file="../../../../../../PycharmProjects/pythonProject4/1nf.eps")
        self.get_image()



    def set_Tortle(self):
        self.__yertle.penup()
        self.__yertle.goto(self.__TURTLE_SIZE / 2 - self.__screen.window_width(), self.__screen.window_height() / 8 - self.__TURTLE_SIZE / 2)
        self.__yertle.pendown()
        self.__yertle.shape("square")
        self.__yertle.width(2)

    def getattribute(self,dic):
        fds = dic['fds']
        attributes = []
        for each in fds:
            for element in each:
                for i in element:
                    if i not in attributes:
                        attributes.append(i)
        return attributes

    def dependencies(self,fds):
        lhs = []
        compo = []
        for each in fds:
            if (len(each[0]) < 2):
                a = list(each[0])
                lhs.append(a[0])
            else:
                mu = set()
                multidep = each[0]
                for multi in multidep:
                    mu.add(multi)
                compo.append(mu)
        lhs = list(set(lhs))

        return (lhs, compo)

    def find_single_composite(self,fds, elements):
        ans = self.dependencies(fds)
        single = ans[0]
        composite = ans[1]

        newdic = dict()
        compolist = list()
        singlecounter = 0
        for i in single:
            newdic[i] = []
            for each in fds:
                if len(each[0]) < 2:
                    element = list(each[0])
                    if element[0] == i:
                        appendelement = list(each[1])[0]
                        newdic[i].append(appendelement)
                        singlecounter += 1
        composite_counter = len(composite)

        while (composite_counter > 0):
            for each in fds:

                if (len(each[0]) > 1):

                    identifeier = list()
                    dependent = list()
                    for oneelement in each[0]:
                        identifeier.append(oneelement)
                    if oneelement not in compolist:
                        compolist.append(identifeier)
                        dependent.append(list(each[1])[0])
                        compolist.append(dependent)
                composite_counter -= 1
        return [newdic, compolist]

    def drawattr(self,att, multivalue, primary, single_compo):

        self.set_Tortle()
        multivalue = multivalue
        primarykeys = primary
        box_size = 70
        single = single_compo[0]
        composite = single_compo[1]

        keyss = single.keys()
        attributes = att
        level = 1
        keys_level_dic = dict()
        self.simple_line(attributes, box_size, keys_level_dic, level, single)
        self.draw_arrows(attributes, box_size, keys_level_dic, keyss, single)
        print(keys_level_dic)
        element_counter = 0
        level = len(keys_level_dic) + 1
        self.__yertle.color("black")
        color_counter = 0
        color_list = ["blue", "indigo", "violet", "orange"]
        for index in composite:
            self.__yertle.color(color_list[color_counter])
            if element_counter % 2 == 0:

                for each in index:
                    distnce = ((attributes.index(each) + 1) * box_size) - (box_size) + (level * 7)
                    self.__yertle.penup()
                    self.__yertle.forward(distnce)

                    self.__yertle.pendown()
                    self.__yertle.color(color_list[color_counter])
                    self.__yertle.left(90)
                    self.__yertle.forward(50 + (level * 10))
                    self.__yertle.back(50 + (level * 10))
                    self.__yertle.right(90)
                    self.__yertle.penup()
                    self.__yertle.back(distnce)

            else:
                self.__yertle.color(color_list[color_counter - 1])
                distnce = ((attributes.index(index[0]) + 1) * box_size) - (box_size) + (level * 7)
                self.__yertle.penup()
                self.__yertle.forward(distnce)
                self.__yertle.left(45)
                self.__yertle.pendown()
                self.__yertle.forward(10)
                self.__yertle.back(10)
                self.__yertle.right(45)
                self.__yertle.left(90)
                self.__yertle.forward(50 + (level * 10))
                self.__yertle.back(50 + (level * 10))
                self.__yertle.right(90)
                self.__yertle.left(135)
                self.__yertle.forward(10)
                self.__yertle.back(10)
                self.__yertle.right(135)
                self.__yertle.penup()
                self.__yertle.back(distnce)
                small = (attributes.index(composite[element_counter - 1][0]))

                l = composite[element_counter - 1]
                i = 0
                while i < len(l):
                    if (small > attributes.index(l[i])):
                        small = i

                    i = i + 1

                a = ((attributes.index(composite[element_counter - 1][small])) * box_size) + (level * 7)
                self.__yertle.penup()
                self.__yertle.forward(a)
                self.__yertle.left(90)
                self.__yertle.forward(50 + (level * 10))
                self.__yertle.right(90)

                b = ((attributes.index(composite[element_counter][0]) - attributes.index(
                    composite[element_counter - 1][small])) * box_size)
                self.__yertle.pendown()
                self.__yertle.forward(b)
                self.__yertle.back(b)
                self.__yertle.penup()
                self.__yertle.left(90)
                self.__yertle.back(50 + (level * 10))
                self.__yertle.right(90)
                self.__yertle.back(a)
                level += 1
            element_counter += 1
            color_counter += 1
            if color_counter > 3:
                color_counter = 0

        self.__yertle.color("black")

        for i in att:

            multivaluecount = multivalue.count(i)
            if (multivaluecount > 0):

                self.dotted_box(box_size, i)

            else:
                self.simple_box(box_size, i, primarykeys)

    def get_image(self):
        TARGET_BOUNDS = (2000, 2000)
        # Load the EPS at 10 times whatever size Pillow thinks it should be
        # (Experimentaton suggests that scale=1 means 72 DPI but that would
        #  make 600 DPI scale=8⅓ and Pillow requires an integer)
        pic = Image.open('../../../../../../PycharmProjects/pythonProject4/1nf.eps')
        pic.load(scale=10)
        # Ensure scaling can anti-alias by converting 1-bit or paletted images
        if pic.mode in ('P', '1'):
            pic = pic.convert("RGB")
        # Calculate the new size, preserving the aspect ratio
        ratio = min(TARGET_BOUNDS[0] / pic.size[0],
                    TARGET_BOUNDS[1] / pic.size[1])
        new_size = (int(pic.size[0] * ratio), int(pic.size[1] * ratio))
        # Resize to fit the target size
        pic = pic.resize(new_size, Image.Resampling.LANCZOS)
        # Save to PNG
        pic.save("1NF.png")

    def draw_arrows(self,attributes, box_size, keys_level_dic, keyss, single):
        box_size = 70
        for key in keyss:
            level = keys_level_dic[key][0]
            self.__yertle.color(keys_level_dic[key][1])
            for element in single[key]:
                distnce = ((attributes.index(element) + 1) * box_size) - (box_size) + (level * 7)
                self.__yertle.penup()
                self.__yertle.forward(distnce)
                self.__yertle.left(45)
                self.__yertle.pendown()
                self.__yertle.forward(10)
                self.__yertle.back(10)
                self.__yertle.right(45)
                self.__yertle.left(90)
                self.__yertle.forward(50 + (level * 10))
                self.__yertle.back(50 + (level * 10))
                self.__yertle.right(90)
                self.__yertle.left(135)
                self.__yertle.forward(10)
                self.__yertle.back(10)
                self.__yertle.right(135)
                self.__yertle.penup()
                self.__yertle.back(distnce)
            a = ((attributes.index(key)) * box_size) + (level * 7)
            self.__yertle.penup()
            self.__yertle.forward(a)
            self.__yertle.left(90)
            self.__yertle.forward(50 + (level * 10))
            self.__yertle.right(90)
            listofsingle = single[key]
            agoto = listofsingle[len(listofsingle) - 1]

            b = ((attributes.index(agoto) - attributes.index(key)) * box_size)
            self.__yertle.pendown()
            self.__yertle.forward(b)
            self.__yertle.back(b)
            self.__yertle.penup()
            self.__yertle.left(90)
            self.__yertle.back(50 + (level * 10))
            self.__yertle.right(90)
            self.__yertle.back(a)

    def simple_line(self,attributes, box_size, keys_level_dic, level, single):
        box_size=70
        color_counter = 0
        color_list = ["green", "red", "yellow", "orange"]
        for key in single:
            keys_level_dic[key] = [level, color_list[color_counter]]
            self.__yertle.color(color_list[color_counter])
            distnce = ((attributes.index(key) + 1) * box_size) - (box_size) + (level * 7)
            self.__yertle.penup()
            self.__yertle.forward(distnce)

            self.__yertle.pendown()
            self.__yertle.left(90)
            self.__yertle.forward(50 + (level * 10))
            self.__yertle.back(50 + (level * 10))
            self.__yertle.right(90)
            self.__yertle.penup()
            self.__yertle.back(distnce)
            level += 1
            if color_counter > 3:
                color_counter = 0
            color_counter += 1

    def simple_box(self,box_size, i, primarykeys):
        box_size=70
        self.__yertle.pendown()
        self.__yertle.forward(box_size)
        self.__yertle.right(90)
        self.__yertle.forward(30)
        self.__yertle.right(90)
        self.__yertle.forward(box_size)
        self.__yertle.right(90)
        self.__yertle.forward(30)
        self.__yertle.right(90)
        self.__yertle.right(90)
        self.__yertle.penup()
        self.__yertle.forward(15)
        self.__yertle.left(90)
        self.__yertle.forward(10)
        self.__yertle.write(i, font=("Verdana", 10, "normal",))
        if (i in primarykeys):
            self.__yertle.right(90)
            self.__yertle.forward(1)
            self.__yertle.left(90)
            self.__yertle.pendown()
            self.__yertle.forward(30)
            self.__yertle.back(30)
            self.__yertle.penup()
            self.__yertle.right(90)
            self.__yertle.back(1)
            self.__yertle.left(90)
        self.__yertle.back(10)
        self.__yertle.right(90)
        self.__yertle.back(15)
        self.__yertle.right(90)
        self.__yertle.right(90)
        self.__yertle.right(90)
        self.__yertle.forward(box_size)

    def dotted_box(self,box_size, i):
        box_size=70
        for line_no in range(4):

            if line_no % 2 == 0:

                pixle_count = 0
                j = 0
                while pixle_count < box_size:

                    if (j % 2 == 0):

                        self.__yertle.pendown()
                        self.__yertle.forward(box_size / 5)
                        self.__yertle.penup()
                        pixle_count += box_size / 5
                        j += 1
                    else:
                        self.__yertle.forward(box_size / 20)
                        pixle_count += 5
                        j += 1
                self.__yertle.right(90)
            else:
                self.__yertle.pendown()
                self.__yertle.forward(30)
                self.__yertle.penup()
                self.__yertle.right(90)
        self.__yertle.penup()
        self.__yertle.right(90)
        self.__yertle.forward(15)
        self.__yertle.left(90)
        self.__yertle.forward(10)
        self.__yertle.write(i, font=("Verdana", 10, "normal"))
        self.__yertle.back(10)
        self.__yertle.right(90)
        self.__yertle.back(15)
        self.__yertle.right(90)
        self.__yertle.right(90)
        self.__yertle.right(90)
        self.__yertle.forward(box_size)
        self.__yertle.back(2)

if __name__ == "__main__":
    dic = {

        'fds': [
            [{'ssn'}, {'ename'}],
            [{'ssn'}, {'email'}],
            [{'ssn'}, {'dnum'}],
            [{'ssn'}, {'pakistan'}],
            [{'ssn'}, {'dcdcz'}],
            [{'ssn'}, {'zindabad'}],
            [{'ssn'}, {'p'}],
            [{'ssn'}, {'t'}],
            [{'ssn'}, {'i'}],
            [{'ssn'}, {'j'}],
            [{'ssn'}, {'l'}],
            [{'ssn'}, {'k'}],
            [{'i'}, {'j'}],
            [{'ssn', 'dnum'}, {'dname'}],
            [{'ssn', 'dcdcz'}, {'p'}],
            [{'dnum'}, {'dloc'}]
        ],
        'primary': ['ssn'],
        'multi_value': ['email', 'dname']
    }
    p=ONENFCLASS(dic)
    print("HEllo")

