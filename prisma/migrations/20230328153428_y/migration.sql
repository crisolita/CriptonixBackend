-- AlterTable
CREATE SEQUENCE nftsdead_id_seq;
ALTER TABLE "nftsdead" ALTER COLUMN "id" SET DEFAULT nextval('nftsdead_id_seq');
ALTER SEQUENCE nftsdead_id_seq OWNED BY "nftsdead"."id";
