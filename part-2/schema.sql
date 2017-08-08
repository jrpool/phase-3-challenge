create table sections (
  id serial primary key,
  name text not null unique
);

comment on table sections is 'product sections of store';
comment on column sections.id is 'ID';
comment on column sections.name is 'name';

create table products (
  id serial primary key,
  name text not null unique,
  price integer not null,
  section integer not null,
  foreign key(section) references sections(id)
);

comment on table products is 'products ever stocked or sold by store';
comment on column products.id is 'ID';
comment on column products.name is 'name';
comment on column products.price is 'price in cents per 1 unit';
comment on column products.section is 'section where stocked';

create table shoppers (
  id serial primary key,
  name text not null unique
);

comment on table shoppers is 'prospective or actual customers of store';
comment on column shoppers.id is 'ID';
comment on column shoppers.name is 'name';

create table transactions (
  id serial primary key,
  label text unique,
  shopper integer not null,
  foreign key(shopper) references shoppers(id)
);

comment on table transactions is 'purchase events';
comment on column transactions.id is 'ID';
comment on column transactions.label is 'business label';
comment on column transactions.shopper is 'shopper who made the purchase';

create table sales (
  id serial primary key,
  transaction integer not null,
  product integer not null,
  foreign key(transaction) references transactions(id),
  foreign key(product) references products(id)
);

comment on table sales is 'products included in purchase events';
comment on column sales.id is 'ID';
comment on column sales.transaction is 'purchase event';
comment on column sales.product is 'product of which 1 unit was included';

create function section_products(
  section integer, out product_name text, out section_name text
) returns setof record language sql stable as $$
  select products.name as product_name, sections.name as section_name
  from products, sections
  where sections.id = section
  and products.section = section
  order by products.name;
$$;

comment on function section_products(integer) is 'In: ID of a section. Out: product names and section name of products in the section.';

create function shopper_transactions(
  shopper integer, out transaction integer, out cost text
) returns setof record language sql stable as $$
  select transactions.id as transaction,
  to_char(sum(products.price) / 100.0, 'FM0000.99') as cost
  from transactions, sales, products
  where transactions.shopper = shopper
  and sales.transaction = transactions.id
  and products.id = sales.product
  group by transactions.id
  order by transactions.id;
$$;

comment on function shopper_transactions(integer) is 'In: ID of a shopper. Out: ID and total cost of each of the shopper’s transactions.';

create function real_shoppers(
  out shopper text, out transaction_count integer
) returns setof record language sql stable as $$
  select shoppers.name as shopper,
  cast(count(transactions.id) as integer) as transaction_count
  from shoppers, transactions
  where transactions.shopper = shoppers.id
  group by shoppers.name
  order by shoppers.name;
$$;

comment on function real_shoppers() is 'Out: name of each shopper with 1 or more transactions and the count of those transactions.';
