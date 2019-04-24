use mydb;

create table authors(
    id      int not null    auto_increment,
    name    varchar(25),
    role    varchar(8),
    primary key(id)
);

create table customer2(
	cusId	    int	not null	auto_increment,
    email	    varchar(50),
    password    varchar(20),
    fname	    varchar(15),
    lname	    varchar(15),
    location    varchar(100),
    pincode	    numeric(6),
    mobile	    numeric(12),
    aadhaar	    numeric(12),
    primary key(cusId)
);

create table customer11(
    pincode	    numeric(6),
    city	    varchar(10),
    primary key(pincode)
);

create table customer12(
	city varchar(20) not null,
    state varchar(20) not null,
    primary key(city)
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
    dname	    varchar(15),
    primary key(deptId)
);

create table issue(
	issId	    int	not null	auto_increment,
    title	    varchar(50),
    email	    varchar(50),
    pay		    int,
    type	    varchar(15),
    dsc		    varchar(400),
    deptId	    int not null	references department(deptId),
    status      varchar(30),
    primary key(issId)
);

create table serviceProvider(
	spId        int	not null	auto_increment,
    fname	    varchar(20),
    lname	    varchar(20),
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
    primary key(issId)
);

create table takenIssues(
    spId        int not null    references serviceProvider(spId),
    issId       int	not null    references issue(issId),
    datetime	datetime,
    primary key(issId)
);

create table sitelog(
    logId		    int not null    auto_increment,
    description		varchar(100),
    time            datetime,
    primary key(logId)
);

insert into authors values(null,'L Srihari','PO+DEV');
insert into authors values(null,'Rikil Gajarla','SM+DEV');
insert into authors values(null,'Raj Kashyap Mallala','DEV');
insert into authors values(null,'T Naga Sai Bharath','DEV');
insert into authors values(null,'Kasuba Badri Vishal','DEV');

insert into ombudsman values(null, 'Rahul', 'ombudsman@issueredressal', 'ombud@123');

create trigger t1 after insert on issue
    for each row
        insert into sitelog values(null,concat(new.title," is posted"),now());

create trigger t2 after update on issue
    for each row
        insert into sitelog values(null,concat(old.title," post is updated to",new.title),now());

create trigger t3 after insert on customer2
    for each row
        insert into sitelog values(null,concat("new customer",new.fname," is registered"),now());
