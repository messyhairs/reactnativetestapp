import React, { Component } from 'react';
import Axios from 'axios';
import { Input } from 'react-native-elements';
import { AppRegistry, Image, TouchableOpacity, FlatList, StyleSheet, ToastAndroid, TextInput, View, Alert, Button, Text } from 'react-native';
// import './auth.css'
import Profile from './profile';
import { useHistory } from "react-router-dom";
// import Toast from 'react-native-tiny-toast'
import * as Notifications from 'expo-notifications';

class Auth extends Component {
    // fetch('https://reactnative.dev/movies.json')
    // .then((response) => response.json())
    // .then((json) => {
    //     console.log(json)
    //   return json.movies;
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            data: [],
        }
    }


   
    HomeScreen() {
        return (
            <View>
                <Text>This is the home screen of the app</Text>
            </View>
        );
    }
    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    
    UserRegistrationFunction = () => {
        const lanipurl = 'http://192.168.1.4:8000/api/createaccount';
        const originalurl = 'http://localhost:8000/api/createaccount';
        const dummie_url = 'https://reqres.in/api/users'
        const { email } = this.state;
        const { password } = this.state;
        if (!this.validateEmail(this.state.email)) {
            // alert('enter a validemail');
            ToastAndroid.show('Enter a Valid email', ToastAndroid.SHORT);
        }
        else {
            fetch(lanipurl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })

            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // Alert.alert(responseJson);
                    console.log(responseJson)
                    if (responseJson.message === 'success') {
                        // const { navigate } = this.props.navigation;
                        // navigate('Profile', { user: 'John' });
                        // Notifier.showNotification({
                        //     title: 'John Doe',
                        //     description: 'Hello! Can you help me with notifications?',
                        //     duration: 0,
                        //     showAnimationDuration: 800,
                        //     showEasing: Easing.bounce,
                        //     onHidden: () => console.log('Hidden'),
                        //     onPress: () => console.log('Press'),
                        //     hideOnPress: false,
                        // });
                        // Toast.showSuccess('Pay success')
                        ToastAndroid.show(responseJson.toast, ToastAndroid.SHORT);
                    }
                    if (responseJson.message === 'already') {
                        ToastAndroid.show(responseJson.toast, ToastAndroid.SHORT);
                    }
                    if (responseJson.message === 'internal error') {
                        ToastAndroid.show(responseJson.toast, ToastAndroid.SHORT);
                    }
                }).catch((error) => {
                    console.error(error);
                });
        }

    };
    gotologin = () => {
        const { navigate } = this.props.navigation;
        navigate('Profile');
    }
    componentDidMount = () => {

    }
  
    render() {
        const { data, isLoading } = this.state;
        // const geturl = 'http://192.168.1.4:8000/api/profiles';
        // fetch(geturl)
        //     .then((response) => response.json())
        //     .then((json) => {
        //         // console.log(json);
        //         this.setState({ data: json.profiledetails });
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        return (

            <View style={styles.MainContainer} id="regform">
                <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>Create account</Text>
                <TextInput style={styles.textfield}
                    placeholder="Enter User Email"
                    onChangeText={email => this.setState({ email })}
                    underlineColorAndroid='transparent'
                />
                <TextInput
                    placeholder="Enter User Password"
                    onChangeText={password => this.setState({ password })}
                    underlineColorAndroid='transparent'
                    style={styles.password_style}
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={this.UserRegistrationFunction} activeOpacity={0.95} style={styles.button}>
                    <Text style={styles.btntext}>Submit</Text>
                </TouchableOpacity>
                <Text>(OR)</Text>
                <TouchableOpacity onPress={this.gotologin} activeOpacity={0.95} style={styles.button}>
                    <Text style={styles.btntext}>Login</Text>
                </TouchableOpacity>
                {/* <Button title="submit" onPress={this.UserRegistrationFunction} color="#2196F3" /> */}
                {/* <FlatList
                    data={data}
                    keyExtractor={({ _id }) => _id}
                    renderItem={({ item }) => (
                        <Text>{item.username}, {item.useremail}</Text>
                        //     <Image
                        //     source={{uri: item.imagePath}}
                        //   />
                    )}
                /> */}
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

export default Auth;