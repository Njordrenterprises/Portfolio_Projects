// 1. Sort the `ranking` and `teams` arrays given the above restrictions
// 2. Assert that the `ranking` is [1, 2, 3, 4] and `teams`
//    is ["green", "yellow", "red", "blue"]:
// 3. Add team "pink" at rank 5
// 4. Assert that the `ranking` is now [1, 2, 3, 4, 5]
//    and `teams` is ["green", "yellow", "red", "blue", "pink"]
// 5. Sort the updated rankings in reverse order because the client called and
//    wants this done:
// 6. Assert that the `ranking` is now [5, 4, 3, 2, 1]
//    and `teams` is now ["pink", "blue", "red", "yellow", "green"]

// Import the assert module for testing
import { strict as assert } from "assert";

// Initial rankings and teams
const ranking = [3, 4, 1, 2];
const teams = ["red", "blue", "green", "yellow"];

// 1. Sort the `ranking` and `teams` arrays given the above restrictions
const fixedRanking = ranking.splice(2, 2);
const newRanking = fixedRanking.concat(ranking);

const fixedTeams = teams.splice(2,2);
const newTeams = fixedTeams.concat(teams)

//2. Assert that the `ranking` is [1, 2, 3, 4] and `teams`
//   is ["green", "yellow", "red", "blue"]:

assert.deepEqual(newRanking, [1, 2, 3, 4]);
assert.deepEqual(newTeams, ["green", "yellow", "red", "blue"]);

//3. Add team "pink" at rank 5
newRanking.push(5);
newTeams.push("pink");

// 4. Assert that the `ranking` is now [1, 2, 3, 4, 5]
//    and `teams` is ["green", "yellow", "red", "blue", "pink"]

assert.deepEqual(newRanking, [1, 2, 3, 4, 5]);
assert.deepEqual(newTeams, ["green", "yellow", "red", "blue", "pink"]);

// 5. Sort the updated rankings in reverse order because the client called and
//    wants this done:

const rankUpdate = newRanking.reverse();
const teamUpdate = newTeams.reverse();

assert.deepEqual(rankUpdate, [5, 4, 3, 2, 1]);
assert.deepEqual(teamUpdate, ["pink", "blue", "red", "yellow", "green"]);


