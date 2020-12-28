declare module "@emotion/native" {
  import { CreateStyled, CreateStyledComponentExtrinsic } from "@emotion/styled-base";
  import React from "react";
  import ReactNative from "react-native";

  type StyledReactNativeComponents =
    | "ActivityIndicator"
    | "ART"
    | "Button"
    | "DatePickerIOS"
    | "DrawerLayoutAndroid"
    | "Image"
    | "ImageBackground"
    | "ImageEditor"
    | "ImageStore"
    | "KeyboardAvoidingView"
    | "ListView"
    | "Modal"
    | "NavigatorIOS"
    | "Picker"
    | "PickerIOS"
    | "ProgressBarAndroid"
    | "ProgressViewIOS"
    | "ScrollView"
    | "SegmentedControlIOS"
    | "Slider"
    | "SnapshotViewIOS"
    | "Switch"
    | "RecyclerViewBackedScrollView"
    | "RefreshControl"
    | "SafeAreaView"
    | "StatusBar"
    | "SwipeableListView"
    | "SwitchIOS"
    | "TabBarIOS"
    | "Text"
    | "TextInput"
    | "ToolbarAndroid"
    | "TouchableHighlight"
    | "TouchableNativeFeedback"
    | "TouchableOpacity"
    | "TouchableWithoutFeedback"
    | "View"
    | "ViewPagerAndroid"
    | "FlatList"
    | "SectionList";

  type StyledComponentsForReactNative<T extends keyof typeof ReactNative, ExtraProps, Theme> = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [K in T]: CreateStyledComponentExtrinsic<typeof ReactNative[K], ExtraProps, Theme>;
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  export interface Styled<Theme extends object = any, ExtraProps = {}>
    extends CreateStyled<Theme>,
      StyledComponentsForReactNative<StyledReactNativeComponents, ExtraProps, Theme> {}

  const styled: Styled;
  export default styled;
}
