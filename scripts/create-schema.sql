-- Create enum for KeyResult types
CREATE TYPE "KeyResultType" AS ENUM ('standard', 'leading', 'lagging', 'win_condition');

-- Create users table
CREATE TABLE "users" (
    "id" UUID PRIMARY KEY,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create people table
CREATE TABLE "people" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "initials" VARCHAR(10) NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX "people_user_id_idx" ON "people"("user_id");
CREATE INDEX "people_name_idx" ON "people"("name");

-- Create objectives table
CREATE TABLE "objectives" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "category" VARCHAR(100),
    "description" TEXT,
    "initiatives" TEXT[],
    "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX "objectives_user_id_idx" ON "objectives"("user_id");
CREATE INDEX "objectives_category_idx" ON "objectives"("category");
CREATE INDEX "objectives_created_at_idx" ON "objectives"("created_at");

-- Create key_results table
CREATE TABLE "key_results" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "type" "KeyResultType" NOT NULL,
    "current" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "target" DOUBLE PRECISION NOT NULL,
    "unit" VARCHAR(50) NOT NULL,
    "objective_id" UUID NOT NULL REFERENCES "objectives"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX "key_results_objective_id_idx" ON "key_results"("objective_id");
CREATE INDEX "key_results_type_idx" ON "key_results"("type");

-- Create win_logs table
CREATE TABLE "win_logs" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "note" TEXT NOT NULL,
    "date" TIMESTAMP NOT NULL DEFAULT NOW(),
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "objective_id" UUID REFERENCES "objectives"("id") ON DELETE CASCADE,
    "key_result_id" UUID REFERENCES "key_results"("id") ON DELETE CASCADE
);

CREATE INDEX "win_logs_objective_id_idx" ON "win_logs"("objective_id");
CREATE INDEX "win_logs_key_result_id_idx" ON "win_logs"("key_result_id");
CREATE INDEX "win_logs_date_idx" ON "win_logs"("date");

-- Create win_attributions junction table
CREATE TABLE "win_attributions" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "win_log_id" UUID NOT NULL REFERENCES "win_logs"("id") ON DELETE CASCADE,
    "person_id" UUID NOT NULL REFERENCES "people"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE("win_log_id", "person_id")
);

CREATE INDEX "win_attributions_win_log_id_idx" ON "win_attributions"("win_log_id");
CREATE INDEX "win_attributions_person_id_idx" ON "win_attributions"("person_id");
