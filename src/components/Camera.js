import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { Text, View, TouchableOpacity, Image } from 'react-native';


class CustomCamera extends Component {
    render() {
        console.log('photo from props ====>', this.props.photo)
        const { hasCameraPermission } = this.props;
        if (hasCameraPermission === null) {
            return <View />;
        }
        else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        else {
            return (
                this.props.photo ? <>
                    <View style={{ flex: 1 }} >

                        <Image
                            source={{ uri: this.props.photo }}
                            style={{ flex: 0.9 }}
                        />
                        <View
                            style={{
                                flex: 0.1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity style={{
                                flex: 1,
                                alignSelf: 'flex-start',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                                onPress={() => this.props.backToCamera()}
                            >
                                <Text style={{ fontSize: 18, color: 'grey', zIndex: 20000 }} >Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flex: 1,
                                alignSelf: 'flex-start',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                                onPress={() => this.props.savePic()}
                            >
                                <Text style={{ fontSize: 18, color: 'grey', zIndex: 20000 }} >Save To List</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </>
                    : <View style={{ flex: 1 }}>
                        <Camera
                            ref={ref => this.camera = ref}
                            style={{ flex: 1 }}
                            type={this.props.type}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                }}>
                                <TouchableOpacity style={{
                                    flex: 0.2,
                                    alignSelf: 'flex-start',
                                    alignItems: 'center',
                                    marginTop: 20
                                }}
                                    onPress={() => this.props.backToHome()}
                                >
                                    <Text style={{ fontSize: 18, color: 'white' }} >Back</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    backgroundColor: 'transparent',
                                    flex: 1,
                                    flexDirection: 'row',
                                }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => this.props.capture(this.camera)}>
                                    <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/foodies-battle.appspot.com/o/profilePics%2Ficons8-camera.png?alt=media&token=ebb0a533-ed77-48db-ba98-c09b89087bd0' }} />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flex: 0.1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 0.2,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => this.props.flipCamera()}>
                                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                                </TouchableOpacity>
                            </View>

                        </Camera>
                    </View>
            );

        }
    }
}


export default CustomCamera;