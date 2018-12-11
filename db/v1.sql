ALTER TABLE algorithms
  ALTER COLUMN id TYPE BIGINT USING id::BIGINT;

ALTER TABLE algorithms
  ALTER COLUMN id DROP DEFAULT;

DROP SEQUENCE algorithms_id_seq;

ALTER TABLE determinants
  ALTER COLUMN id TYPE BIGINT USING id::BIGINT;

ALTER TABLE determinants
  ALTER COLUMN id DROP DEFAULT;

DROP sequence determinants_id_seq;

ALTER TABLE determinants
  ADD iterations INT DEFAULT 0 NOT NULL;

ALTER TABLE determinants
  DROP CONSTRAINT determinants_pkey;

ALTER TABLE determinants
  ADD CONSTRAINT determinants_pkey
    PRIMARY KEY (id, algorithm);

CREATE FUNCTION algorithms_before_insert_or_update_trigger() RETURNS TRIGGER AS
$$
DECLARE
  startId BIGINT = 1;
  row     RECORD;
BEGIN
  IF (NEW.id IS NOT NULL) THEN
    RETURN NEW;
  END IF;
  FOR row IN SELECT id FROM algorithms ORDER BY id ASC
    LOOP
      EXIT WHEN startId < row.id;
      startId = startId + 1;
    END LOOP;
  NEW.id = startId;
  RETURN NEW;
END;
$$
  LANGUAGE plpgsql;

CREATE TRIGGER algorithms_before_insert_or_update_trigger
  BEFORE INSERT OR UPDATE
  ON algorithms
  FOR EACH ROW
EXECUTE PROCEDURE algorithms_before_insert_or_update_trigger();

CREATE FUNCTION determinants_before_insert_or_update_trigger() RETURNS TRIGGER AS
$$
DECLARE
  startId BIGINT = 1;
  row     RECORD;
BEGIN
  IF (NEW.id IS NOT NULL) THEN
    RETURN NEW;
  END IF;
  FOR row IN SELECT id FROM determinants WHERE algorithm = NEW.algorithm ORDER BY id ASC
    LOOP
      EXIT WHEN startId < row.id;
      startId = startId + 1;
    END LOOP;
  NEW.id = startId;
  RETURN NEW;
END;
$$
  LANGUAGE plpgsql;

CREATE TRIGGER determinants_before_insert_or_update_trigger
  BEFORE INSERT OR UPDATE
  ON determinants
  FOR EACH ROW
EXECUTE PROCEDURE determinants_before_insert_or_update_trigger();
