--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-10-24 01:04:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'WIN1252';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: yipyap; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA yipyap;


ALTER SCHEMA yipyap OWNER TO pg_database_owner;

--
-- TOC entry 4847 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA yipyap; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA yipyap IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 25239)
-- Name: group_members; Type: TABLE; Schema: yipyap; Owner: postgres
--

CREATE TABLE yipyap.group_members (
    id integer NOT NULL,
    group_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE yipyap.group_members OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 25242)
-- Name: group_members_id_seq; Type: SEQUENCE; Schema: yipyap; Owner: postgres
--

CREATE SEQUENCE yipyap.group_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE yipyap.group_members_id_seq OWNER TO postgres;

--
-- TOC entry 4848 (class 0 OID 0)
-- Dependencies: 222
-- Name: group_members_id_seq; Type: SEQUENCE OWNED BY; Schema: yipyap; Owner: postgres
--

ALTER SEQUENCE yipyap.group_members_id_seq OWNED BY yipyap.group_members.id;


--
-- TOC entry 217 (class 1259 OID 25185)
-- Name: groups; Type: TABLE; Schema: yipyap; Owner: postgres
--

CREATE TABLE yipyap.groups (
    id integer NOT NULL,
    groupname character varying NOT NULL,
    name character varying NOT NULL,
    description text,
    image character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE yipyap.groups OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25226)
-- Name: groups_id_seq; Type: SEQUENCE; Schema: yipyap; Owner: postgres
--

CREATE SEQUENCE yipyap.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE yipyap.groups_id_seq OWNER TO postgres;

--
-- TOC entry 4849 (class 0 OID 0)
-- Dependencies: 220
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: yipyap; Owner: postgres
--

ALTER SEQUENCE yipyap.groups_id_seq OWNED BY yipyap.groups.id;


--
-- TOC entry 223 (class 1259 OID 25261)
-- Name: message_readby; Type: TABLE; Schema: yipyap; Owner: postgres
--

CREATE TABLE yipyap.message_readby (
    id integer NOT NULL,
    message_id integer NOT NULL,
    user_id integer NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE yipyap.message_readby OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 25264)
-- Name: message_readby_id_seq; Type: SEQUENCE; Schema: yipyap; Owner: postgres
--

CREATE SEQUENCE yipyap.message_readby_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE yipyap.message_readby_id_seq OWNER TO postgres;

--
-- TOC entry 4850 (class 0 OID 0)
-- Dependencies: 224
-- Name: message_readby_id_seq; Type: SEQUENCE OWNED BY; Schema: yipyap; Owner: postgres
--

ALTER SEQUENCE yipyap.message_readby_id_seq OWNED BY yipyap.message_readby.id;


--
-- TOC entry 216 (class 1259 OID 25182)
-- Name: messages; Type: TABLE; Schema: yipyap; Owner: postgres
--

CREATE TABLE yipyap.messages (
    id integer NOT NULL,
    "from" integer NOT NULL,
    "to" integer NOT NULL,
    to_group boolean DEFAULT false NOT NULL,
    message text,
    attachments text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE yipyap.messages OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25203)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: yipyap; Owner: postgres
--

CREATE SEQUENCE yipyap.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE yipyap.messages_id_seq OWNER TO postgres;

--
-- TOC entry 4851 (class 0 OID 0)
-- Dependencies: 219
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: yipyap; Owner: postgres
--

ALTER SEQUENCE yipyap.messages_id_seq OWNED BY yipyap.messages.id;


--
-- TOC entry 215 (class 1259 OID 25179)
-- Name: users; Type: TABLE; Schema: yipyap; Owner: postgres
--

CREATE TABLE yipyap.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    name character varying NOT NULL,
    description text,
    image character varying,
    is_online boolean DEFAULT false NOT NULL,
    last_seen timestamp without time zone DEFAULT now() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE yipyap.users OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25188)
-- Name: users_id_seq; Type: SEQUENCE; Schema: yipyap; Owner: postgres
--

CREATE SEQUENCE yipyap.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE yipyap.users_id_seq OWNER TO postgres;

--
-- TOC entry 4852 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: yipyap; Owner: postgres
--

