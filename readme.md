# Cat Clicker Premium v1.1
![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg?longCache=true&style=flat-square)

![Presentation screenshot](https://github.com/AlexandruVoica/cat-clicker-premium/blob/master/screenshot.JPG)

### Description
This project began as a result of my taking of the course for JavaScript Design Patterns from Udacity (UD-989). The final project was to build a very basic app called Cat Clicker which undergoes a few requirements changes ([requirements.txt](https://github.com/AlexandruVoica/cat-clicker-premium/blob/master/requirements.txt)). I have also added a few twists to the initial requirements of the course project:
  - The list of cats is presented as a collection of photos (vs. a list of names).
  - Each cat's name is randomly generated.
  - Each cat's photo is a random image fetched via an API.
  - The photos are interactive (resting, hovered and clicked state).
  - The entire app has an overarching design.

### Tools
The entire app is written in HTML, CSS and JS. I also used SASS for my CSS, because I wanted to learn to integrate it in my workflow.

### Scope and process
The objective of this project was to progressively iterate over the design solution for a volatile set of requirements. Ultimately, I *progressed* from an unintuitive approach that resulted in some serious 'spaghetti code' to strictly abiding to using a simplified **MVC design pattern coupled with the Observable pattern (for intra-component communication) plus leveraging the benefits of a Message Broker (for inter-component communication)**, which untangled the logic/code and transformed it into encapsulated components and behaviors. This might seem over-engineered at first glance, but I made the decision of using this approach in order to preempt further requirement changes.

The cat photo API I used is:
  - Cat as service API
    ```
    https://cataas.com/#/
    ```

### Conclusion
Working on this project has helped me to have a deeper understanding of how to implement a design pattern or how to refactor code to adjust to the design pattern. It has also improved my working knowledge of CSS pre-processors (specifically SASS).

### Contact
For any kind of enquiries or questions, you may contact me at alexandru.voica16@gmail.com