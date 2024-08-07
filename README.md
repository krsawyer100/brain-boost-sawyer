# Brain Boost Study Application
**Application Link:** https://brain-boost-sawyer-6ebf05ed6f61.herokuapp.com/

## Project Description
The Brain Boost Study Application is a website to help enhance a users study efficiency with study sets and flashcards. This project was initially create as a school coding assignment where I had to develop a useful application with the follow parameters: use node, express, handlebars, MySql or MongoDB, follow the MVC architectural pattern, link two data types together, and perform CRUD operations with data.

## Features
1. Create study sets and flashcards
2. Edit study set and flashcards
3. View all study sets (just title and description) and navigate to requested set
4. View individual study sets with flashcards
5. Delete study sets
6. Create an account, login, or logout

## Demo
Here is a demo of my project (I am logged in for the demo):

[![Brain Boost Demo](https://img.youtube.com/vi/b8T-hT923EE/0.jpg)](https://www.youtube.com/watch?v=b8T-hT923EE)

## Tech Stack
### Languages:
1. HTML (in the form of handlebars)
2. CSS
3. Javascript
4. Sql

### NPM Packages:
1. bcrypt
2. dotenv
3. express
4. express-handlebars
5. express-session
6. express-mysql-session
7. method-override
8. mysql2

### External APIs:
1. Random Useless Facts Api (https://uselessfacts.jsph.pl/)

## Future Project Implementations
1. When creating or editing a study set, allow to user to delete a flashcard in that menu (currently no implement for deleting a single flashcard)
2. When viewing a single set, change the flashcards to appear with just a term one at a time than can be flipped to view the answer and cycled through (like a carousel)
3. Implement an external api that would allow me to add language translation in the creation process for individuals using it for language learning (This was planned for the inital project but I could not find one that was free)
4. Implement an external api that would allow me to add text-to-speech for the flashcards when a user is viewing a set (This was plan B for the inital project but again, I could not find one that was free)
5. I want to go back through the application and make it more accessible to all users (screen readers, color blindness, neurodivergent)
6. Review code to see where I can simplify it once I am further into my programming education
7. Add in more verification through the application (i.e. confirming users want to delete a set before completing the action)
7. Lastly, I would likely change up my css to make the website look more modern (if needed)