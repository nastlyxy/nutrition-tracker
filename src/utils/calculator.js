export function calculateBMR(weight, age, height, gender) {
  if (gender === "female") {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
}

export function calculateTDEE(bmr, activityLevel) {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
  };

  return Math.round(bmr * (multipliers[activityLevel] || 1.2));
}

export function calculateMacros(weight, tdee) {
    const protein = Math.round(weight * 1.8);
    const fats = Math.round(weight * 1);
    const carbs = Math.round((tdee - (protein*4)-(fats*9))/4);
  return {
    protein: protein,
    fats: fats,
    carbs: carbs,
  };
}
