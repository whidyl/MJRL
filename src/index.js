//const ROT = require("rot-js");

import SimpleWalkingInputAndRenderingTest from "./IntegrationTests/1Player1Arena-WalkingInputAndRendering";

const integTest = new SimpleWalkingInputAndRenderingTest();
document.body.appendChild(integTest.display.getContainer());
integTest.draw();
