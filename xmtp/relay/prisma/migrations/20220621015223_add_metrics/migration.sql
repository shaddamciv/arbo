-- CreateTable
CREATE TABLE "init_events" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address_hash" VARCHAR NOT NULL,

    CONSTRAINT "init_events_pkey" PRIMARY KEY ("id")
);

-- RLS
ALTER TABLE init_events ENABLE ROW LEVEL SECURITY;

create policy "read only"
    on init_events for select
    using ( true );

-- CreateTable
CREATE TABLE "peer_not_initialized_events" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "peer_address" VARCHAR NOT NULL,

    CONSTRAINT "peer_not_initialized_events_pkey" PRIMARY KEY ("id")
);

-- RLS
ALTER TABLE peer_not_initialized_events ENABLE ROW LEVEL SECURITY;

create policy "read only"
    on peer_not_initialized_events for select
    using ( true );

-- CreateTable
CREATE TABLE "message_events" (
    "id_hash" VARCHAR NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from_address_hash" VARCHAR NOT NULL,
    "to_address_hash" VARCHAR NOT NULL,

    CONSTRAINT "message_events_pkey" PRIMARY KEY ("id_hash")
);

-- RLS
ALTER TABLE message_events ENABLE ROW LEVEL SECURITY;

create policy "read only"
    on message_events for select
    using ( true );

-- CreateTable
CREATE TABLE "send_message_events" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from_address_hash" VARCHAR NOT NULL,
    "to_address_hash" VARCHAR NOT NULL,

    CONSTRAINT "send_message_events_pkey" PRIMARY KEY ("id")
);

-- RLS
ALTER TABLE send_message_events ENABLE ROW LEVEL SECURITY;

create policy "read only"
    on send_message_events for select
    using ( true );

-- CreateTable
CREATE TABLE "conversation_events" (
    "address_a_hash" VARCHAR NOT NULL,
    "address_b_hash" VARCHAR NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversation_events_pkey" PRIMARY KEY ("address_a_hash","address_b_hash")
);

-- RLS
ALTER TABLE conversation_events ENABLE ROW LEVEL SECURITY;

create policy "read only"
    on conversation_events for select
    using ( true );

-- CreateTable
CREATE TABLE "create_conversation_events" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from_address_hash" VARCHAR NOT NULL,
    "to_address_hash" VARCHAR NOT NULL,

    CONSTRAINT "create_conversation_events_pkey" PRIMARY KEY ("id")
);

-- RLS
ALTER TABLE create_conversation_events ENABLE ROW LEVEL SECURITY;

create policy "read only"
    on create_conversation_events for select
    using ( true );