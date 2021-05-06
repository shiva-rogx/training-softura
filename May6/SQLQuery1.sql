create database dbSoftTransport

use dbSoftTransport

create table tblEmployee
(Id int identity(101,1) primary key,
name varchar(20) not null,
Password varchar(2) not null,
Location varchar(20),
Phone varchar(20),
Vechile_Id char(8))

create table tblDriver
(Id int identity(100,1) primary key,
Name varchar(2),
Phone varchar(20),
status varchar(5) check(status in ('active','not active')))

create table tblVechile
(Vechile_number char(8) primary key,
Type varchar(10),
Capacity int,
Driver_ID int references tblDriver(id),
Filled_Status int,
status varchar(50) check(status in ('running','discard')))

alter table tblEmployee
add constraint fk_VID foreign key (Vechile_Id) references tblVechile(Vechile_number)

create proc proc_InsertEmployee(@eName varchar(20),
@ePassword varchar(20),
@eLocation varchar(20),
@ePhone varchar(20))
as
Insert into tblEmployee(Name,Password,Location,Phone) values (@eName,@ePassword,@eLocation,@ePhone)

exec proc_InsertEmployee 'Zeus', '1234','Titan', '9884503330'  create proc proc_UpdatePassword(@eid int,@ePassw

 



create proc proc_UpdatePassword(@eid int,@ePassword varchar(20))
as
update tblEmployee set Password =@ePassword where id = @eid

create proc proc_GetAllEmployees
as select * from tblEmployee
exec proc_GetAllEmployees




select * from tblEmployee



























































































































