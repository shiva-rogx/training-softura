select * from publishers
----1---
select city , count(au_id)author_count from authors group by city


----2----
select au_fname,au_lname,city from authors
where city in (select city from publishers where pub_name!='New Moon Book')

----3----
create proc proc_Updatetheprice(@fname varchar(30),@lname varchar(30),@n_price varchar(30))
as
begin
update titles set price=@n_price where title_id in
(select title_id from titleauthor where au_id in
(select au_id from authors where au_fname=@fname and au_lname=@lname))
end

exec proc_Updatetheprice 'Johnson','White','200'

select * from titles

---4---
create function fn_CalculateTaxSales(@quantity int)
returns float
as
begin
declare
@tax int
if(@quantity < 10)
set @tax=2
else if(@quantity>10 and @quantity<=20)
set @tax=5
else if(@quantity>20 and @quantity<=50)
set @tax=6
else
set @tax=7.5
return @tax
end
select qty,dbo. fn_CalculateTaxSales(qty) 'Tax' from sales
