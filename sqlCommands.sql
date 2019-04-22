use mydb;

create table authors(
    id      int not null    auto_increment,
    name    varchar(25),
    role    varchar(8),
    primary key(id)
);

create table customer(
	cusId	    int	not null	auto_increment,
    email	    varchar(50),
    password    varchar(20),
    fname	    varchar(15),
    lname	    varchar(15),
    address	    varchar(50),
    city	    varchar(10),
    state	    varchar(10),
    pincode	    numeric(6),
    mobile	    numeric(12),
    aadhar	    numeric(12),
    primary key(cusId)
);

create table ombudsman(
	ombId       int	not null	auto_increment,
    name	    varchar(20),
    email	    varchar(50),
    password	varchar(20),
    primary key(ombId)
);

create table department(
	deptId	    int	not null	auto_increment,
    name	    varchar(15),
    primary key(deptId)
);

create table issue(
	issId	    int	not null	auto_increment,
    name	    varchar(20),
    email	    varchar(50),
    pay		    int,
    type	    varchar(15),
    nature	    varchar(20),
    dsc		    varchar(200),
    deptId	    int not null	references department(deptId),
    primary key(issId)
);

create table serviceProvider(
	spId        int	not null	auto_increment,
    name	    varchar(20),
    email	    varchar(50),
    password    varchar(20),
    pincode	    numeric(6),
    mobile	    numeric(12),
    primary key(spId)
);

create table spDept(
    spId        int not null    references serviceProvider(spId),
    deptId      int not null    references department(deptId),
    primary key(spId, deptId)
);

create table govtTracked(
    ombId       int	not null    references ombudsman(ombId),
    issId       int	not null    references issue(issId),
    status      varchar(20),
    primary key(ombId, issId)
);

create table takenIssues(
    spId        int not null    references serviceProvider(spId),
    issId       int	not null    references issue(issId),
    date        date,
    status      varchar(20),
    primary key(spId, issId)
);

create table sitelog(
    logId		int not null    auto_increment,
    triggerName varchar(10),
    tableName   varchar(15),
    value		varchar(100),
    primary key(logId)
);

insert into authors values(null,'L Srihari','PO+DEV');
insert into authors values(null,'Rikil Gajarla','SM+DEV');
insert into authors values(null,'Raj Kashyap Mallala','DEV');
insert into authors values(null,'T Naga Sai Bharath','DEV');
insert into authors values(null,'Kasuba Badri Vishal','DEV');

insert into ombudsman values(null, 'Rahul', 'ombudsman@issueredressal', 'ombud@123');