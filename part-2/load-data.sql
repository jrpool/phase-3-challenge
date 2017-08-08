create temporary table seed_data (col0 text, col1 text, col2 text);

copy seed_data from stdin (format csv, header);

insert into sections(name)
  select distinct col2 from seed_data
  where col0 != '_order' and col0 != '_sale'
  order by col2;

insert into products(name, price, section)
  select seed_data.col0, 100 * cast(seed_data.col1 as numeric), sections.id
  from seed_data join sections on (sections.name = seed_data.col2)
  where col0 != '_order' and col0 != '_sale'
  order by seed_data.col0;

insert into shoppers(name)
  select distinct col2 from seed_data
  where col0 = '_order'
  order by col2;

insert into orders(label, shopper) select col1, col2 from seed_data
  where col0 = '_order'
  order by col1;

insert into sales(order, product) select col1, col2 from seed_data
  where col0 = '_sale';

drop table seed_data;
