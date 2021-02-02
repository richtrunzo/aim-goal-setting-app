set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"userName" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "dailygoals" (
	"goalId" serial NOT NULL,
	"userId" serial NOT NULL,
	"goalName" VARCHAR(255) NOT NULL,
	"goalCount" integer NOT NULL,
	"image" VARCHAR(255) NOT NULL,
	CONSTRAINT "dailygoals_pk" PRIMARY KEY ("goalId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "dailynotes" (
	"noteId" serial NOT NULL,
	"goalId" serial NOT NULL,
	"note" VARCHAR(255) NOT NULL,
	CONSTRAINT "dailynotes_pk" PRIMARY KEY ("noteId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "completedgoals" (
	"goalId" integer NOT NULL,
	"timeCompleted" TIMESTAMP NOT NULL,
	CONSTRAINT "completedgoals_pk" PRIMARY KEY ("goalId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "category" (
	"categoryId" serial NOT NULL,
	"goalId" serial NOT NULL,
	"categoryName" VARCHAR(255) NOT NULL,
	CONSTRAINT "Category_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "dailygoals" ADD CONSTRAINT "dailygoals_fk0" FOREIGN KEY ("goalId") REFERENCES "dailynotes"("goalId");
ALTER TABLE "dailygoals" ADD CONSTRAINT "dailygoals_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "dailynotes" ADD CONSTRAINT "dailynotes_fk0" FOREIGN KEY ("goalId") REFERENCES "dailygoals"("goalId");

ALTER TABLE "completedgoals" ADD CONSTRAINT "completedgoals_fk0" FOREIGN KEY ("goalId") REFERENCES "dailygoals"("goalId");

ALTER TABLE "category" ADD CONSTRAINT "category_fk0" FOREIGN KEY ("goalId") REFERENCES "dailygoals"("goalId");



create schema "public";
