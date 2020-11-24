const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

/**
 * This function sums the weights provided and returns the name of the animal with the highest weight
 * @param {Array} responseArr - Array of objects containing animal weights for each question
 * @returns {Object} - { animal: 'red panda' }
 */
function gradeQuiz(responseArr) {
  const finalScores = responseArr.reduce(
    (acc, response) => {
      for (const animal in response) {
        acc[animal] += response[animal];
      }
      return acc;
    },
    {
      addax: 0,
      panda: 0,
      baboon: 0,
      bear: 0,
      bat: 0,
    }
  );

  let animalName = "";
  let maxScore = -1;
  for (const animal in finalScores) {
    if (finalScores[animal] > maxScore) {
      animalName = animal;
      maxScore = finalScores[animal];
    }
  }

  return { animal: animalName };
}

app.use(cors());

app.use(express.json());

app.post("/quiz", function (req, res, next) {
  // post the chosen weights for each question, e.g.
  /**
   {
     "responses": [
        { addax: 2, panda: 3, baboon: 1, bear: 5, bat: 4 },
        { addax: 5, panda: 5, baboon: 4, bear: 1, bat: 0 },
        { addax: 1, panda: 0, baboon: 4, bear: 0, bat: 5 }
        { addax: 4, panda: 5, baboon: 0, bear: 0, bat: 3 }
     ]
   }
   */
  try {
    const result = gradeQuiz(req.body.responses);
    res.json(result);
  } catch (error) {
    return next(error);
  }
});

app.use(function (req, res) {
  res.status(404).json({ error: "404 page not found" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: "500 internal server error" });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
