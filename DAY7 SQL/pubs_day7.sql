select * from authors --all cols

--projection- restriction on cols for display
select au_lname,au_fname from authors

--givin alies name for cols for display
select au_fname First_Name, au_lname Last_Name from authors

--selection filter the rows
select * from authors where state = 'CA'
select * from authors where state != 'CA'

select * from employee where minit is not null
select * from employee where job_id>10
select * from employee where job_id<10

select * from employee where job_id>10 and job_id<15
select * from employee where job_id between 10 and 15
select * from employee where job_id=11 or job_id=14 or job_id=6
--same as above
select * from employee where job_id in(11,14,6)
select * from employee where job_id not in(11,14,6)

select * from employee where fname='Maria'
--starts with ___-- first 3 char be MAR and other be any chars
select * from employee where fname like'Mar%'
--1st chat can be anythin, 2nd char be o and other all any char--
select * from employee where fname like '_o%'

--select a wanted col with condition specified
select emp_id from employee where fname like '_o%'

select fname,lname from employee where job_id not in(11,14,6)

select * from titles
--unique values of repeated data col
select distinct pub_id from titles
--aggeragation--
select sum(advance) from titles
select count(advance) number_count from titles
select max(advance) maximum from titles
select min(advance) minimum from titles
select avg(advance) average from titles

select count(*) number_count from titles where pub_id=0877
select count(*) number_count from titles where pub_id=1389
--group by(for every)
select pub_id,count(*) number_count from titles group by pub_id
-- average advance for titles pushed b every publisher
select pub_id,avg(advance) average_advance from titles group by pub_id
select pub_id,count(title) average_advance from titles group by pub_id

select * from sales
--print the sum of quantity for ever title
select title_id,sum(qty) as Total_quantity from sales group by title_id
select title_id,sum(qty) from sales group by title_id

--print average royalty paid for title of every type
select type,avg(royalty) as Average_Royalty from titles group by type


--print num of orders placed in every store
select stor_id,count(ord_num) as Num_orders from sales group by stor_id

--PRINT SAME NO. OF ORDERS IN EVERY STORES WHICH IS > 2--
-- NOTE; cannot use where clase in aggregate function--
select stor_id,count(ord_num) as Num_orders from sales group by stor_id having count(payterms)>2


--SELECT AVG ROYALTY FOR EVERY TYPE IS AVG < 15--
select type,avg(royalty) Average_Royalty from titles group by type having avg(royalty)<15

--Sorting //default order is ascending
select * from authors order by au_lname
select * from authors order by city
select * from authors order by state,city
 --if we want descending order sort
select * from authors order by city desc
select * from authors order by phone desc

--update any record--change anything--
--update authors set au_lname = 'Paul',au_fname = '' where au_id = '341-22-1782'
--select * from authors where au_id ='341-22-1782'

--order select,from,where,group by, having,order by--
--order select,from,where
--order select,from,where,group by,having
--order slect,from order by
--cannot have select,from order by

--Sub Query--
select * from titles
select * from sales
--print the sales of the title 'The Gourmet Microname'
select * from sales where title_id = 'MC3021' 

--get title id--
select title_id from titles where title = 'The Gourmet Microname'

--instead of above, THIS IS SUBQUERY
select * from sales where title_id = 
(select title_id from titles where title = 'The Busy Executive''s Database Guide')
select * from publishers


select title_id,sum(qty) sum_of_qty from sales where title_id in 
(select title_id from titles where pub_id =
(select pub_id from publishers where pub_name='New Moon Books'))
group by title_id having sum(qty)<=25 order by sum(qty) 


--print title name & sale quantity- HOW?
--title name is at TITLES TABLE
--sale quantity is at SALES

--JOINT-- HELPS TO ADD DATA TABLE--
--NOTE: If use JOIN, ON condition is used--
--INNER JOIN; ONLY FETCHES INNER DATA WHICH ARE COMMON / RELATED DATA--
select title,qty from titles join sales 
on 
titles.title_id = sales.title_id

--Print the title_id in the sales table--
select * from sales
select title_id from sales
--print unique title_id in sales table--
select distinct title_id from sales

--print title id in title table that are not in sale table--
select title_id from titles where title_id not in 
(select distinct title_id from sales)

--join with title table--
select t.title_id,title ,qty from titles t join sales s 
on
t.title_id = s.title_id

--LEFT OUTER JOINT--WHEN WANT ALL TITLE ID & TITLE NAME, IF SOLD QUANTITY
--;JOINT FETCHES ALL RECORDS FROM LEFT TABLE 
--EVEN IF IT DOES NOT HAVIN MATCHING RECORD IN RIGHT SIDE TABLE--
--join with title table--
select t.title_id,title ,qty from titles t left outer join sales s 
on
t.title_id = s.title_id

--print publisher_name & title name--
select pub_name,title from publishers join titles
on 
publishers.pub_id=titles.pub_id

--print all publisher's name if they have published a title,
--then print the title name too-
select pub_name,title from publishers left outer join titles
on 
publishers.pub_id=titles.pub_id



--23.04.2021--NOON TASK
--1. select author fN and lN--
select au_fname,au_lname from authors
--2. sort title by title name in dec & print all--
select * from titles
select title from titles order by title desc
--3. print num of titlepublished by every author--
select * from titles
select * from authors
select  distinct title_id,count(*) 
from titleauthor group by title_id
--4. print au name & title name--
select * from authors
select au_fname,au_lname, title from authors,titles
--5. print the publisher name and the average advance for every publisher
select * from titles
select pub_name,avg(advance) AveRage from titles, publishers group by pub_name
--6. print the publishername, author name, title name and the sale amount(qty*price)
select pub_name,au_fname as FIrstN, au_lname as Lastn, title, qty*price as SaleAmount from 
authors, publishers p join titles t on p.pub_id=t.pub_id join sales s on t.title_id=s.title_id
--7 .print the price of all that titles that have name taht ends with s
select price from titles where title like '%s'
--8. print the title names that contain and in it
select title from titles where title like '%and%'
--9. print the employee name and the publisher name
select pub_name,fname from publishers join employee on
publishers.pub_id = employee.pub_id
--10. print the publisher name and number of employees woking in it if the publisher has more than 2 employees
select pub_name,count(fname) As NumberOfEmployee from publishers P join employee E on P.pub_id=E.pub_id group by pub_name having count(fname)>2
--11. Print the author names who have published using teh publisher name 'Algodata Infosystems'
 select au_fname from authors,publishers where pub_name='Algodata Infosystems'
--12. Print the employees of the publisher 'Algodata Infosystems'
select fname from publishers join employee on
publishers.pub_id = employee.pub_id
where pub_name='Algodata Infosystems'
select * from publishers










































































































