import { useState } from "react";
import { FlatList, Modal, TouchableWithoutFeedback } from "react-native";
import { Select, View } from "tamagui";

export default function DropdownSplitSelection(props: { initWorkoutSelection: Function, selectedSplit: string, setSelectedSplit: Function, splits: { name: string, numberOfWorkouts: number }[] }) {
    const [showList, setShowList] = useState(false);

    const renderItem = (index: number, item: { name: string }) => {
        return (
            <Select.Item
                index={index}
                value={item.name}>
                <Select.ItemText>{item.name}</Select.ItemText>
            </Select.Item>
        );
    }

    const renderSeperator = () => {
        return <View height={1} borderBottomWidth={2} borderBottomColor="$color5"></View>
    }

    return (
        <View marginTop={5} alignSelf="center" width={200} maxHeight={400}>
            <Select value={props.selectedSplit} onValueChange={(value) => { props.setSelectedSplit(value); props.initWorkoutSelection(value); }} open={showList} onOpenChange={setShowList}>
                <Select.Trigger justifyContent="center">
                    <Select.Value placeholder="<Wähle einen Split>" />
                </Select.Trigger>

                <Select.Content>
                    <Modal visible={showList} transparent={true}>
                        <TouchableWithoutFeedback onPress={() => setShowList(false)}>
                            <View backgroundColor="rgba(0, 0, 0, 0.3)" flex={1}>
                                <TouchableWithoutFeedback>
                                    <View backgroundColor="$color8" marginTop={260} marginRight={100} marginLeft={100} borderRadius={9}>
                                        {showList ? <FlatList
                                            ItemSeparatorComponent={renderSeperator}
                                            data={props.splits}
                                            nestedScrollEnabled={true}
                                            renderItem={({ index, item }) => renderItem(index, item)}
                                            style={{
                                                // alignSelf: 'center',
                                                // maxWidth: 200,
                                                borderRadius: 9,
                                                // marginTop: 200,
                                                // maxHeight: 400
                                            }}></FlatList> : <></>}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </Select.Content>
            </Select>
        </View>
    );
}