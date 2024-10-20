-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP SEQUENCE public.group_members_id_seq;

CREATE SEQUENCE public.group_members_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.groups_id_seq;

CREATE SEQUENCE public.groups_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.message_readby_id_seq;

CREATE SEQUENCE public.message_readby_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.messages_id_seq;

CREATE SEQUENCE public.messages_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.users_id_seq;

CREATE SEQUENCE public.users_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public."groups" definition

-- Drop table

-- DROP TABLE public."groups";

CREATE TABLE public."groups" (
	id serial4 NOT NULL,
	groupname varchar NOT NULL,
	"name" varchar NOT NULL,
	description text NULL,
	image varchar NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	deleted_at timestamp NULL,
	CONSTRAINT groups_pk PRIMARY KEY (id),
	CONSTRAINT groups_un UNIQUE (groupname)
);


-- public.messages definition

-- Drop table

-- DROP TABLE public.messages;

CREATE TABLE public.messages (
	id serial4 NOT NULL,
	"from" int4 NOT NULL,
	"to" int4 NOT NULL,
	to_group bool NOT NULL DEFAULT false,
	message text NULL,
	attachments text NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	deleted_at timestamp NULL,
	CONSTRAINT messages_pk PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	"name" varchar NOT NULL,
	description text NULL,
	image varchar NULL,
	is_online bool NOT NULL DEFAULT false,
	last_seen timestamp NOT NULL DEFAULT now(),
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	deleted_at timestamp NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_un UNIQUE (username)
);


-- public.group_members definition

-- Drop table

-- DROP TABLE public.group_members;

CREATE TABLE public.group_members (
	id serial4 NOT NULL,
	group_id int4 NOT NULL,
	user_id int4 NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	deleted_at timestamp NULL,
	CONSTRAINT group_members_pk PRIMARY KEY (id),
	CONSTRAINT group_members_fk FOREIGN KEY (user_id) REFERENCES public.users(id),
	CONSTRAINT group_members_groupid_fk FOREIGN KEY (group_id) REFERENCES public."groups"(id)
);


-- public.message_readby definition

-- Drop table

-- DROP TABLE public.message_readby;

CREATE TABLE public.message_readby (
	id serial4 NOT NULL,
	message_id int4 NOT NULL,
	user_id int4 NOT NULL,
	"timestamp" timestamp NOT NULL DEFAULT now(),
	CONSTRAINT message_readby_pk PRIMARY KEY (id),
	CONSTRAINT message_readby_fk FOREIGN KEY (user_id) REFERENCES public.users(id),
	CONSTRAINT message_readby_messageid_fk FOREIGN KEY (message_id) REFERENCES public.messages(id)
);