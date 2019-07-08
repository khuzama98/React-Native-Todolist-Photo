import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, View, FlatList, Image, ToastAndroid } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import CameraView from './src/components/Camera'

export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isCamera: false,
    photo: null,
    list: []
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  flipCamera = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  }

  backToHome = () => {
    this.setState({ isCamera: false })
  }

  backToCamera = () => {
    this.setState({ photo: null })
  }

  savePic = () => {
    const { photo, list } = this.state;
    list.push(photo)
    this.setState({ list, photo: null })
  }

  capture = async (camera) => {
    const photo = await camera.takePictureAsync();
    console.log('photo *********', photo);
    this.setState({ photo: photo.uri })
  }

  deletePic = (index) => {
    const {list} = this.state;
    list.splice(index,1)
    this.setState({list})
    ToastAndroid.show('Photo Removed From List !', ToastAndroid.SHORT);
  }

  render() {
    console.log(this.state.hasCameraPermission)
    return (
      <>
        {
          this.state.isCamera ? <CameraView
            type={this.state.type}
            flipCamera={this.flipCamera}
            hasCameraPermission={this.state.hasCameraPermission}
            backToHome={this.backToHome}
            capture={this.capture}
            photo={this.state.photo}
            backToCamera={this.backToCamera}
            savePic={this.savePic}
          />
            : <View style={styles.container}>
              <View style={{ flex: 0.1, backgroundColor:'#3e9fef'}} >
                <Text style={{ fontSize: 14,paddingTop:30 , paddingLeft:30 , color: 'white', fontWeight: '500'}} >TODO LIST</Text>
              </View>
              {!!this.state.list.length ?
                <FlatList scrollEnabled={true} style={{ flex: 0.8, flexDirection: 'column'}} data={this.state.list} 
                renderItem={(item, index) => {
                  console.log('item ===>', item)
                  return (
                    <View style={{ padding: 10 }} >
                      <TouchableOpacity style={{ flex: 1 }} onLongPress={() => this.deletePic(index)} >
                      <Image style={{ height: 300, width: '100%' }} source={{ uri: item.item }} />
                      </TouchableOpacity>
                    </View>
                  )
                }}
                  keyExtractor={(item, index) => index.toString()}
                /> : <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center', }} >
                  <Text style={{ fontSize: 20, fontWeight: '500' }} >Create Your TodoList With Photos!</Text>
                </View>}
              <View style={{
                flex: 0.1, alignItems: 'center',
                justifyContent: 'center',
              }} >
                <Button onPress={() => { this.setState({ isCamera: true }) }} title='Start Clicking!' />
              </View>
            </View>
        }

        {/* <View style={styles.buttonContainer} > */}
        {/* </View> */}
      </>
    );
  }

}

// AppRegistry.registerComponent('todolist-pic', () => App);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
