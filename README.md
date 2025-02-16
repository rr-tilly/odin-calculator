# Odin Calculator

A simple web-based calculator built with HTML, CSS and Javascript.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, and division.
- Floating point support with a decimal point restriction.
- Handles multiple consecutive operations correctly.
- Clears display and stored data with a clear "C" button.
- Pressing backspace to remove the last input.
- Prevents division by zero with an error message.
- Rounds long decimal results to fit an 8-digit display.
- Supports keyboard input.
- Implements percentage and +/- (negation) functions.
- Uses scientific notation for large or small numbers that exceed 8 significant digits.

## Notes

- Calculator only evaluates a single pair of numbers at a time.
- Only one decimal point is allowed per number.
- Snarky error messages appear when dividing by zero.
- Consecutive operator presses replaces the last operator instead of performing unwanted calculations.

## Extra Features

- Clickable button animations for better user experience.
- Large or small results are displayed in scientific notation.
- `%` converts the current number into a percentage(divides by 100).
- `+/-` toggles the sign of the current number.

---

This project was built for The Odin Project’s curriculum.
