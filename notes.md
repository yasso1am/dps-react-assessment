Start: Friday 6/22 @ 19:00 PST
Stop: Friday 6/22 @ 23:00 PST (I had a six hour drive earlier, I'm tired)

Start: Saturday 6/23 @ 6:50 PST - Let's go
Break: Saturday 6/23 @ 10:25 PST - Got a few things working, taking a break
Back: Saturday 6/23 @ 11:30 PST - Lunch was good, back at it
Break: Saturday 6/23 @ 14:50 PST - FORNITE 
    It's really tough to figure out exactly how the server wants things. I check the BREWERYDB API documentation
    and see that the paths are one thing. I do my axios call to that, forgetting that I'm actually axios calling my own controllers, which at times had a slightly different path! The controllers then have helper methods on them that come from
    brewery db gem which performs specific actions on them.
    Like for getting a single brewery, I had to do a 'LINK TO=beer.name', although the path it is actually going to is the beer.id! However, by going to beer.name in my link to, it would send through the beer name as the params. That way when I 
    did my axios call to props.match.params, it was actually going to the controller with the name, then using the 
    brewery db gm to convert that over into the id? I clearly need some explaination here.
Back: Saturday 6/23 @ 17:55 PST - that was a long break, but I won fortnite twice and went grocery shopping a     and walked the dog
Break: Saturday 6/23 @ 20:10 PST - I had to pull my
    logic out of my reducers because it wouldn't seem to work with "if/else" in the function. My recollection is that reducers/
    pure functions can only have one outcome/must be immutable, so even though I was just passing in parameters and outputing
    according to those params, there were two possible outcomes. I'm guessing that's why it wouldn't work?
Back: Saturday 6/23 @ 20:30 PST - wife and I made salmon and potatoes with lemon, garlic and butter. Super          delish
Stop: Saturday 6/23 @ 21:30 PST - enough is enough. Some thing have been cleared up, others have been mudied.

Start: Sunday 6/24 @ 17:30 MST - I lost an hour and drove six hours, time to start! 

