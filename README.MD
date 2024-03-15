# BMI Calculator Plugin

## Introduction
The BMI Calculator plugin calculates the Body Mass Index (BMI) based on the provided age, height, weight, height unit, weight unit, and gender. It utilizes standard BMI calculations to determine the BMI category and provides corresponding advice based on the calculated BMI.

## Components

1. **`calculateBMI(age, height, heightUnit, weight, weightUnit, gender)` Function:**
   - Calculates the BMI based on the provided parameters.
   - Validates input parameters such as age, height, weight, height unit, and weight unit.
   - Converts height to meters and weight to kilograms as necessary.
   - Determines the BMI category and provides advice based on the calculated BMI.

2. **`run()` Function:**
   - Retrieves input JSON string from the host.
   - Parses the JSON string into an object.
   - Extracts age, height, weight, height unit, weight unit, and gender from the input object.
   - Calls the `calculateBMI` function with the extracted data.
   - Outputs the calculated BMI result as a JSON string.

## Usage
To use the BMI Calculator plugin, follow these steps:
1. Ensure the plugin is correctly integrated into the hosting environment.
2. Provide input data in JSON format containing age, height, weight, height unit, weight unit, and gender.
3. Call the `run` function.
4. Receive the calculated BMI result as output.

## Example Input:
```json
{
  "age": 25,
  "height": 170,
  "heightUnit": "cm",
  "weight": 70,
  "weightUnit": "kg",
  "gender": "male"
}
```
## Example Output:

```json

{
  "bmi": "24.22",
  "category": "Normal weight",
  "advice": "Congratulations! Your weight is considered normal."
}
```

## Test with cli 
``` json
extism call plugin.wasm run --input '{"age": 30.00, "height": 170, "heightUnit": "cm", "weight": 70, "weightUnit": "kg", "gender": "male"}' --wasi
```

## Dependencies
This plugin depends on the Host object for input and output operations.
No external dependencies are required.
Error Handling
The plugin handles errors such as invalid input parameters or failed calculations gracefully, providing meaningful error messages.
## License
This plugin is released under the MIT License.

## Contribution
Contributions are welcome! Please feel free to submit issues or pull requests.

