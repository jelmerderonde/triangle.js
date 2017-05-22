# Usage
Add the following to the question group HTML:
```html
<link rel="stylesheet" type="text/css" href="https://jelmerderonde.github.io/triangle.js/triangle.css" />
<script src='https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.min.js'></script>
<script src='https://unpkg.com/react-draggable@2.2.4/dist/react-draggable.js'></script>
<script src='https://borgboyone.github.io/Graph/js/Graph.js'></script>
<script src='https://jelmerderonde.github.io/triangle.js/Triangle.js'></script>

<script>
jQuery(document).ready(function($) {
  
  $('.answer-container').map(function() {
    this.style.display='none';
  });
  $('.questionvalidcontainer').map(function() {
    this.style.display='none';
  });
});
</script>
```

And this to the question:
```html
<div id="triangle1"> </div>
<script>
ReactDOM.render(React.createElement(Triangle, { topLabel: "A", leftLabel: "B", rightLabel: "C", sgq: "{SGQ}"}), document.getElementById("triangle1"));
</script>
```