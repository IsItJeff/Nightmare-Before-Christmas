import React, {useState} from "react";
import {Text, View, Pressable} from "react-native";
import {CheckBox} from "react-native-elements";
import Collapsible from "react-native-collapsible";
import {styles} from "./Filter.style";
import {selectAllEvents} from "../../utils/utils";
import {updateCheckBox, resetSelection, applyFilter} from "./utils/FilterUtils";

const Filter = ({setEvents, categoryIsChecked, setCategoryIsChecked}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed
              ? "rgba(50, 59, 118, 0.5)"
              : "rgba(50, 59, 118, 1)",
          },
          styles.filterButton,
        ]}
        onPress={() => {
          isCollapsed === true ? setIsCollapsed(false) : setIsCollapsed(true);
        }}
      >
        <Text style={styles.buttonTitle}>Filter</Text>
      </Pressable>
      <Collapsible collapsed={isCollapsed}>
        <Text style={styles.title}>Select Categories:</Text>
        <View style={styles.checkBoxContainer}>
          {Object.keys(categoryIsChecked).map((activity) => {
            return (
              <CheckBox
                key={activity}
                title={activity}
                containerStyle={styles.checkBox}
                textStyle={styles.checkBoxText}
                checked={categoryIsChecked[activity]}
                onPress={() => {
                  updateCheckBox(activity, setCategoryIsChecked);
                }}
              ></CheckBox>
            );
          })}
        </View>
        <View style={styles.lowerButtonContainer}>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed
                  ? "rgba(108, 93, 171, 0.5)"
                  : "rgba(108, 93, 171, 1)",
              },
              styles.lowerButtonClear,
            ]}
            onPress={() => {
              resetSelection(setCategoryIsChecked);
            }}
          >
            <Text style={styles.buttonTitle}>Clear Selection</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed
                  ? "rgba(50, 59, 118, 0.5)"
                  : "rgba(50, 59, 118, 1)",
              },
              styles.lowerButtonApply,
            ]}
            onPress={() => {
              applyFilter(categoryIsChecked, selectAllEvents, setEvents);
            }}
          >
            <Text style={styles.buttonTitle}>Apply Filters</Text>
          </Pressable>
        </View>
      </Collapsible>
    </View>
  );
};

export default Filter;
