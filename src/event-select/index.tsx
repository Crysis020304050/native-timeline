import React from "react";
import ModalSelector from "react-native-modal-selector";
import { ID, SelectProps } from "../index";

interface Props extends SelectProps {
  items: Array<{ key: ID; label: string }>;
  onChange: (value: ID) => void;
}

const EventSelect: React.FC<Props> = ({ items, onChange, ...props }) => (
  <ModalSelector
    initValue="Select event to scroll"
    initValueTextStyle={{ color: "black", alignSelf: "flex-start" }}
    overlayStyle={{ justifyContent: "flex-end", padding: 10 }}
    cancelText="Close"
    {...props}
    data={items}
    onChange={({ key }) => onChange(key)}
  />
);

export default EventSelect;
