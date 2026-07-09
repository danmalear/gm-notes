# GM Notes App

This app provides game masters a quick and easy way to navigate any prep notes associated with specific areas on a dungeon map, by offering a customizable, clickable, collapsible interface.

# To run

1. Ensure [Node.js][Node] is installed
1. Ensure pnpm is installed (`npm i -g pnpm`)
1. Ensure [Vite][Vite] is installed
1. In a terminal in the frontend and backend directories execute `pnpm i`
1. In VS Code, press F5, or run the 'Debug app in Chrome' launcher

## Technologies

UI layer: React, TypeScript

Server layer: Node, Express, TypeScript

Data layer: Prisma, Postgres

## Future improvements

- Currently only one map available through hard-coding. Move this data back to the database and allow for expanding data library (in progress)
- Allow for multiple ongoing campaigns to be saved and loaded (in progress)
- Expand current state from active map and time of day to any of:
  - Party size, PC status
  - Monster/NPC status
  - Items added/removed
  - Campaign-specific notes
- Other forms of note-keeping, such as sequence-based or quest-based notes

[Vite]: https://vite.dev/guide/
[Node]: https://nodejs.org/en/download
