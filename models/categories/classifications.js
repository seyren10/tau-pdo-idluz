const classifications = [
  "Administrative and Support Services",
  "Auxiliary Buildings and Production Facilities",
  "Academic Buildings",
  "Research, Extension, and Training",
  "Housing Facilities",
  "Sports and Recreational Facilities",
  "Utilities",
  "Other Structures",
  "Road Network",
];
module.exports.classifications = classifications;

module.exports.getMapLabel = (classification) => {
  switch (classification) {
    case "Administrative and Support Services":
      return "A";
    case "Auxiliary Buildings and Production Facilities":
      return "B";
    case "Academic Buildings":
      return "C";
    case "Research, Extension, and Training":
      return "D";
    case "Housing Facilities":
      return "E";
    case "Sports and Recreational Facilities":
      return "F";
    case "Utilities":
      return "G";
    case "Other Structures":
      return "H";
    case "Road Network":
      return "I";
    default:
      return ''
  }
};
