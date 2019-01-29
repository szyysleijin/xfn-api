set names utf8;
drop database if exists xfn;
create database xfn charset=utf8;
use xfn;

/*用户管理*/
create table xfn_admin(
    aid int primary key auto_increment,
    aname varchar(32) unique,
    apwd varchar(64)
);
insert into xfn_admin values
(null,'admin',password('123456')),
(null,'boss',password('666666'));

/*全局设置*/
create table xfn_settings(
    sid int primary key auto_increment,
    appName varchar(32),
    apiUrl varchar(64),
    adminUrl varchar(64),
    appUrl varchar(64),
    icp varchar(64),
    copyright varchar(128)
);
insert into xfn_settings values
(null,'xfn','http:127.0.0.1:8090','http:127.0.0.1:8091','http:127.0.0.1:8092','粤ICP备12896328号-1','Copyright© 2006-2018 happigo. All Rights Reserved');


/*桌台表*/
create table xfn_table(
    tid int primary key auto_increment,
    tname varchar(32),
    type varchar(32),
    status int
);
insert into xfn_table values
(null,'福满堂','6-8人桌',1),
(null,'金镶玉','4人桌',2),
(null,'寿齐天','10人桌',3),
(null,'全家福','2人桌',0);

/*桌台预定信息*/
create table xfn_reservation(
    rid int primary key auto_increment,
    contactName varchar(32),
    phone varchar(32),
    contactTime bigint,
    dinnerTime bigint
);
insert into xfn_reservation values
(null,'leilei','137114','1432304830420','177868410400000'),
(null,'wanyun','1371127','1213404830420','5438410400000'),
(null,'yida','131411127','146543404830420','11238410400000');

/*菜品类别*/
create table xfn_category(
    cid int primary key auto_increment,
    cname varchar(32)
);
insert into xfn_category values
(null,'肉类'),
(null,'菇类'),
(null,'素类'),
(null,'菜类'),
(null,'海鲜类'),
(null,'丸子类');

/*菜品*/
create table xfn_dish(
    did int primary key auto_increment,
    title varchar(32),
    imgUrl varchar(128),
    price decimal(6,2),
    detail varchar(128),
    categoryId int,
    FOREIGN key(categoryId) REFERENCES xfn_category(cid)
);
insert into xfn_dish values
(666,)