ALTER SEQUENCE yipyap.users_id_seq OWNED BY yipyap.users.id;


--
-- TOC entry 4666 (class 2604 OID 25243)
-- Name: group_members id; Type: DEFAULT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.group_members ALTER COLUMN id SET DEFAULT nextval('yipyap.group_members_id_seq'::regclass);


--
-- TOC entry 4663 (class 2604 OID 25227)
-- Name: groups id; Type: DEFAULT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.groups ALTER COLUMN id SET DEFAULT nextval('yipyap.groups_id_seq'::regclass);


--
-- TOC entry 4669 (class 2604 OID 25265)
-- Name: message_readby id; Type: DEFAULT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.message_readby ALTER COLUMN id SET DEFAULT nextval('yipyap.message_readby_id_seq'::regclass);


--
-- TOC entry 4659 (class 2604 OID 25204)
-- Name: messages id; Type: DEFAULT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.messages ALTER COLUMN id SET DEFAULT nextval('yipyap.messages_id_seq'::regclass);


--
-- TOC entry 4654 (class 2604 OID 25189)
-- Name: users id; Type: DEFAULT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.users ALTER COLUMN id SET DEFAULT nextval('yipyap.users_id_seq'::regclass);


--
-- TOC entry 4838 (class 0 OID 25239)
-- Dependencies: 221
-- Data for Name: group_members; Type: TABLE DATA; Schema: yipyap; Owner: postgres
--

COPY yipyap.group_members (id, group_id, user_id, created_at, updated_at, deleted_at) FROM stdin;
1	1	1	2024-10-21 00:41:56.282018	2024-10-21 00:41:56.282018	\N
2	1	2	2024-10-21 00:41:56.282018	2024-10-21 00:41:56.282018	\N
\.


--
-- TOC entry 4834 (class 0 OID 25185)
-- Dependencies: 217
-- Data for Name: groups; Type: TABLE DATA; Schema: yipyap; Owner: postgres
--

COPY yipyap.groups (id, groupname, name, description, image, created_at, updated_at, deleted_at) FROM stdin;
1	group1	First Group	Here is the first group	groups/group1.jpg	2024-10-21 00:40:35.475916	2024-10-21 00:40:35.475916	\N
\.


--
-- TOC entry 4840 (class 0 OID 25261)
-- Dependencies: 223
-- Data for Name: message_readby; Type: TABLE DATA; Schema: yipyap; Owner: postgres
--

COPY yipyap.message_readby (id, message_id, user_id, "timestamp") FROM stdin;
\.


--
-- TOC entry 4833 (class 0 OID 25182)
-- Dependencies: 216
-- Data for Name: messages; Type: TABLE DATA; Schema: yipyap; Owner: postgres
--

COPY yipyap.messages (id, "from", "to", to_group, message, attachments, created_at, updated_at, deleted_at) FROM stdin;
1	1	2	f	Hello there!	\N	2024-10-21 00:11:56.079102	2024-10-21 00:11:56.079102	\N
2	1	1	t	Hello all!	\N	2024-10-21 00:42:53.823503	2024-10-21 00:42:53.823503	\N
3	3	1	f	I am new the 3rd!	\N	2024-10-21 01:27:02.886983	2024-10-21 01:27:02.886983	\N
4	1	2	f	I am using YipYap today...	\N	2024-10-21 01:27:50.582297	2024-10-21 01:27:50.582297	\N
5	2	1	f	Great news	\N	2024-10-21 01:30:43.95363	2024-10-21 01:30:43.95363	\N
\.


--
-- TOC entry 4832 (class 0 OID 25179)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: yipyap; Owner: postgres
--

COPY yipyap.users (id, username, password, name, description, image, is_online, last_seen, created_at, updated_at, deleted_at) FROM stdin;
1	user1	user1	First User	I am using YipYap!	users/user1.png	f	2024-10-21 00:06:34.357236	2024-10-21 00:06:34.357236	2024-10-21 00:06:34.357236	\N
2	user2	user2	Second User	I am also using YipYap!	users/user1.png	f	2024-10-21 00:08:25.891884	2024-10-21 00:08:25.891884	2024-10-21 00:08:25.891884	\N
3	user3	user3	Third User	I am new to YipYap!	users/user1.png	f	2024-10-21 01:26:21.537423	2024-10-21 01:26:21.537423	2024-10-21 01:26:21.537423	\N
\.


