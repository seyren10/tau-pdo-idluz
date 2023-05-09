const Excel = require("exceljs");
const path = require("path");
const { Building } = require("../models/building");

module.exports.index = async (req, res) => {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(
    path.join(__dirname, "../", "public", "reports", "report_template.xlsx")
  );
  const worksheet = workbook.getWorksheet("Sheet1");

  let row = 10;

  const { typology: filteredTypology, classification: filteredClassification } =
    req.query;
  const regexTypology = new RegExp(filteredTypology, "i");
  const regexClassification = new RegExp(filteredClassification, "i");

  const buildings = await Building.find({
    typologies: { $in: regexTypology },
    classification: regexClassification,
  });

  buildings.forEach((building) => {
    worksheet.getCell(`A${row}`).value = building.classification;
    worksheet.getCell(`B${row}`).value = building.name;
    worksheet.getCell(`C${row}`).value = building.description;
    worksheet.getCell(`D${row}`).value = building.floorCount;
    worksheet.getCell(`E${row}`).value = building.footprintArea;
    worksheet.getCell(`F${row}`).value = building.floorArea;
    worksheet.getCell(`G${row}`).value = building.roomCount;
    const typologies = building.typologies.join("/");
    worksheet.getCell(`H${row}`).value = typologies;
    worksheet.getCell(`I${row}`).value = building.capacity;
    worksheet.getCell(`J${row}`).value = building.userCount;
    worksheet.getCell(`K${row}`).value = building.assetValue;

    if (building.sensitivity) {
      const { material } = building.sensitivity;

      worksheet.getCell(`L${row}`).value = material.mainStructural;
      worksheet.getCell(`M${row}`).value = material.exteriorWalls;
      worksheet.getCell(`N${row}`).value = material.roofFraming;
      worksheet.getCell(`O${row}`).value = material.roofCoverage;
    }

    if (building.sensitivity) {
      const { maintenance } = building.sensitivity;
      worksheet.getCell(`P${row}`).value = maintenance.age;
      worksheet.getCell(`Q${row}`).value = maintenance.retrofitYear;
      worksheet.getCell(`R${row}`).value = maintenance.retrofitDescription;
    }

    row++;
  });

  await workbook.xlsx.writeFile(
    path.join(__dirname, "../", "public", "reports", "generated", "report.xlsx")
  );
  const showAlert = {
    message:
      "Filtered Report Generated. You may now download the .xlsx file on the bottom left of the screen",
  };
  res.render("reports", {
    filteredClassification,
    filteredTypology,
    showAlert,
  });
};

module.exports.download = (req, res) => {
  const filePath = path.join(
    __dirname,
    "../",
    "public",
    "reports",
    "generated",
    "report.xlsx"
  );

  const fileName = `generated_report_${Date.now()}.xlsx`;
  res.download(filePath, fileName, (err) => {
    if (err) throw new Error("Failed to send report file.", err);
  });
};

module.exports.downloadMasterPlan = (req, res) => {
  res.download(
    path.join(
      __dirname,
      "../",
      "public",
      "images",
      "TAU_campus_master_development_plan.jpg"
    ),
    "TAU_campus_master_development_plan.jpg",
    (err) => {
      if (err) throw new Error("Failed to send report file.", err);
    }
  );
};
