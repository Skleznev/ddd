CREATE TABLE algorithms
(
  id          BIGSERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  name        TEXT NOT NULL
);

CREATE TABLE determinants
(
  id         BIGSERIAL PRIMARY KEY,
  algorithm  BIGINT REFERENCES algorithms (id)
    ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  dimensions JSON                       NOT NULL,
  expression JSON                       NOT NULL,
  processors INT                        NOT NULL,
  ticks      INT                        NOT NULL
);
