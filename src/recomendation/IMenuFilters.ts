export interface MenuFilters {
  spiciness?: 'Mild' | 'Medium' | 'Spicy' | 'Non-spicy';
  cuisine?:
    | 'Italian'
    | 'Mexican'
    | 'Asian'
    | 'Mediterranean'
    | 'American'
    | 'Brazilian';
  dietaryPreferences?: (
    | 'Vegetarian'
    | 'Vegan'
    | 'Gluten-free'
    | 'Dairy-free'
  )[];
  calorieRange?: 'Low-calorie' | 'Moderate-calorie' | 'High-calorie';
  allergies?: ('Nut-free' | 'Shellfish-free' | 'Soy-free' | 'Egg-free')[];
  specialDiets?: ('Keto-friendly' | 'Paleo-friendly')[];
  preparationTime?: 'Quick' | 'Moderate-time' | 'Slow';
  occasions?: 'Casual' | 'Formal' | 'Celebratory';
  textures?: 'Crispy' | 'Creamy' | 'Tender' | 'Juicy';
  freshness?: 'Fresh' | 'Light' | 'Comforting';
  cravings?: 'Sweet' | 'Savory' | 'Spicy' | 'Umami';
}
