import os
import signal
import turtle
from threading import main_thread
from tkinter import *
from PIL import Image
from turtle import Turtle, Screen
from os.path import exists

font_size = 14


class RelationalMapping1nf:
    def __init__(self, dics):
        if exists('./1NF.png'):
            os.remove("1NF.png")
        if exists('./1nf.eps'):
            os.remove('1nf.eps')
        self.__dic = dics
        self.__multivalue = self.__dic['multi_value']
        self.__primary = self.__dic['primary']

        self.yertle = None
        self.TURTLE_SIZE = 0
        self.screen = 0
        self.starting()

    def starting(self):
        self.TURTLE_SIZE = 20
        self.screen = turtle.Screen()
        screenTk = self.screen.getcanvas().winfo_toplevel()
        screenTk.attributes("-fullscreen", True)
        width = self.TURTLE_SIZE / 2 - self.screen.window_width()
        hight = self.screen.window_height() / 8 - self.TURTLE_SIZE / 2
        turtle.tracer(0)
        self.yertle = Turtle(shape="turtle", visible=False)

        elements = self.getattribute()
        single_compo = self.find_single_composite(self.__dic['fds'])
        self.drawattr(elements, self.__multivalue, self.__primary, single_compo)

        turtle.getcanvas().postscript(file="1nf.eps")
        self.get_image()

        # screenTk.mainloop()

        screenTk.destroy()
        turtle.bye()
        main_t = main_thread()
        main_t.interrupt_main(signum=signal.SIGKILL)

        # self.upload()
        # self.screen.mainloop()

    def set_Tortle(self):
        self.yertle.penup()
        self.yertle.goto(self.TURTLE_SIZE / 2 - self.screen.window_width(),
                         self.screen.window_height() / 8 - self.TURTLE_SIZE / 2)
        self.yertle.pendown()
        self.yertle.shape("square")
        self.yertle.width(2)

    def getattribute(self):
        fds = self.__dic['fds']
        attributes = []
        for each in fds:
            for element in each:
                for i in element:
                    if i not in attributes:
                        attributes.append(i)
        return attributes

    def dependencies(self, fds):
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

    def find_single_composite(self, fds):
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

    def drawattr(self, att, multivalue, primary, single_compo):
        self.set_Tortle()
        multivalue = multivalue
        primarykeys = primary
        box_size = 90
        single = single_compo[0]
        composite = single_compo[1]

        keyss = single.keys()
        attributes = att
        level = 1
        keys_level_dic = dict()
        self.simple_line(attributes, box_size, keys_level_dic, level, single)
        self.draw_arrows(attributes, box_size, keys_level_dic, keyss, single)
        element_counter = 0
        level = len(keys_level_dic) + 1
        self.yertle.color("black")
        color_counter = 0
        color_list = ["blue", "indigo", "violet", "orange"]

        for indexx in composite:
            self.yertle.color(color_list[color_counter])
            if element_counter % 2 == 0:

                for each in indexx:
                    distnce = ((attributes.index(each) + 1) * box_size) - (box_size) + (level * 7)
                    self.yertle.penup()
                    self.yertle.forward(distnce)

                    self.yertle.pendown()
                    self.yertle.color(color_list[color_counter])
                    self.yertle.left(90)
                    self.yertle.forward(50 + (level * 10))
                    self.yertle.back(50 + (level * 10))
                    self.yertle.right(90)
                    self.yertle.penup()
                    self.yertle.back(distnce)

            else:
                self.yertle.color(color_list[color_counter - 1])
                KhnnTakJanaHa = 0

                distnce = ((attributes.index(indexx[0]) + 1) * box_size) - (box_size) + (level * 7)
                self.yertle.penup()
                self.yertle.forward(distnce)
                self.yertle.left(45)
                self.yertle.pendown()
                self.yertle.forward(10)
                self.yertle.back(10)
                self.yertle.right(45)
                self.yertle.left(90)
                self.yertle.forward(50 + (level * 10))
                self.yertle.back(50 + (level * 10))
                self.yertle.right(90)
                self.yertle.left(135)
                self.yertle.forward(10)
                self.yertle.back(10)
                self.yertle.right(135)
                self.yertle.penup()
                self.yertle.back(distnce)

                l = composite[element_counter - 1]

                for determin in composite[element_counter]:
                    l.append(composite[element_counter][0])

                small = attributes.index(l[0])
                big = attributes.index(l[0])
                i = 0
                while i < len(l):
                    if (small > attributes.index(l[i])):
                        small = attributes.index(l[i])
                    elif (big < attributes.index(l[i])):
                        big = attributes.index(l[i])

                    i = i + 1

                a = ((small) * box_size) + (level * 7)
                self.yertle.penup()
                self.yertle.forward(a)
                self.yertle.left(90)
                self.yertle.forward(50 + (level * 10))
                self.yertle.right(90)

                b = (big - small) * box_size
                self.yertle.pendown()
                self.yertle.forward(b)
                self.yertle.back(b)
                self.yertle.penup()
                self.yertle.left(90)
                self.yertle.back(50 + (level * 10))
                self.yertle.right(90)
                self.yertle.back(a)
                level += 1
            element_counter += 1
            color_counter += 1
            if color_counter > 3:
                color_counter = 0

        self.yertle.color("black")

        for i in att:

            multivaluecount = multivalue.count(i)
            if (multivaluecount > 0):

                self.dotted_box(box_size, i)

            else:
                self.simple_box(box_size, i, primarykeys)

    def get_image(self):
        TARGET_BOUNDS = (1600, 800)
        # Load the EPS at 10 times whatever size Pillow thinks it should be
        # (Experimentaton suggests that scale=1 means 72 DPI but that would
        #  make 600 DPI scale=8⅓ and Pillow requires an integer)
        pic = Image.open('1nf.eps')
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

    def draw_arrows(self, attributes, box_size, keys_level_dic, keyss, single):
        print("keysss\n\n\n\n",keyss)
        print("keys level dic \n\n\n",keys_level_dic)
        print("SIngle\n\n\n\n" , single)
        print("attributes\n\n\n\n" , attributes)

        for key in keyss:
            level = keys_level_dic[key][0]
            self.yertle.color(keys_level_dic[key][1])
            for element in single[key]:
                distnce = ((attributes.index(element) + 1) * box_size) - (box_size) + (level * 7)
                self.yertle.penup()
                self.yertle.forward(distnce)
                self.yertle.left(45)
                self.yertle.pendown()
                self.yertle.forward(10)
                self.yertle.back(10)
                self.yertle.right(45)
                self.yertle.left(90)
                self.yertle.forward(50 + (level * 10))
                self.yertle.back(50 + (level * 10))
                self.yertle.right(90)
                self.yertle.left(135)
                self.yertle.forward(10)
                self.yertle.back(10)
                self.yertle.right(135)
                self.yertle.penup()
                self.yertle.back(distnce)

            l = list(keyss)
            dependentent = single[l[0]]
            print("dependent \n\n\n\n",dependentent)
            for each in dependentent:
                l.append(each)
            print("L ki value", l)
            small = attributes.index(l[0])
            big = attributes.index(l[0])

            i = 0
            while i < len(l):
                if (small > attributes.index(l[i])):
                    small = attributes.index(l[i])
                elif (big < attributes.index(l[i])):
                    big = attributes.index(l[i])

                i = i + 1

            a = ((small + 1) * box_size) - box_size + (level * 7)
            self.yertle.penup()
            self.yertle.forward(a)
            self.yertle.left(90)
            self.yertle.forward(50 + (level * 10))
            self.yertle.right(90)
            # listofsingle = single[key]
            # agoto = listofsingle[len(listofsingle) - 1]

            b = (((big + 1) * box_size) - box_size)
            self.yertle.pendown()
            self.yertle.forward(b)
            self.yertle.back(b)
            self.yertle.penup()
            self.yertle.left(90)
            self.yertle.back(50 + (level * 10))
            self.yertle.right(90)
            self.yertle.back(a)

    def simple_line(self, attributes, box_size, keys_level_dic, level, single):
        color_counter = 0
        color_list = ["green", "red", "yellow", "orange"]
        for key in single:
            keys_level_dic[key] = [level, color_list[color_counter]]
            self.yertle.color(color_list[color_counter])
            distnce = ((attributes.index(key) + 1) * box_size) - (box_size) + (level * 7)
            self.yertle.penup()
            self.yertle.forward(distnce)

            self.yertle.pendown()
            self.yertle.left(90)
            self.yertle.forward(50 + (level * 10))
            self.yertle.back(50 + (level * 10))
            self.yertle.right(90)
            self.yertle.penup()
            self.yertle.back(distnce)
            level += 1
            if color_counter > 3:
                color_counter = 0
            color_counter += 1

    def simple_box(self, box_size, i, primarykeys):
        self.yertle.pendown()
        self.yertle.forward(box_size)
        self.yertle.right(90)
        self.yertle.forward(40)
        self.yertle.right(90)
        self.yertle.forward(box_size)
        self.yertle.right(90)
        self.yertle.forward(40)
        self.yertle.right(90)
        self.yertle.right(90)
        self.yertle.penup()
        self.yertle.forward(15)
        self.yertle.left(90)
        self.yertle.forward(5)
        if (len(i) >= 10):
            part1 = i[:10] + "_"

            part2 = i[10:len(i)]
            self.yertle.write(part1, font=("Verdana", font_size, "bold"))
            self.yertle.right(90)
            self.yertle.forward(15)
            self.yertle.left(90)
            self.yertle.write(part2, font=("Verdana", font_size, "bold"))
            self.yertle.right(90)
            self.yertle.back(15)
            self.yertle.left(90)
        else:
            self.yertle.write(i, font=("Verdana", font_size, "bold",))
        if (i in primarykeys):
            self.yertle.right(90)
            self.yertle.forward(1)
            self.yertle.left(90)
            self.yertle.pendown()
            self.yertle.forward(30)
            self.yertle.back(30)
            self.yertle.penup()
            self.yertle.right(90)
            self.yertle.back(1)
            self.yertle.left(90)
        self.yertle.back(5)
        self.yertle.right(90)
        self.yertle.back(15)
        self.yertle.right(90)
        self.yertle.right(90)
        self.yertle.right(90)
        self.yertle.forward(box_size)

    def dotted_box(self, box_size, i):
        for line_no in range(4):

            if line_no % 2 == 0:

                pixle_count = 0
                j = 0
                while pixle_count < box_size:

                    if (j % 2 == 0):

                        self.yertle.pendown()
                        self.yertle.forward(box_size / 5)
                        self.yertle.penup()
                        pixle_count += box_size / 5
                        j += 1
                    else:
                        self.yertle.forward(box_size / 20)
                        pixle_count += 5
                        j += 1
                self.yertle.right(90)
            else:
                self.yertle.pendown()
                self.yertle.forward(40)
                self.yertle.penup()
                self.yertle.right(90)
        self.yertle.penup()
        self.yertle.right(90)
        self.yertle.forward(15)
        self.yertle.left(90)
        self.yertle.forward(10)
        self.yertle.write(i, font=("Verdana", font_size, "bold"))
        self.yertle.back(10)
        self.yertle.right(90)
        self.yertle.back(15)
        self.yertle.right(90)
        self.yertle.right(90)
        self.yertle.right(90)
        self.yertle.forward(box_size)
        self.yertle.back(2)
