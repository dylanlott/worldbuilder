# worldbuilder
worldbuilder app built with node, express, and mongo. 

##Installing
1. Clone the repository and `cd` into that directory 
2. Run `npm install` 
3. `npm start` and you should be good to go . 

This will install the API and backend. There is currently no front end for this API yet. 

##API Documentation 

### GET '/universe'
Gets all universes that have been created 
TODO: Make this get only universes that belong to the User 

### POST '/universe' 
Creates a universe. 

Takes a body of 
{
  "name": universe.name,
  "owner": universe.owner
}

TODO: Make this auto assign the owner using req.user 

## PUT '/universe/:id' 
Edit a Universe object. This is how you would change the 
{
  "name": universe.name 
}

## DELETE '/universe/:id' 
Delete's the universe with ID of :id 