--
-- TOC entry 4853 (class 0 OID 0)
-- Dependencies: 222
-- Name: group_members_id_seq; Type: SEQUENCE SET; Schema: yipyap; Owner: postgres
--

SELECT pg_catalog.setval('yipyap.group_members_id_seq', 2, true);


--
-- TOC entry 4854 (class 0 OID 0)
-- Dependencies: 220
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: yipyap; Owner: postgres
--

SELECT pg_catalog.setval('yipyap.groups_id_seq', 1, true);


--
-- TOC entry 4855 (class 0 OID 0)
-- Dependencies: 224
-- Name: message_readby_id_seq; Type: SEQUENCE SET; Schema: yipyap; Owner: postgres
--

SELECT pg_catalog.setval('yipyap.message_readby_id_seq', 1, false);


--
-- TOC entry 4856 (class 0 OID 0)
-- Dependencies: 219
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: yipyap; Owner: postgres
--

SELECT pg_catalog.setval('yipyap.messages_id_seq', 5, true);


--
-- TOC entry 4857 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: yipyap; Owner: postgres
--

SELECT pg_catalog.setval('yipyap.users_id_seq', 3, true);


--
-- TOC entry 4682 (class 2606 OID 25248)
-- Name: group_members group_members_pk; Type: CONSTRAINT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.group_members
    ADD CONSTRAINT group_members_pk PRIMARY KEY (id);


--
-- TOC entry 4678 (class 2606 OID 25232)
-- Name: groups groups_pk; Type: CONSTRAINT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.groups
    ADD CONSTRAINT groups_pk PRIMARY KEY (id);


--
-- TOC entry 4680 (class 2606 OID 25236)
-- Name: groups groups_un; Type: CONSTRAINT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.groups
    ADD CONSTRAINT groups_un UNIQUE (groupname);


--
-- TOC entry 4684 (class 2606 OID 25270)
-- Name: message_readby message_readby_pk; Type: CONSTRAINT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.message_readby
    ADD CONSTRAINT message_readby_pk PRIMARY KEY (id);


--
-- TOC entry 4676 (class 2606 OID 25209)
-- Name: messages messages_pk; Type: CONSTRAINT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.messages
    ADD CONSTRAINT messages_pk PRIMARY KEY (id);


--
-- TOC entry 4672 (class 2606 OID 25194)
-- Name: users users_pk; Type: CONSTRAINT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- TOC entry 4674 (class 2606 OID 25198)
-- Name: users users_un; Type: CONSTRAINT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.users
    ADD CONSTRAINT users_un UNIQUE (username);


--
-- TOC entry 4685 (class 2606 OID 25254)
-- Name: group_members group_members_fk; Type: FK CONSTRAINT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.group_members
    ADD CONSTRAINT group_members_fk FOREIGN KEY (user_id) REFERENCES yipyap.users(id);


--
-- TOC entry 4686 (class 2606 OID 25249)
-- Name: group_members group_members_groupid_fk; Type: FK CONSTRAINT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.group_members
    ADD CONSTRAINT group_members_groupid_fk FOREIGN KEY (group_id) REFERENCES yipyap.groups(id);


--
-- TOC entry 4687 (class 2606 OID 25276)
-- Name: message_readby message_readby_fk; Type: FK CONSTRAINT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.message_readby
    ADD CONSTRAINT message_readby_fk FOREIGN KEY (user_id) REFERENCES yipyap.users(id);


--
-- TOC entry 4688 (class 2606 OID 25271)
-- Name: message_readby message_readby_messageid_fk; Type: FK CONSTRAINT; Schema: yipyap; Owner: postgres
--

ALTER TABLE ONLY yipyap.message_readby
    ADD CONSTRAINT message_readby_messageid_fk FOREIGN KEY (message_id) REFERENCES yipyap.messages(id);


-- Completed on 2024-10-24 01:04:00

--
-- PostgreSQL database dump complete
--

