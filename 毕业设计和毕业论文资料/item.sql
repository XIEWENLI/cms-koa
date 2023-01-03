-- 创建数据库(已执行)
CREATE DATABASE personal_website;

-- 1、菜单表
CREATE TABLE IF NOT EXISTS menu(
	id INT PRIMARY KEY AUTO_INCREMENT,
	menuURL VARCHAR(255),
	name VARCHAR(255),
	type INT
);

SELECT * FROM menu

INSERT INTO menu(menuURL,name,type) VALUES('/main/echarts',"统计数据路由",1);
INSERT INTO menu(menuURL,name,type) VALUES('/main/user',"用户管理路由",1);
INSERT INTO menu(menuURL,name,type) VALUES('/main/role',"角色管理路由",1);
INSERT INTO menu(menuURL,name,type) VALUES('/main/photo',"图片管理路由",1);
INSERT INTO menu(menuURL,name,type) VALUES('/main/video',"视频管理路由",1);

INSERT INTO menu(menuURL,name,type) VALUES('/user/login',"用户登录功能",2);
INSERT INTO menu(menuURL,name,type) VALUES('/user/register',"用户注册功能",2);
INSERT INTO menu(menuURL,name,type) VALUES('/user/wx_login',"微信用户登录",2);
INSERT INTO menu(menuURL,name,type) VALUES('/user/wx_register',"微信用户注册",2);
INSERT INTO menu(menuURL,name,type) VALUES('/user/updateUserLoginStatus',"单个用户 开启/禁止 登录",2);

INSERT INTO menu(menuURL,name,type) VALUES('/file/getFileSlice',"获取已上传的文件切片数组",2);
INSERT INTO menu(menuURL,name,type) VALUES('/file/uploadFileSlice',"文件上传切片",2);
INSERT INTO menu(menuURL,name,type) VALUES('/file/mergeFile',"合并文件切片",2);
INSERT INTO menu(menuURL,name,type) VALUES('/file/getFileInfo',"获取指定条件的全部文件信息",2);
INSERT INTO menu(menuURL,name,type) VALUES('/file/getFile',"获取文件",2);
INSERT INTO menu(menuURL,name,type) VALUES('/file/downloadFile',"下载文件",2);

INSERT INTO menu(menuURL,name,type) VALUES('/common/updateAllStatus',"修改common的所有状态其中之一",2);
INSERT INTO menu(menuURL,name,type) VALUES('/auth/verifyToken',"认证token",2);

INSERT INTO menu(menuURL,name,type) VALUES('/roleANDmenu/getRole',"查询所有角色（附带权限信息）",2);
INSERT INTO menu(menuURL,name,type) VALUES('/roleANDmenu/deleteRole',"指定删除角色",2);
INSERT INTO menu(menuURL,name,type) VALUES('/roleANDmenu/createRole',"添加角色（附带角色添加权限）",2);
INSERT INTO menu(menuURL,name,type) VALUES('/roleANDmenu/updateRole',"指定角色修改权限",2);
INSERT INTO menu(menuURL,name,type) VALUES('/common/getStatus',"获取指定字段值接口",2);
INSERT INTO menu(menuURL,name,type) VALUES('/user/getUsers',"获取全部用户接口",2);
INSERT INTO menu(menuURL,name,type) VALUES('/common/getSum',"获取各个表数据总量接口",2);
INSERT INTO menu(menuURL,name,type) VALUES('/roleANDmenu/getRoleById',"获取指定角色接口",2);
INSERT INTO menu(menuURL,name,type) VALUES('/roleANDmenu/getAllRole',"查询所有角色（不附带权限信息）接口",2);
INSERT INTO menu(menuURL,name,type) VALUES('/user/updateRole',"修改用户角色接口",2);



-- 2、角色表
CREATE TABLE IF NOT EXISTS role(
	id INT PRIMARY KEY AUTO_INCREMENT,
	roleName VARCHAR(255) NOT NULL UNIQUE,
	grade INT DEFAULT 1
);

