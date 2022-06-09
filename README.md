# Tapio exercise - 2 days CRUD App in React

Try it on https://robinlej.github.io/tapio-posts/.

## Core app

- CRUD blog-like app:

  - Create new articles
  - Read stored articles
  - Updated existing ones
  - Delete them

- Local storage:

  - Since it's using JSONPlaceholder to fake data, the DB is not actually updated. So after the 1st call to the API (which takes 10 articles), the posts are stored in local storage. Fake calls are still made to the API when updating/deleting/creating, to make it work like a normal app would.

## Features 

- Responsive (mobile-first) 
- Dark mode
- Accessibility:
  - Contrast at least AA
  - ARIA implemented (aria-label on icon buttons, roles on modal and alert, focus trapped inside the modal & `ESC` key)
  - Semantic HTML
