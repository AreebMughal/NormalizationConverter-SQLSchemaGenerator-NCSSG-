import os
import turtle
from tkinter import *
from PIL import Image
from turtle import Turtle, Screen
from os.path import exists

font_size = 14


class RelationalMapping3nf:
    def __init__(self, relation, relation_name, fks):
        if exists('./3NF.png'):
            os.remove("3NF.png")
        if exists('./3nf.eps'):
            os.remove('3nf.eps')
        self.__yertle = None
        self.__screen = turtle.Screen()
        self.__TURTLE_SIZE = 20
        self.__relations = relation
        self.__relation_names = relation_name
        self.__fk = fks
        self.preporcessing()

    def preporcessing(self):

        screenTk = self.__screen.getcanvas().winfo_toplevel()
        screenTk.attributes("-fullscreen", True)
        turtle.tracer(0)
        self.__yertle = Turtle(shape="turtle", visible=False)

        names = self.getnames(self.__relation_names)
        self.set_Tortle()
        self.drawRelations(self.__relations, names, self.__fk)
        turtle.getcanvas().postscript(file="3nf.eps")
        self.get_image()
        screenTk.destroy()
        turtle.bye()

    def get_image(self):
        TARGET_BOUNDS = (1600, 800)
        # Load the EPS at 10 times whatever size Pillow thinks it should be
        # (Experimentaton suggests that scale=1 means 72 DPI but that would
        #  make 600 DPI scale=8⅓ and Pillow requires an integer)
        pic = Image.open('3nf.eps')
        pic.load(scale=10)
        # Ensure scaling can anti-alias by converting 1-bit or paletted images
        if pic.mode in ('P', '10'):
            pic = pic.convert("RGB")
        # Calculate the new size, preserving the aspect ratio
        ratio = min(TARGET_BOUNDS[0] / pic.size[0],
                    TARGET_BOUNDS[1] / pic.size[1])
        new_size = (int(pic.size[0] * ratio), int(pic.size[1] * ratio))
        # Resize to fit the target size
        pic = pic.resize(new_size, Image.Resampling.LANCZOS)
        # Save to PNG

        pic.save("3NF.png")

    def set_Tortle(self):
        self.__yertle.penup()
        self.__yertle.goto(self.__TURTLE_SIZE / 2 - self.__screen.window_width() / 2,
                           self.__screen.window_height() - 250 - self.__TURTLE_SIZE / 2)
        self.__yertle.pendown()

        self.__yertle.shape("square")
        self.__yertle.width(2)

    def getnames(self, relation_names):
        names = []
        for one in relation_names:
            a = relation_names[one]
            for each in a:
                names.append(each)
        return names

    def simple_box(self, box_size, i, primarykeys):

        self.__yertle.pendown()
        self.__yertle.forward(box_size)
        self.__yertle.right(90)
        self.__yertle.forward(40)
        self.__yertle.right(90)
        self.__yertle.forward(box_size)
        self.__yertle.right(90)
        self.__yertle.forward(40)
        self.__yertle.right(90)
        self.__yertle.right(90)
        self.__yertle.penup()
        self.__yertle.forward(15)
        self.__yertle.left(90)
        self.__yertle.forward(5)
        if (len(i) >= 10):
            part1 = i[:10] + "_"

            part2 = i[10:len(i)]
            self.__yertle.write(part1, font=("Verdana", font_size, "bold"))
            self.__yertle.right(90)
            self.__yertle.forward(15)
            self.__yertle.left(90)
            self.__yertle.write(part2, font=("Verdana", font_size, "bold"))
            self.__yertle.right(90)
            self.__yertle.back(15)
            self.__yertle.left(90)
        else:
            self.__yertle.write(i, font=("Verdana", font_size, "bold",))
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
        self.__yertle.back(5)
        self.__yertle.right(90)
        self.__yertle.back(15)
        self.__yertle.right(90)
        self.__yertle.right(90)
        self.__yertle.right(90)
        self.__yertle.forward(box_size)

    def simple_line(self, attributes, box_size, single):

        for key in single:
            distnce = ((attributes.index(key) + 1) * box_size) - (box_size) + 20
            self.__yertle.penup()
            self.__yertle.forward(distnce)

            self.__yertle.pendown()
            self.__yertle.left(90)
            self.__yertle.forward(25)
            self.__yertle.back(25)
            self.__yertle.right(90)
            self.__yertle.penup()
            self.__yertle.back(distnce)

    def draw_forgin_key(self, fks, attibutes, relnames):
        fk_relations = []

        for fk in fks:
            fk_rel = []
            for name in relnames:
                if fk == name[0]:
                    fk_rel.append(name[1])
            for one in fks[fk]:
                rel = one

                for i in rel:
                    fk_rel.append(rel[i])
                fk_relations.append(fk_rel)

        keyss = list(attibutes.keys())
        self.__yertle.penup()
        self.__yertle.right(90)
        self.__yertle.right(90)
        self.__yertle.forward(50)
        self.__yertle.right(90)
        self.__yertle.forward(len(attibutes) * 100)
        self.__yertle.penup()
        self.__yertle.right(90)
        self.__yertle.forward(50)
        self.__yertle.right(90)
        cololist = ["blue", "indigo", "violet", "orange", "green", "red", "orange"]
        color_counter = 0
        level = 1
        for rel in fk_relations:
            goto_relation = rel[0]
            from_relation = rel[2]
            forgin_keys = rel[1]
            copy_goto = goto_relation
            copy_from = from_relation
            self.__yertle.penup()
            self.__yertle.color(cololist[color_counter])
            # if keyss.index(from_relation) > keyss.index(goto_relation):
            #     temp = from_relation
            #     from_relation = goto_relation
            #     goto_relation = temp
            #     print("gsfdf")
            # print('\n\nkeys', keyss)
            # print('from_relation', from_relation, '\n\n')
            from_relation = from_relation[0] if type(from_relation) is list else from_relation
            a = ((keyss.index(from_relation) + 1) * 100)
            self.__yertle.forward(a)
            right_dist1 = ((attibutes[from_relation].index(forgin_keys[0]) + 1) * 90) - 25
            self.__yertle.left(90)
            self.__yertle.forward(right_dist1)
            self.__yertle.pendown()
            self.__yertle.left(90)
            self.__yertle.forward(10)
            self.__yertle.back(10)
            self.__yertle.right(90)
            self.__yertle.back(right_dist1 + (color_counter * 6) + 4)
            self.__yertle.right(90)

            self.__yertle.pendown()

            b = ((keyss.index(goto_relation) + 1) * 100) - a
            self.__yertle.forward(b)
            right_dist2 = ((attibutes[goto_relation].index(forgin_keys[0]) + 1) * 90) - 25
            self.__yertle.left(90)
            self.__yertle.forward(right_dist2 + (color_counter * 6))
            self.__yertle.left(90)
            self.__yertle.forward(10)
            self.__yertle.left(135)
            self.__yertle.forward(5)
            self.__yertle.back(5)
            self.__yertle.right(135)
            self.__yertle.right(135)
            self.__yertle.forward(5)
            self.__yertle.back(5)
            self.__yertle.left(135)
            self.__yertle.back(10)
            self.__yertle.right(90)
            self.__yertle.back(right_dist2)
            self.__yertle.right(90)
            self.__yertle.penup()
            self.__yertle.back(b)
            self.__yertle.back(a)
            color_counter += 1
            if (color_counter == 6):
                color_counter = 0
            level += 1

    def draw_arrows(self, attributes, box_size, dependentent, pk, level=0):

        for element in dependentent:
            distnce = ((attributes.index(element) + 1) * box_size) - (box_size) + 20
            self.__yertle.penup()
            self.__yertle.forward(distnce)
            self.__yertle.left(45)
            self.__yertle.pendown()
            self.__yertle.forward(5)
            self.__yertle.back(5)
            self.__yertle.right(45)
            self.__yertle.left(90)
            self.__yertle.forward(25 + level)
            self.__yertle.back(25 + level)
            self.__yertle.right(90)
            self.__yertle.left(135)
            self.__yertle.forward(5)
            self.__yertle.back(5)
            self.__yertle.right(135)
            self.__yertle.penup()
            self.__yertle.back(distnce)
        print("pk", pk)
        print("dependent ", dependentent)
        l = pk
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
        a = ((small + 1) * box_size) - box_size + 20
        self.__yertle.penup()
        self.__yertle.forward(a)
        self.__yertle.left(90)
        self.__yertle.forward(25)
        self.__yertle.right(90)

        self.__yertle.left(90)
        self.__yertle.forward(level)
        self.__yertle.right(90)
        self.__yertle.forward(level)

        b = (((big + 1) * box_size) - box_size) - a + 20 - level
        self.__yertle.pendown()
        self.__yertle.forward(b)
        self.__yertle.back(b)
        self.__yertle.penup()
        self.__yertle.left(90)
        self.__yertle.back(25)
        self.__yertle.right(90)
        self.__yertle.back(a)

    def oneRelationDrawing(self, relation, name, name_counter, att_List, name_print):
        box_size = 90
        rel = relation
        attibutes = []
        for each in relation:
            convertSet_List = list(each)
            for i in convertSet_List:
                attibutes.append(i)
        att_List[name] = attibutes
        multivalue_check = False
        primaryKeys = []
        rel_zero = list(rel[0])
        for a in rel_zero:
            primaryKeys.append(a)

        self.__yertle.penup()

        self.__yertle.right(90)
        self.__yertle.forward(20)
        self.__yertle.right(90)
        self.__yertle.forward(250)

        self.__yertle.pendown()
        self.__yertle.write(name, font=("Verdana", 16, "bold",))
        self.__yertle.penup()
        self.__yertle.back(250)
        self.__yertle.pendown()
        self.__yertle.right(90)

        self.__yertle.right(90)
        self.__yertle.penup()
        self.__yertle.right(90)
        self.__yertle.forward(40)
        self.__yertle.left(90)

        # self.__yertle.forward(box_size* len(att_List[name]))
        # code yhn krna ha
        for att in att_List[name]:
            self.simple_box(box_size, att, primaryKeys)
        # self.__yertle.back(box_size * len(att_List[name]))

        self.__yertle.back(box_size * len(att_List[name]))
        self.simple_line(att_List[name], box_size, primaryKeys)
        self.dependentent = list(set(attibutes) - set(primaryKeys)) + list(set(primaryKeys) - set(attibutes))
        self.draw_arrows(attibutes, box_size, self.dependentent, primaryKeys)
        self.__yertle.penup()
        self.__yertle.goto(self.__yertle.pos()[0], self.__yertle.pos()[1] - 20)
        self.__yertle.pendown()

    def drawRelations(self, relations, rels_names, fk):
        # full = nfs['full']
        # partial = nfs['partial']
        # multi_value = nfs['Multi']
        # transitive = nfs['transitive']
        fks = fk
        attributes = {}
        rels = self.__relations
        names = rels_names

        name_counter = 0
        for one in rels:
            attributes[names[name_counter][1]] = []
            self.oneRelationDrawing(rels[one], names[name_counter][1], name_counter, attributes, names[name_counter][0])
            name_counter += 1
            self.__yertle.penup()

            self.__yertle.forward(20)
            self.__yertle.back(20)

            self.__yertle.goto(self.__yertle.pos()[0], self.__yertle.pos()[1] - 20)

        # self.__yertle.goto(self.__TURTLE_SIZE / 2 - self.__screen.window_width() / 2, self.__screen.window_height() - 250 - self.__TURTLE_SIZE / 2)
        # self.__yertle.right(90)
        # self.__yertle.penup()
        # self.__yertle.forward(100)
        #
        # self.__yertle.write("name", font=("Verdana", 10, "normal",))

        self.draw_forgin_key(fks, attributes, names)
