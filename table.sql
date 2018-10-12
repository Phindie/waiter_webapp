-- DROP TABLE waiter,  shifts, weekdays; 
create table waiter(
    id serial primary key not null,
    first_name text not null,
    namecode int not null
);

create table weekdays(
    id serial primary key not null,
    day text not null

);

create table shifts (
    id serial primary key not null,
    waiter_id int not null,
    weekday_id int not null,
    FOREIGN key (waiter_id) REFERENCES waiter(id),
    FOREIGN KEY (weekday_id) REFERENCES weekdays(id)
);