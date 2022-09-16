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

   A game loop is used to continuously update and re-render the map with every frame. This game loop resides within the `World` class. Each loop starts by clearing the entire canvas. All game objects are then updated and the lower map, game objects and upper map are then rendered in sequence. This sequence allows for elements of the map to overlap with the game objects (e.g. in the event where a character is moving behind some trees or behind buildings).

   Map data is stored within the `window.OverworldMaps` element and resides within the `OverworldMap` class. The data in the overworld maps object contains configuration information such as the image sources for the lower and upper maps, configuration for game objects, tiles with cutscenes, and a list of walls for collision detection.

2. **Game Objects**

   All objects that can be interacted with are created by the `GameObject` class. NPCs are created by the `Person` class which are an extension of the game object class. The distinction was made such that future expansion would be possible if other categories of objects require interactions. In this case, the `healingWell` is the only inanimate object and thus is also created using the person class for simplicity's sake.

   Note that all data within the `configObjects` object in the overworld maps object are meant as a template and should not be directly altered. Live game objects are created using the `mountObjects()` method what is part of the overworld map class. The `mountObjects()` method takes every key within `configObjects` and creates a new person class using the stored data. Each class is then included, as a value with the object id as its corresponding key, in the `gameObjects` property. This new object of key-value pairs is then used throughout the rest of the project.

   Each game object contains a corresponding `Sprite` class which is used to render the object on the canvas. The sprite class takes in the image source, checks if the object uses a shadow, and renders the objects accordingly. As game objects utilise a 32 x 32 spritesheet, the full `drawImage` constructor is used to determine which frame to draw. Sprites are also offset upwards and to the left to allow proper use of character coordinates within the 16 x 16 tileset (i.e. the 32 x 32 frame would normally take up 4 tiles, but the character is offset to be rendered in the correct 16 x 16 tile). Another modifier is utilised to create the 'centered camera' effect while navigating the map.

   - **Object Animations**

3. **Map Navigation**
   - **Collision Detection**
   - **Camera Movement**
4. **Key Bindings**
5. **NPC Behaviours and Interactions**
   - **Typewriter Effect**
6. **Cutscenes and Activation Methods**
7. **Battle Mechanics**
   - **Battle UI**
   - **Battle Menus**
   - **Turn Cycle**
   - **Combatants**
   - **Attacks and Damage Formulas**
   - **Items**
   - **Statuses**
   - **Experience Points Distribution and Tables**
   - **Persistent Character State**
8. **Character Stats and Growth**
9. **Monster Respawn Timer**
10. **Village Healers**
11. **Title Screen**

## Potential Future Implementations

- **Pause Menu**
- **Overworld UI**
- **Saving Game State**

## Issues Faced

- **Launching an Event within an Event**
- **Infinite Loop of Properties**
