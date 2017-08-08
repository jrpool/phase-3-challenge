insert into sections(name)
  select distinct col2 from seed_data
  where col0 != '_transaction' and col0 != '_sale'
  order by col2;

insert into products(name, price, section)
  select seed_data.col0, 100 * cast(seed_data.col1 as numeric), sections.id
  from seed_data join sections on (sections.name = seed_data.col2)
  where col0 != '_transaction' and col0 != '_sale'
  order by seed_data.col0;

insert into shoppers(name)
  select distinct col2 from seed_data
  where col0 = '_transaction'
  order by col2;

insert into transactions(label, shopper) select seed_data.col1, shoppers.id
  from seed_data, shoppers
  where seed_data.col0 = '_transaction'
  and shoppers.name = seed_data.col2
  order by col1;

insert into sales(transaction, product)
  select transactions.id, products.id from seed_data, transactions, products
  where seed_data.col0 = '_sale'
  and transactions.label = seed_data.col1
  and products.name = seed_data.col2
  order by transactions.id, products.id;

drop table seed_data;
