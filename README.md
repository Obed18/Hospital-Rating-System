# Jaggrey's Fertility & Medical Services — Patient Rating System

A responsive HTML/CSS/JavaScript patient feedback form based on the supplied hospital poster.

## Files

- `index.html` — page structure and Formspree form
- `styles.css` — responsive visual design
- `script.js` — star interactions, validation, and Formspree submission
- `assets/jaggreys-logo.jpg` — extracted from the supplied poster

## Formspree setup

1. Create a form in Formspree.
2. Copy the Form Endpoint.
3. In `index.html`, replace:

`https://formspree.io/f/YOUR_FORM_ID`

with your actual Formspree endpoint.

## Staff names

The supplied poster does not visibly contain individual staff names. The dropdown currently contains placeholder staff names. Replace those options in `index.html` with the hospital's actual staff names.

## Data sent to Formspree

The form submits:

- `staff_member`
- `overall_rating`
- `staff_friendliness_courtesy`
- `staff_professionalism`
- `waiting_time`
- `cleanliness_environment`
- `overall_service`
- `feedback`
- `recommend`
- `form_source`

No backend is required; Formspree receives the form submission.
