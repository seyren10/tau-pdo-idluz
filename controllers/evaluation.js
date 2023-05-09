const Evaluation = require("../models/evaluation");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req, res) => {
  const defaultDate = new Date().toISOString();
  const { dateFilterFrom, dateFilterTo } = req.query;

  const evaluations = await Evaluation.find({});

  let filteredEvals;

  if (dateFilterFrom || dateFilterTo) {
    const from = dateFilterFrom || dateFilterTo || defaultDate.slice(0, 7);
    const to = dateFilterTo || from;

    filteredEvals = evaluations.filter((eval) => {
      const date = eval.evaluator.visitDate.slice(0, 7);

      if (date >= from && date <= to) return eval;
    });
  } else filteredEvals = evaluations;

  res.render("evaluation", { filteredEvals });
};

module.exports.new = (req, res) => {
  res.render("evaluation/new");
};

module.exports.create = async (req, res) => {
  const { evaluator, evaluate } = req.body;

  const evaluation = new Evaluation({ evaluator, evaluate });

  await evaluation.save();

  req.flash("success", "Feedback successfully submitted. Thank you very much.");
  res.redirect("/");
};

module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluation = await Evaluation.findById(id);

    res.render("evaluation/show", { evaluation });
  } catch (e) {
    throw new ExpressError("Evaluation form doesn't exist.", 404);
  }
};

module.exports.analytics = async (req, res) => {
  const evaluations = await Evaluation.find({});
  const evaluation = {
    avgResponsiveness:
      evaluations.reduce((acc, eval) => {
        return (acc += eval.evaluate.responsiveness);
      }, 0) / evaluations.length,
    avgReliability:
      evaluations.reduce((acc, eval) => {
        return (acc += eval.evaluate.reliability);
      }, 0) / evaluations.length,
    avgCommunication:
      evaluations.reduce((acc, eval) => {
        return (acc += eval.evaluate.communication);
      }, 0) / evaluations.length,
    avgCourtesy:
      evaluations.reduce((acc, eval) => {
        return (acc += eval.evaluate.courtesy);
      }, 0) / evaluations.length,
    avgIntegrity:
      evaluations.reduce((acc, eval) => {
        return (acc += eval.evaluate.integrity);
      }, 0) / evaluations.length,
    avgAccessAndFacilities:
      evaluations.reduce((acc, eval) => {
        return (acc += eval.evaluate.accessAndFacilities);
      }, 0) / evaluations.length,
  };
  res.render("evaluation/analytics", { evaluation });
};
