import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const items = [
  {id: '1', name: "One"},
  {id: '2', name: "Two"},
  {id: '3', name: "Three"},
  {id: '4', name: "Four"},
  {id: '5', name: "Five"},
  {id: '6', name: "Six"},
  {id: '7', name: "One"},
  {id: '8', name: "Two"},
  {id: '9', name: "Three"},
  {id: '10', name: "Four"},
  {id: '11', name: "Five"},
  {id: '12', name: "Six"},
  {id: '13', name: "One"},
  {id: '14', name: "Two"},
  {id: '15', name: "Three"},
  {id: '16', name: "Four"},
  {id: '17', name: "Five"},
  {id: '18', name: "Six"},

];

class DisplayPlaceReviews extends Component {

  state = {
    selectedItems: []
  };


  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    console.log('onSelectedItemsChange selectedItems: ', selectedItems);
    //console.log('Selected Items: ');
  };

  showSelectedItems = (selectedItems) => {
    if (this.multiSelect) {
      return(
        <View>
          {this.multiSelect.getSelectedItemsExt(selectedItems)}
        </View>
      );
    }
  }

  saveInterests = (selectedItems) => {
    console.log('Save selectedItems: ', selectedItems);
  }

  render() {
    const { selectedItems } = this.state;
    //console.log('render this.state: ', this.state);
    //console.log('render selectedItems: ', selectedItems);


    return (
      <View style={{ flex: 1 }}>
        < MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            ref={ (component) => {
              this.multiSelect = component;
              //console.log('ref this.multiSelect', this.multiSelect );
            }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={ (text)=> console.log(text)}
            //altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Select"
            hideSubmitButton
        />

        {this.showSelectedItems(selectedItems)}

        <View>
          <Button title="Save"
            onPress={this.saveInterests(selectedItems)}
          />
        </View>
      </View>
    );//end of return
  }//end of render
} //end of class DisplayPlaceReviews

export default DisplayPlaceReviews;
