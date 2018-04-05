import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';

class CreatePlaceReviews extends Component {

  state = {
    rating : 10
  };

  ratingFinished = (rating) => {
    console.log('rating: ', rating);
    this.setState( {rating: 2*rating} );
    console.log('this.state.rating: ', this.state.rating)
  };

  render() {
    console.log('rating render', this.state.rating);
    return (
      <View style={styles.containerView}>

        {/*Rating section*/}
        <View style={styles.horizontalView}>
          <View style={styles.verticalView}>

            <View style={[ styles.cellView, {width: "30%"}]}>
              <Text>Rating: </Text>
            </View>

            <View style={[ styles.cellView, {width: "70%"}]}>
              <Rating
                type="star"
                //showRating
                fractions={1}
                startingValue={this.state.rating/2}
                imageSize={20}
                ratingCount={this.state.rating}
                style={{ borderWidth: 0, borderColor: 'green', height: 10, paddingVertical: 3 }}
                onFinishRating={this.ratingFinished}
                //onFinishRating={(rating) => this.setState({rating})}
              />
            </View>

          </View>
        </View>

        {/*Recommend section*/}
        <View style={styles.horizontalView}>
          <View style={styles.verticalView}>

            <View style={[ styles.cellView, {width: "30%"}]}>
              <Text>Recommend: </Text>
            </View>

            <View style={[ styles.cellView, {width: "70%"}]}>
              <Switch value={true} onValueChange={ (value) => console.log(value)}/>
            </View>

          </View>
        </View>


        {/*Comment section*/}
        <View style={styles.horizontalView}>
          <View style={{borderWidth: 1}}>
            <Text>Suggestions/Comments</Text>
          </View>

          <View style={{borderWidth: 1}}>
            <TextInput
              editable={true}
              keyboardType={"default"}
              multiline={true}
              style={{ borderWidth: 1, height: 60 }}
            />
          </View>

        </View>

        {/*Save section*/}
        <View style={styles.horizontalView}>
          <View style={styles.viewButton}>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.saveButtonPressed} >
              <Text style={styles.buttonText}>Save Review</Text>
            </TouchableOpacity>
          </View>
        </View>


      </View>
    );//end of return
  }//end of render
} //end of class DisplayPlaceReviews


const styles = StyleSheet.create({
  containerView : {
    flexDirection: 'column',
    flex: 1,
    borderWidth: 1,
    borderColor: 'yellow',
    //borderTopWidth: 0,
    marginTop: 0
  },
  horizontalView: {
    flexDirection: 'column',
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    //borderTopWidth: 0,
    marginTop: 0
  },
  verticalView: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: 'green',
    //borderTopWidth: 0,
    marginTop: 3
  },
  cellView: {
    //flex: 1,
    borderWidth: 1,
    borderColor: 'blue',
    marginTop: 0
  },
  viewButton: {
    borderWidth: 1,
    borderColor: "white",
    width: "100%",
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "firebrick",
    marginTop: 1
  },
  buttonStyle: {
    width: "100%",
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic"
  }

});//end of styles

export default CreatePlaceReviews;
