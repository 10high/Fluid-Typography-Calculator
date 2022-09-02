# Fluid Typography Calculator

- [] Assess differences between mobile and desktop designs and list how best to structure HTML to deal with potential problems below:
    - The page header "fluid Typographay" has a line extending from the right that lengths as the screen width enlarges and the header's right margin increases.
    - There is also a line flowing vertically down from the header that lengthens as the screen width enlarges.
        - I will try building these first using margin borders. 
    - The calculator field sections have a vertical line between each that will extend slighter as the screen width enlarges.
- [] Structure HTML (with accessibility in mind)
- [] Apply BEM naming
 

 ##Features for calculator


- [] limit character input to 4
    - [] while also allowing for switching between keyboard and GUI

- [] if first number is 0, removes it from front.

- [] only permitted characters (digits) allowed for input

- [] on ENTER/EQUALS checks if every field has a valid input.
        - [] If not, highlights respective fields with red border

- [] ENTER / EQUALS button execute calculation

- [] Typing numbers animates the Keypad

- [] On calculation sets focus on output for easy copying



## Devlog

- Originally used HTML element Output for the output field because I thought it would be the better choice for accessibility, but because screen space is limited and the the ouput is typically very long, I also used `overflow: hidden` and `text-overflow: ellipsis` but I feel it looks very constricted and I would like to be able to click on the field and for the cursor to be positioned there. So, now I'm going to look for a different approach to displaying the calculated output.





