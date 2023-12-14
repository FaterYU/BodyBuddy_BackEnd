import pymysql
import pandas as pd
import json
import time

db = pymysql.connect(host='localhost',
                                user='bodybuddy',
                                password='bodybuddy',
                                db='bodybuddy',
                                )
def read_data(data_path):
    with open(data_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

def format_pose_data(pose_data):
    for pose in pose_data:
        pose['photo'] = pose['photo'].split('/')[-1]
        pose['content'] = json.dumps(pose['content'])
        pose['video'] = pose['video'].split('/')[-1]
        pose['tags'] = json.dumps(pose['tags'])
    return pose_data

def format_course_data(course_data):
    for course in course_data:
        course['photo'] = course['photo'].split('/')[-1]
        course['content'] = json.dumps(course['content'])
        course['infomation'] = json.dumps(course['infomation'])
    return course_data

def format_user_data(user_data):
    for user in user_data:
        user['photo'] = user['photo'].split('/')[-1]
        user['infomation'] = json.dumps(user['infomation'])
        user['role'] = "user"
        user['courses'] = json.dumps({ "courseList": [] })
        user['follow'] = json.dumps({ "followList": [] })
        user['calendar'] = json.dumps({ "calendarList": [], "calendarActivityCount": 1 })
        user['level']="1"
        user['feature'] = json.dumps({ "likeCourse": [], "likePose": [], "likeMoment": [] })
    return user_data

def format_moment_data(moment_data):
    for moment in moment_data:
        moment['photo'] = moment['photo'].split('/')[-1]
        for idx in range(len(moment['content']['photo'])):
            moment['content']['photo'][idx] = moment['content']['photo'][idx].split('/')[-1]
        moment['content'] = json.dumps(moment['content'])
        moment['tags'] = json.dumps(moment['tags'])
        moment['comment'] = json.dumps(moment['comment'])
    return moment_data

def insert_pose_data(pose_data):
    cursor = db.cursor()
    
    cursor.execute("DROP TABLE IF EXISTS `poses`")
    
    create_sql = """
        CREATE TABLE `poses` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `createdAt` TEXT NOT NULL,
            `updatedAt` TEXT NOT NULL,
            `name` TEXT NOT NULL,
            `photo` TEXT,
            `content` JSON,
            `tags` JSON,
            `repetition` INT,
            `like` INT,
            `practiced` INT,
            `video` TEXT,
            primary key(id)
        )
    """
    
    cursor.execute(create_sql)
    db.commit()
    
    sqlList = []
    for pose in pose_data:
        sql = """
            INSERT INTO `poses` (
                `createdAt`,
                `updatedAt`,
                `name`,
                `photo`,
                `content`,
                `tags`,
                `repetition`,
                `like`,
                `practiced`,
                `video`
            ) VALUES (
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}'
            )
        """.format(
            time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
            time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
            pose['name'].replace("'", "\\'"),
            pose['photo'].replace("'", "\\'"),
            pose['content'].replace("'", "\\'"),
            pose['tags'].replace("'", "\\'"),
            pose['repetition'],
            pose['like'],
            pose['practiced'],
            pose['video'].replace("'", "\\'")
        )
        sqlList.append(sql)
    for sql in sqlList:
        cursor.execute(sql)
        db.commit()

def insert_course_data(course_data):
    cursor = db.cursor()
    
    cursor.execute("DROP TABLE IF EXISTS `courses`")
    
    create_sql = """
        CREATE TABLE `courses` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `createdAt` TEXT NOT NULL,
            `updatedAt` TEXT NOT NULL,
            `name` TEXT NOT NULL,
            `photo` TEXT,
            `content` JSON,
            `duration` INT,
            `infomation` JSON,
            primary key(id)
        )
    """
    
    cursor.execute(create_sql)
    db.commit()
    
    sqlList = []
    for course in course_data:
        sql = """
            INSERT INTO `courses` (
                `createdAt`,
                `updatedAt`,
                `name`,
                `photo`,
                `content`,
                `duration`,
                `infomation`
            ) VALUES (
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}'
            )
        """.format(
            time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
            time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
            course['name'].replace("'", "\\'"),
            course['photo'].replace("'", "\\'"),
            course['content'].replace("'", "\\'"),
            course['duration'],
            course['infomation'].replace("'", "\\'")
        )
        sqlList.append(sql)
    for sql in sqlList:
        cursor.execute(sql)
        db.commit()

def insert_user_data(user_data):
    cursor = db.cursor()
    
    cursor.execute("DROP TABLE IF EXISTS `users`")
    
    create_sql = """
        CREATE TABLE `users` (
            `uid` INT NOT NULL AUTO_INCREMENT,
            `createdAt` TEXT NOT NULL,
            `updatedAt` TEXT NOT NULL,
            `userName` TEXT NOT NULL,
            `email` TEXT NOT NULL,
            `phone` TEXT,
            `photo` TEXT,
            `password` TEXT NOT NULL,
            `role` TEXT,
            `courses` JSON,
            `follow` JSON,
            `calendar` JSON,
            `infomation` JSON,
            `level` TEXT,
            `feature` JSON,
            `lastLogin` DATE,
            primary key(uid)
        )
    """
    
    cursor.execute(create_sql)
    db.commit()
    
    sqlList = []
    for user in user_data:
        sql = """
            INSERT INTO `users` (
                `createdAt`,
                `updatedAt`,
                `userName`,
                `email`,
                `phone`,
                `photo`,
                `password`,
                `role`,
                `courses`,
                `follow`,
                `calendar`,
                `infomation`,
                `level`,
                `feature`,
                `lastLogin`
            ) VALUES (
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}'
            )
        """.format(
            time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
            time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
            user['userName'].replace("'", "\\'"),
            user['email'].replace("'", "\\'"),
            user['phone'].replace("'", "\\'"),
            user['photo'].replace("'", "\\'"),
            user['password'].replace("'", "\\'"),
            user['role'].replace("'", "\\'"),
            user['courses'].replace("'", "\\'"),
            user['follow'].replace("'", "\\'"),
            user['calendar'].replace("'", "\\'"),
            user['infomation'].replace("'", "\\'"),
            user['level'].replace("'", "\\'"),
            user['feature'].replace("'", "\\'"),
            time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        )
        sqlList.append(sql)
    for sql in sqlList:
        cursor.execute(sql)
        db.commit()

def insert_moment_data(moment_data):
    cursor = db.cursor()
    
    cursor.execute("DROP TABLE IF EXISTS `moments`")
    
    create_sql = """
        CREATE TABLE `moments` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `createdAt` TEXT NOT NULL,
            `updatedAt` TEXT NOT NULL,
            `author` INT NOT NULL,
            `photo` TEXT,
            `content` JSON,
            `tags` JSON,
            `like` INT,
            `comment` JSON,
            `lastUpdate` DATE,
            primary key(id)
        )
    """
    
    cursor.execute(create_sql)
    db.commit()
    
    sqlList = []
    for moment in moment_data:
        sql = """
            INSERT INTO `moments` (
                `createdAt`,
                `updatedAt`,
                `author`,
                `photo`,
                `content`,
                `tags`,
                `like`,
                `comment`,
                `lastUpdate`
            ) VALUES (
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}',
                '{}'
            )
        """.format(
            time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
            time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
            moment['author'],
            moment['photo'].replace("'", "\\'"),
            moment['content'].replace("'", "\\'"),
            moment['tags'].replace("'", "\\'"),
            moment['like'],
            moment['comment'].replace("'", "\\'"),
            time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        )
        sqlList.append(sql)
    for sql in sqlList:
        cursor.execute(sql)
        db.commit()

if __name__ == '__main__':
    pose_data_path = 'data/createPose.json'
    pose_data = read_data(pose_data_path)
    format_pose = format_pose_data(pose_data)
    insert_pose_data(format_pose)
    
    course_data_path = 'data/createCourse.json'
    course_data = read_data(course_data_path)
    format_course = format_course_data(course_data)
    insert_course_data(format_course)
    
    user_data_path = 'data/createUser.json'
    user_data = read_data(user_data_path)
    format_user = format_user_data(user_data)
    insert_user_data(format_user)
    
    moment_data_path = 'data/createMoment.json'
    moment_data = read_data(moment_data_path)
    format_moment = format_moment_data(moment_data)
    insert_moment_data(format_moment)
    
    db.close()