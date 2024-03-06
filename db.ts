import { toSafeMode, newDB, DBInstance } from 'better-sqlite3-schema'

export const dbFile = 'dev.sqlite3'

export const db: DBInstance = newDB({
  path: dbFile,
  migrate: false,
})

toSafeMode(db)
