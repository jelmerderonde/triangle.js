"use strict";

var Triangle = React.createClass({
  displayName: "Triangle",
  getInitialState: function getInitialState() {
    var topPoint = new aw.Graph.Point(Number(100), Number(0));
    var leftPoint = new aw.Graph.Point(Number(0), Number(173.205));
    var rightPoint = new aw.Graph.Point(Number(200), Number(173.205));
    var triangle = new aw.Graph.Polygon([topPoint, leftPoint, rightPoint]);
    var output = this.outputValues(100, 100);
    return {
      position: {
        left: 100,
        top: 100
      },
      output: {
        x: output.x,
        y: output.y
      },
      triangle: triangle,
      polygonFill: "#E74924",
      checkbox: false
    };
  },
  handleDrag: function handleDrag(e, _ref) {
    var x = _ref.x;
    var y = _ref.y;

    this.becomeActive();
    var constrained = this.calculateConstrained(x, y);
    var output = this.outputValues(constrained.x, constrained.y);
    this.writeToForm(output.x, output.y);
    this.setState({
      position: {
        left: constrained.x,
        top: constrained.y
      },
      output: {
        x: output.x,
        y: output.y
      }
    });
  },
  calculateConstrained: function calculateConstrained(x, y) {
    var constrained = this.state.triangle.constrain(new aw.Graph.Point(x, y));
    return { x: constrained.x, y: constrained.y };
  },
  calculateValues: function calculateValues(x, y) {
    var valueX = x / 200;
    var valueY = (173.205 - y) / 173.205;
    return { x: valueX, y: valueY };
  },
  toFixed: function toFixed(value, precision) {
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? "-" : "") + String(Math.floor(absValue / power));

    if (precision > 0) {
      var fraction = String(absValue % power),
          padding = new Array(Math.max(precision - fraction.length, 0) + 1).join("0");
      result += "." + padding + fraction;
    }
    return result;
  },
  outputValues: function outputValues(x, y) {
    var outValues = this.calculateValues(x, y);
    return { x: this.toFixed(outValues.x, 3), y: this.toFixed(outValues.y, 3) };
  },
  writeToForm: function writeToForm(x, y) {
    $('input#answer{SGQ}SQ001').val(x);
    $('input#answer{SGQ}SQ002').val(y);
  },
  handleCheckbox: function handleCheckbox(event) {
    this.setState({
      checkbox: event.target.checked
    });
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (prevState.checkbox != this.state.checkbox) {
      if (this.state.checkbox) {
        // Checkbox is checked
        this.becomeInactive();
      } else {
        this.becomeActive();
      }
    }
  },
  becomeInactive: function becomeInactive() {
    this.setState({
      output: { x: "-1", y: "-1" },
      position: { left: 100, top: 100 },
      polygonFill: "#95a5a6"
    });
    this.writeToForm("-1", "-1");
  },
  becomeActive: function becomeActive() {
    // Reset initial output values
    var output = this.outputValues(100, 100);
    this.setState({
      checkbox: false,
      polygonFill: "#E74924",
      output: { x: output.x, y: output.y }
    });
    this.writeToForm("-1", "-1");
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "triangle-map" },
      React.createElement(
        "div",
        { className: "triad-label top-label" },
        this.props.topLabel
      ),
      React.createElement(
        "div",
        { className: "triad-label left-label" },
        this.props.leftLabel
      ),
      React.createElement(
        "div",
        { className: "triad-label right-label" },
        this.props.rightLabel
      ),
      React.createElement(
        "span",
        { className: "na-check" },
        React.createElement("input", {
          type: "checkbox",
          onClick: this.handleCheckbox,
          checked: this.state.checkbox
        }),
        "n.v.t."
      ),
      React.createElement(
        "div",
        { className: "map" },
        React.createElement(
          "svg",
          { height: "100%", width: "100%" },
          React.createElement("polygon", {
            points: "100,0 0,173.205 200,173.205",
            fill: this.state.polygonFill
          })
        ),
        React.createElement(
          ReactDraggable.DraggableCore,
          { onDrag: this.handleDrag },
          React.createElement("div", { className: "selector", style: this.state.position })
        )
      )
    );
  }
});