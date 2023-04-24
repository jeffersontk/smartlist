import { FlatList, ScrollView, Text, View } from "native-base";
import { TouchableOpacity } from "react-native";

export function MyTabBar({ state, descriptors, navigation, position }: any) {
  const renderItemContent = ({ label, isFocused }: any) => (
    <View
      bg={isFocused ? "#219653" : "#6FCF97"}
      paddingY={2}
      paddingX={5}
      rounded="full"
      alignItems="center"
      justifyContent="center"
      mr={4}
      minW={100}
    >
      <Text color="white">{label}</Text>
    </View>
  );
  const renderItem = ({ item, index, state, descriptors, navigation }: any) => {
    const { options } = descriptors[item.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : item.name;

    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: item.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        navigation.navigate({ name: item.name, merge: true });
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: item.key,
      });
    };

    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {renderItemContent({ label, isFocused })}
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      horizontal
      data={state.routes}
      keyExtractor={(item: any) => item.key}
      contentContainerStyle={{
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: "#f2f2f2",
      }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) =>
        renderItem({ item, index, state, descriptors, navigation })
      }
      maxH={50}
      initialNumToRender={4}
      maxToRenderPerBatch={2}
      mb="2"
      mt="2"
    />
  );
}
