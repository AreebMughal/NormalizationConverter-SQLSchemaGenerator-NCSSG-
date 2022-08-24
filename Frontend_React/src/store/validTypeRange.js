export const validRange = {
  SMALLINT: [0, 255],
  INT: [0, 255],
  BIGINT: [0, 255],
  VARCHAR: [0, 255],
  TEXT: [0, 255],
  DATE: [0, 255],
  DECIMAL: { before: [0, 65], after: [0, 30] },
  CHAR: [0, 255],
  FLOAT: { before: [0, 255], after: [0, 30] },
  DOUBLE: { before: [0, 255], after: [0, 30] },
  DATETIME: [0, 255],
  TIMESTAMP: [0, 255],
  BOOLEAN: [0, 1],
  TIME: [0, 255],
  YEAR: [0, 255],

  // 'BOOLEAN': ,
  // 'SERIAL': ,
  // 'DATE': ,
  // 'DATETIME': ,
  // 'TIMESTAMP': ,
  // 'TIME': ,
  // 'YEAR': ,
  // 'CHAR': ,
  // 'VARCHAR': ,
  // 'TINYTEXT': ,
  // 'TEXT': ,
  // 'MEDIUMTEXT': ,
  // 'LONGTEXT': ,
  // 'BINARY': ,
  // 'VARBINARY': ,
  // 'TINYBLOB': ,
  // 'BLOB': ,
  // 'MEDIUMBLOB': ,
  // 'LONGBLOB': ,
  // 'ENUM': ,
  // 'SET': ,
  // 'GEOMETRY': ,
  // 'POINT': ,
  // 'LINESTRING': ,
  // 'POLYGON': ,
  // 'MULTIPOINT': ,
  // 'MULTILINESTRING': ,
  // 'MULTIPOLYGON': ,
  // 'GEOMETRYCOLLECTION': ,
  // 'JSON': ,
};
