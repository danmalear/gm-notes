# GM Map Notes

This app provides game masters a quick and easy way to navigate any prep notes associated with specific areas on a dungeon map, by offering a customizable, clickable, collapsible interface.

## Technologies

UI layer: React, TypeScript
Server layer: Node, Express, TypeScript
Data layer: Knex, SQLite

## Future improvements

- Currently only one map available through hard-coding. Move this data back to the database and allow for expanding data library
- Allow for multiple ongoing campaigns to be saved and loaded
- Expand current state from active map and time of day to any of:
  - Party size, PC status
  - Monster/NPC status
  - Items added/removed
  - Campaign-specific notes
- Other forms of note-keeping, such as sequence-based or quest-based notes
