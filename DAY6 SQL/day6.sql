create database dbSoftTraining1 

--select db--
use dbSoftTraining1 

--DDL 
create table tblSample
(id int,
name varchar(30)
)

drop table tblSample

create table skills
(skill_name varchar(20) primary key,
skill_description text
)
create table Cities
(zip_code char(4),
city varchar(20),
primary key(zip_code)
)

create table Employees
(id char(4) primary key,
name varchar(30) not null,
phone varchar(15) not null,
zip char(4) references Cities(zip_code))

sp_help Employees

--complicite key primary key id + skill name--
create table employeeskill
(employee_id char(4) references employees(id),
skill_name varchar(20) references skills(skill_name),
skill_level float default 1,
constraint pk_empskill primary key(employee_id,skill_name))


sp_help employeeSkill

insert into skills(skill_name,skill_description)
values('C','PLT')
insert into skills values('C++','OOPS')
insert into skills('h',null)
insert into skills(skill_description,skill_name) values('Web','Java')




insert into skills values(null,'OOPS')



update skills set skill_description='HTML'
where skill_name='C' --where clause-filterin record

--del a record--
delete from skills where skill_name='C'

insert into Cities values('1234','ABC') 
insert into Cities values('3211','DFG') 

select * from Cities

insert into employees values('E001','Ramu','1234567890','1234')
insert into employees values('E002','Somu','9876543210','3211')

insert into employeeskill values('E001','Java',7)

insert into employeeskill(employee_id,skill_name)
values('E002','Java')