SELECT * FROM role WHERE roleName=?
INSERT INTO role(roleName,grade) VALUES(?,?);

SELECT role.id, role.roleName, role.grade,
    JSON_ARRAYAGG(JSON_OBJECT('id',menu.id,'path', menu.menuURL, 'powerName', menu.name)) as power
FROM role
LEFT JOIN role_menu ON role.id = role_menu.role_id
LEFT JOIN menu ON role_menu.menu_id = menu.id
GROUP BY role.id
LIMIT 2 OFFSET 1

INSERT INTO role(roleName,grade) VALUES('超级管理员',1);
INSERT INTO role(roleName,grade) VALUES('普通管理员',2);
INSERT INTO role(roleName,grade) VALUES('普通用户',3);

-- 1&2、角色表_菜单表role_menu
CREATE TABLE IF NOT EXISTS role_menu(
	id INT PRIMARY KEY AUTO_INCREMENT,
	role_id INT,
	menu_id INT,
	FOREIGN KEY (menu_id) REFERENCES menu(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (role_id) REFERENCES role(id) ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT * FROM role_menu WHERE user_id=? AND menu_id=?
DELETE FROM role_menu WHERE user_id=?

INSERT INTO role_menu(menu_id,role_id) VALUES(5,2);
INSERT INTO role_menu(menu_id,role_id) VALUES(2,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(3,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(4,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(5,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(6,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(7,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(8,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(9,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(10,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(11,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(12,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(13,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(14,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(15,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(16,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(17,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(18,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(19,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(20,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(21,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(22,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(23,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(25,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(26,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(27,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(28,1);
INSERT INTO role_menu(menu_id,role_id) VALUES(29,1);


-- 3、用户表
CREATE TABLE IF NOT EXISTS user(
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(255) UNIQUE,
	password VARCHAR(255),
	wx_openid VARCHAR(255) UNIQUE,
	loginStatus INT DEFAULT 1,
	role_id INT DEFAULT 3,
	FOREIGN KEY (role_id) REFERENCES role(id) ON UPDATE CASCADE
);

INSERT INTO user(username,password,role_id) VALUES('xwl123','123456',1)
INSERT INTO user(username,password,role_id) VALUES('xwl01','123456',2)
SELECT * FROM `user` WHERE username=''
UPDATE user SET loginStatus = 0 WHERE id = 11
SELECT * FROM `user` WHERE id !=1 LIMIT 12 OFFSET 0
DELETE FROM `user` WHERE id=?;
SELECT COUNT(id) AS userSum FROM user
UPDATE user SET role_id = ? WHERE id = ?

-- 4、文件表
CREATE TABLE IF NOT EXISTS file(
	id INT PRIMARY KEY AUTO_INCREMENT,
	fileHashName VARCHAR(255) NOT NULL,
	fileName VARCHAR(255) NOT NULL,
	type VARCHAR(255) NOT NULL,
	user_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO file(fileHashName,userId,type) VALUES()
SELECT * FROM file WHERE user_id=? AND type LIKE ?% LIMIT 12 OFFSET 0


-- 5、公共表
CREATE TABLE IF NOT EXISTS common(
	id INT PRIMARY KEY AUTO_INCREMENT,
	loginStatus_all_user VARCHAR(255) NOT NULL DEFAULT 1,
	registerStatus_all_user VARCHAR(255) NOT NULL DEFAULT 1,
	loginStatus_all_admin VARCHAR(255) NOT NULL DEFAULT 1,
	registerStatus_all_admin VARCHAR(255) NOT NULL DEFAULT 1,
	memory DOUBLE DEFAULT 0,
	numberOfUsers INT DEFAULT 0
);

INSERT INTO common(loginStatus_all_user) VALUES(1)
UPDATE common SET loginStatus_all_admin = 1









