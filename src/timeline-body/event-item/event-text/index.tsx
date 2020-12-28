import { pathOr } from "ramda";
import React from "react";
import { Animated, Easing, TextStyle, View } from "react-native";

interface Props {
  style: TextStyle;
  text: string;
  horizontal?: boolean;
}

class EventText extends React.Component<Props> {
  animatedValue = new Animated.Value(0);

  animation = Animated.timing(this.animatedValue, {
    toValue: 1,
    duration: 300,
    easing: Easing.linear,
  });

  prevPosition = pathOr(0, ["style", this.props.horizontal ? "left" : "top"], this.props);

  UNSAFE_componentWillReceiveProps() {
    this.prevPosition = pathOr(0, ["style", this.props.horizontal ? "left" : "top"], this.props);
  }

  getText = (text: string): string => {
    if (this.props.horizontal) {
      return text;
    }
    const characters = [...text];
    return characters.map(character => `${character}\n`).join("");
  };

  render() {
    const { style, text, horizontal } = this.props;
    const newPosition = pathOr(0, ["style", horizontal ? "left" : "top"], this.props);
    let position: number | Animated.AnimatedInterpolation = newPosition;
    if (this.prevPosition !== newPosition) {
      position = this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [this.prevPosition, newPosition],
      });
      this.animatedValue.setValue(0);
      this.animation.start();
    }
    return (
      <View>
        <Animated.Text
          style={{
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
            flex: 1,
            ...(horizontal && { marginLeft: 5 }),
            textAlign: horizontal ? "left" : "center",
            ...style,
            [horizontal ? "left" : "top"]: position,
          }}
        >
          {this.getText(text)}
        </Animated.Text>
      </View>
    );
  }
}

export default EventText;
