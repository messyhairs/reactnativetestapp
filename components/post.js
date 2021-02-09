import React, { useState, useEffect, Component } from 'react';
import Axios from 'axios';
import { Input } from 'react-native-elements';
import { AppRegistry, Platform, TouchableOpacity, StyleSheet, ToastAndroid, TextInput, View, Alert, Button, Text } from 'react-native';
// import { useHistory } from "react-router-dom";
import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage'
// import { ActivityIndicator } from 'react-native';
// import { Image } from 'react-native-elements';
// import * as FilePickerManager from 'react-native-file-picker';
// import DocumentPicker from 'react-native-document-picker';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            bio: '',
            imagePath: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    // pickfile() {
    //     FilePickerManager.showFilePicker(null, (response) => {
    //         console.log('Response = ', response);

    //         if (response.didCancel) {
    //           console.log('User cancelled file picker');
    //         }
    //         else if (response.error) {
    //           console.log('FilePickerManager Error: ', response.error);
    //         }
    //         else {
    //           this.setState({
    //             file: response
    //           });
    //         }
    //       });
    // }
    // pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });
    //     if (!result.cancelled) {
    //         console.log(result)
    //         const img = result.uri;
    //         console.log(img)
    //     }
    // };
    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('imagePath', this.state.imagePath);
        formData.append('username', this.state.username);
        formData.append('bio', this.state.bio);

        if (Platform.OS === 'web') {
            const gettoken = localStorage.getItem('tokenid');
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + gettoken,
                    'Accept': 'application/json',
                },

            };
            const lanipurl = 'http://192.168.1.4:8000/api/uploadprofile';
            Axios.post(lanipurl, formData, config)
                .then((response) => {
                    if (response.message === 'done') {
                        ToastAndroid.show(response.toast, ToastAndroid.SHORT);
                    }
                    if (response.message === 'repeat') {
                        ToastAndroid.show(response.toast, ToastAndroid.SHORT);
                    }
                    if (response.message === 'error') {
                        ToastAndroid.show(response.toast, ToastAndroid.SHORT);
                    }
                }).catch((error) => {
                    console.log(error);
                });
        }
        if (Platform.OS === 'android') {
            const gettoken = AsyncStorage.getItem('tokenid');
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + gettoken,
                    'Accept': 'application/json',
                },

            };
            const lanipurl = 'http://192.168.1.4:8000/api/uploadprofile';
            Axios.post(lanipurl, formData, config)
                .then((response) => {
                    if (response.message === 'done') {
                        ToastAndroid.show(response.toast, ToastAndroid.SHORT);
                    }
                    if (response.message === 'repeat') {
                        ToastAndroid.show(response.toast, ToastAndroid.SHORT);
                    }
                    if (response.message === 'error') {
                        ToastAndroid.show(response.toast, ToastAndroid.SHORT);
                    }
                }).catch((error) => {
                    console.log(error);
                });
        }



        // const lanipurl = 'http://192.168.1.4:8000/api/uploadprofile';
        // const { username } = this.state;
        // const { bio } = this.state;
        // fetch(lanipurl, formData,{
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'content-type': 'multipart/form-data',
        //         'Authorization': 'Bearer ' + gettoken,


        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         bio: bio
        //     })

        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log(responseJson)
        //     }).catch((error) => {
        //         console.error(error);
        //     });

    }
    onChange(e) {
        this.setState({ imagePath: e.target.files[0] });
        console.log(e.target.files[0])
        var image = document.getElementById('output');
        // image.src = URL.createObjectURL(event.target.files[0]);
    }
    
    render() {

        return (

            <View style={styles.MainContainer}>
                <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>Profile </Text>
                <input type="file" name="imagePath" onChange={this.onChange} />
                {/* <Button title="Pick an image from camera roll" onPress={this.pickfile} /> */}
                <TextInput style={styles.textfield}
                    placeholder="Enter User username"
                    onChangeText={username => this.setState({ username })}
                    underlineColorAndroid='transparent'
                />
                <TextInput
                    placeholder="Enter User Bio"
                    onChangeText={bio => this.setState({ bio })}
                    underlineColorAndroid='transparent'
                    style={styles.password_style}
                />
                {/* <p><img id="output" width="200" /></p> */}
                <Button title="Submit" onPress={this.onFormSubmit} />
                {/* </Form> */}
            </View>

        );
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "200",
    },
    textfield: {
        height: 40, marginTop: 15, borderColor: 'gray', borderWidth: 1, width: 250, textAlign: 'center', borderRadius: 5
    },
    password_style: {
        height: 40, borderRadius: 5, marginBottom: 25, marginTop: 25, borderColor: 'gray', borderWidth: 1, width: 250, textAlign: 'center'
    },
    button: {
        flexDirection: 'row',
        height: 40,
        width: 180,
        backgroundColor: '#00a98f',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        borderRadius: 5
    },
    btntext: {
        color: 'white',
        fontSize: 20
    }
});

export default Post;