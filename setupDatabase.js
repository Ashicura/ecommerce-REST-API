const { Client } = require('pg');
const { DB } = require('./config');

(async () => {

  const usersTableStmt = `
  CREATE TABLE IF NOT EXISTS public."User"
  (
      userid integer NOT NULL DEFAULT nextval('"User_userid_seq"'::regclass),
      password character varying(30) COLLATE pg_catalog."default" NOT NULL,
      email character varying(50) COLLATE pg_catalog."default" NOT NULL,
      firstname character varying(50) COLLATE pg_catalog."default" NOT NULL,
      lastname character varying(50) COLLATE pg_catalog."default" NOT NULL,
      CONSTRAINT "User_pkey" PRIMARY KEY (userid)
  )
  
  TABLESPACE pg_default;
  
  ALTER TABLE public."User"
      OWNER to postgres;
  `

  const productsTableStmt = `
  CREATE TABLE IF NOT EXISTS public.product
  (
      productid integer NOT NULL DEFAULT nextval('product_productid_seq'::regclass),
      name integer NOT NULL,
      price integer NOT NULL,
      created timestamp without time zone NOT NULL,
      modified timestamp without time zone,
      orderitemorderitemid integer NOT NULL,
      CONSTRAINT product_pkey PRIMARY KEY (productid)
  )
  
  TABLESPACE pg_default;
  
  ALTER TABLE public.product
      OWNER to postgres;
  `

  const ordersTableStmt = `
  CREATE TABLE IF NOT EXISTS public."Order"
  (
      orderid integer NOT NULL DEFAULT nextval('"Order_orderid_seq"'::regclass),
      created timestamp without time zone NOT NULL,
      total integer NOT NULL,
      status character varying(50) COLLATE pg_catalog."default" NOT NULL,
      userid integer NOT NULL,
      CONSTRAINT "Order_pkey" PRIMARY KEY (orderid),
      CONSTRAINT fkorder740298 FOREIGN KEY (userid)
          REFERENCES public."User" (userid) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
  )
  
  TABLESPACE pg_default;
  
  ALTER TABLE public."Order"
      OWNER to postgres;
  `

  const orderItemsTableStmt = `
  CREATE TABLE IF NOT EXISTS public.orderitem
  (
      orderitemid integer NOT NULL DEFAULT nextval('orderitem_orderitemid_seq'::regclass),
      quantity integer NOT NULL,
      created timestamp without time zone NOT NULL,
      modified timestamp without time zone,
      price integer NOT NULL,
      orderid integer NOT NULL,
      productid integer NOT NULL,
      CONSTRAINT orderitem_pkey PRIMARY KEY (orderitemid),
      CONSTRAINT fkorderitem358842 FOREIGN KEY (orderid)
          REFERENCES public."Order" (orderid) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION,
      CONSTRAINT fkorderitem557764 FOREIGN KEY (productid)
          REFERENCES public.product (productid) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
  )
  
  TABLESPACE pg_default;
  
  ALTER TABLE public.orderitem
      OWNER to postgres;
  `

  const cartsTableStmt = `
  CREATE TABLE IF NOT EXISTS public.cart
  (
      cartid integer NOT NULL DEFAULT nextval('cart_cartid_seq'::regclass),
      created timestamp without time zone NOT NULL,
      modified timestamp without time zone,
      CONSTRAINT cart_pkey PRIMARY KEY (cartid)
  )
  
  TABLESPACE pg_default;
  
  ALTER TABLE public.cart
      OWNER to postgres;
  `

  const cartItemsTableStmt = `
  CREATE TABLE IF NOT EXISTS public.cartitem
  (
      cartitemid integer NOT NULL DEFAULT nextval('cartitem_cartitemid_seq'::regclass),
      created timestamp without time zone NOT NULL,
      modified timestamp without time zone,
      productid integer NOT NULL,
      cartid integer NOT NULL,
      CONSTRAINT cartitem_pkey PRIMARY KEY (cartitemid),
      CONSTRAINT fkcartitem524958 FOREIGN KEY (cartid)
          REFERENCES public.cart (cartid) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION,
      CONSTRAINT fkcartitem654126 FOREIGN KEY (productid)
          REFERENCES public.product (productid) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
  )
  
  TABLESPACE pg_default;
  
  ALTER TABLE public.cartitem
      OWNER to postgres;
  `

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PGPORT
    });

    await db.connect();

    // Create tables on database
    await db.query(usersTableStmt);
    await db.query(productsTableStmt);
    await db.query(ordersTableStmt);
    await db.query(orderItemsTableStmt);
    await db.query(cartsTableStmt);
    await db.query(cartItemsTableStmt);

    await db.end();

  } catch(err) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
  }

})();