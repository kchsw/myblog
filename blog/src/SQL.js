-- use myblog;
-- show tables;
-- insert into users (username, `password`, realname) values('kchsw', '123', '逆势');
-- select * from users;
-- select id, username from users;
-- select * from users where username="nmsl" and `password`='123';
-- select * from users where username="nmsl" or `password`='123';
-- select * from users where username like '%nm%'; 模糊查询;
-- select * from users order by id desc; 倒序
-- update users set  realname='cxk' where username='nmsl';
-- select * from users;
-- SET SQL_SAFE_UPDATES = 0;
-- delete from users where username='kchsw';
-- select * from users where state='1';
-- select * from users where state<>'1'; -- 不等于0
-- update users set state="0" where username="kchsw"; -- 软删除

-- insert into blogs(title, content, createtime, author) values('标题B', '内容B', 1558086678823,'cxk');
-- select * from blogs
-- select * from blogs order by createtime desc;
-- select * from blogs where author="nmsl" order by createtime desc;


redis-server.exe redis.windows.conf
redis-cli.exe