# 连接mysql
mysql -u root -p

# 断开
exit

# 显示数据库
show databases;

# 创建数据库 - cms为meta_react_admin
create database meta_react_admin;

# 删除数据库
drop database meta_react_admin;

# 使用数据库
use meta_react_admin;

# 创建表 (id 主键 自增, username, password)
# 字符串 varchar
# 数字 INT
# comment 备注
create table user (
    id int primary key AUTO_INCREMENT,
    username varchar(30) comment "用户名",
    password varchar(30) comment "密码"
);

# 查看表
show tables;

# 删除表
drop table user;

# 描述表（表中有哪些字段）
describe user;

# 表格的增删改查
# 增加表数据
insert into user values(1, 'admin', 'admin');
insert into user values(2, 'lesenelir', '18');
insert into user values(null, 'lee', '20');

# 查询表数据
# 查询user表中所有数据
select * from user;
# 查询user中用户名'admin'的该行数据
select * from user where username='admin';
# 查询user中用户名'admin'的密码
select password from user where username='admin';

# 更新表数据
update user set password='admin1' where username='admin'

# 删除表数据
delete from user where username='lee';

