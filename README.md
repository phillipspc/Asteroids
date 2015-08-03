# Palette-Asteroids
Palette-Asteroids is my version of the classic game, built using JavaScript and Canvas. The controls are similar to the original; you can move the ship by rotating its direction and thrusting forward. To make things more fun, the color palette changes to a new configuration with each new level (10 options in total). The parallax stars in the background create a subtle 3-dimensional effect.

## Design
The ship, bullets, asteroids, and stars all inherit from a MovingObject parent class, which has attributes for position, velocity, and radius.

Some (relatively) advanced math was needed for:

- Calculating distance between objects (collision detection)
- Generating random vectors of fixed magnitude (asteroids)
- Normalizing vectors to find direction
- Rotating and drawing the ship

I also used [keymaster.js](https://github.com/madrobby/keymaster) for keyboard inputs and some JQuery for updating game info below the canvas window.

## Game Mechanics
Each new level increases difficulty by:

- generating more asteroids
- increasing asteroid movement speed
- decreasing 'safe zone' around ship at start

You start with 3 lives and more lives can be gained with enough points. This amount doubles each time, however you also gain more points at higher levels.

### Contact
Email [phillipspc@gmail.com](mailto:phillipspc@gmail.com) with any questions or feedback on this project.
