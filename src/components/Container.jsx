import React, { Component } from "react";
import PropTypes from 'prop-types';
import HexInput from "./HexInput";
import Header from './Header';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hexColor: props.hexColor,
      rgbColor: this.convert(props.hexColor)
    };
  }

  convert(hex) {
    let rgbColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!rgbColor) {
      return null;
    }

    rgbColor.shift();
    return rgbColor ? `rgb(${rgbColor.map(i => parseInt(i, 16)).join(", ")})` : null;
  }

  checkColor(hexColor) {
    return /^#?([\da-f]{6})$/i.test(hexColor);
  }

  fixColor(hexColor) {
    return hexColor[0] === "#" ? hexColor.slice(0, 7) : `#${hexColor.slice(0, 6)}`;
  }

  changeColor(hexColor) {
    if (hexColor.length !== 7) {
      this.setState(prevState => ({
        hexColor,
        error: prevState.error,
        rgbColor: prevState.rgbColor
      }));
    } else if (this.checkColor(hexColor)) {
      hexColor = this.fixColor(hexColor);
      this.setState({
        hexColor,
        error: false,
        rgbColor: this.convert(hexColor)
      });
    } else {
      this.setState({
        error: true,
        hexColor: this.fixColor(hexColor),
        rgbColor: "Ошибка!"
      });
    }
  }

  render() {
    const props = {};

    if (this.state.error) {
      props.className = "error";
    } else {
      props.style = {
        backgroundColor: this.state.rgbColor
      };
    }

    return (
      <figure {...props}>
        <Header />
        <HexInput value={this.state.hexColor} onChange={this.changeColor.bind(this)} />
        <div className="rgb-color">{this.state.rgbColor}</div>
      </figure>
    );
  }
}

Container.propTypes = {
  hexColor: PropTypes.string.isRequired,
};