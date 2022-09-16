# Mis-Matched Adventures

Mis-Matched Adventures is an experimental journey in creating a browser game prototype. This project is intended for the fulfillment of the academic requirements of the Software Engineering Immersive programme from General Assembly.

## Description

Mis-Matched Adventures is a browser Role-Playing Game where you take control of a pizza chef that was transported into a foreign world by unknown means. Run around the stylised world fighting slimes and dragons in an attempt to get stronger and find a way back home.

This project is based on Javascript and uses a Class-based approach to the writing of its codes. All components are housed within their own classes with respective CSS files for styling, if any.

The live version of the game is accessible from [this link](https://andrewtaiye.github.io/dev).

## List of Features

Displayed below is a list of features implemented in the project.

1. **Map Drawing**

   Map drawing is managed by the HTML `<canvas>` element. Context is set to `2d` for the rendering of the map. As the map is based on the pixel art form, a 16 x 16 tileset is used. The tileset is put together in photoshop first, then included as an asset for canvas to render.

   A gameloop is used to continuously update and re-render the map with every frame. Each loop starts by clearing the entire canvas. All game objects are then updated and the lower map, game objects and upper map are then rendered in sequence. This sequence allows for elements of the map to overlap with the game objects (e.g. in the event where a character is moving behind some trees or behind buildings).

2. Game Objects
   - Object Animations
3. Map Navigation
   - Collision Detection
   - Camera Movement
4. Key Bindings
5. NPC Behaviours and Interactions
   - Typewriter Effect
6. Cutscenes and Activation Methods
7. Battle Mechanics
   - Battle UI
   - Battle Menus
   - Turn Cycle
   - Combatants
   - Attacks and Damage Formulas
   - Items
   - Statuses
   - Experience Points Distribution and Tables
   - Persistent Character State
8. Character Stats and Growth
9. Monster Respawn Timer
10. Village Healers
11. Title Screen

## Potential Future Implementations

- Pause Menu
- Overworld UI
- Saving Game State

## Issues Faced

- Launching an Event within an Event
- Infinite Loop of Properties
