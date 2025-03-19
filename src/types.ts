export type ArgumentKeys<Keys, U = unknown> = Keys extends U[] ? Keys[number] : Keys
