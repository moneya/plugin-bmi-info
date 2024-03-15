const { httpFetch } = Host.getFunctions();

function convertHeightToMeters(height, unit) {
  if (unit === "cm") {
    return height / 100; // Convert cm to meters
  } else if (unit === "m") {
    return height; // Height is already in meters
  } else {
    throw new Error("Invalid height unit. Use 'cm' or 'm'.");
  }
}

function convertWeightToKilograms(weight, unit) {
  if (unit === "kg") {
    return weight; // Weight is already in kilograms
  } else if (unit === "lbs") {
    return weight / 2.20462; // Convert pounds to kilograms
  } else {
    throw new Error("Invalid weight unit. Use 'kg' or 'lbs'.");
  }
}

function validateUnits(heightUnit, weightUnit) {
  const validHeightUnits = ["cm", "m"];
  const validWeightUnits = ["kg", "lbs"];

  if (!validHeightUnits.includes(heightUnit)) {
    throw new Error("Invalid height unit. Use 'cm' or 'm'.");
  }

  if (!validWeightUnits.includes(weightUnit)) {
    throw new Error("Invalid weight unit. Use 'kg' or 'lbs'.");
  }
}

function validateNumeric(value, fieldName) {
  if (isNaN(value)) {
    throw new Error(`${fieldName} must be a numeric value.`);
  }
}


function validateNumericInteger(value, fieldName) {
  if (!Number.isInteger(value)) {
    throw new Error(`${fieldName} must be a whole number.`);
  }
}

function validateGender(gender) {
  const allowedGenders = ["male", "female", "other"];
  if (!allowedGenders.includes(gender.toLowerCase())) {
    throw new Error("Invalid gender. Allowed values are 'male', 'female', or 'other'.");
  }
}

function calculateBMI(age, height, heightUnit, weight, weightUnit, gender) {
  // Check if all parameters are provided
  if (!age || !height || !heightUnit || !weight || !weightUnit || !gender) {
    throw new Error("Age, height, height unit, weight, weight unit, and gender are all required.");
  }

  // Validate height and weight units
  validateUnits(heightUnit, weightUnit);

  // Validate height and weight are numeric
  validateNumeric(height, "Height");
  validateNumeric(weight, "Weight");

  //validate age
  validateNumericInteger(age, "Age");

  //validate gender
  validateGender(gender, "Gender");

  // Convert height to meters
  const heightInMeters = convertHeightToMeters(height, heightUnit);

  // Convert weight to kilograms
  const weightInKilograms = convertWeightToKilograms(weight, weightUnit);

  // Calculate BMI
  const bmi = weightInKilograms / (heightInMeters * heightInMeters);

  // Define BMI categories and corresponding advice
  let category;
  let advice;

  if (bmi < 18.5) {
    category = "Underweight";
    advice = "You may need to gain weight. Consider consulting a healthcare professional.";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
    advice = "Congratulations! Your weight is considered normal.";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
    advice = "You may need to lose weight. Consider exercising regularly and eating a balanced diet.";
  } else {
    category = "Obese";
    advice = "You are at risk of various health problems. Consider consulting a healthcare professional and adopting a healthier lifestyle.";
  }

  // Construct the result object
  const result = {
    bmi: bmi.toFixed(2),
    category: category,
    advice: advice
  };

  return result;
}

function run() {
  try {
    // Get input JSON string from the host
    const input = Host.inputString();

    // Parse the JSON string into an object
    const inputData = JSON.parse(input);

    // Extract age, height, weight, height unit, weight unit, and gender from the input object
    const { age, height, heightUnit, weight, weightUnit, gender } = inputData;

    // Call the calculateBMI function with the extracted data
    const result = calculateBMI(age, height, heightUnit, weight, weightUnit, gender);

    // Output the result
    Host.outputString(JSON.stringify(result));
  } catch (error) {
    // Handle errors
    Host.outputString(error.message);
  }
}

module.exports = { run };