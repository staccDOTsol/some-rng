// @ts-check
"use strict";
const path = require("path");

const remoteDeployDir = path.join(
  __dirname,
  "target",
  "deploy"
);

const programIds = {
 // metadata: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
 raindrops_matches: "mtchsiT6WoLQ62fwCoiHMCfXJzogtfru4ovY8tXKrjJ",
};

function localDeployPath(dir, programName) {
  return path.join(dir, `${programName}.so`);
}
const programs = {
  raindrops_matches: {
    programId: programIds.raindrops_matches,
    deployPath: localDeployPath(
      path.join(__dirname, "target", "deploy"),
      "raindrops_matches"
    ),
  },
};

const validator = {
  verifyFees: false,
  commitment: "recent",
  programs: [programs.raindrops_matches],
};

module.exports = {
  programs,
  validator,
};
