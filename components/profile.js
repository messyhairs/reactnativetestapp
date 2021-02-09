import React, { Component, useState } from 'react';
import Axios from 'axios';
import { Input } from 'react-native-elements';
import { AppRegistry, Image, Platform, TouchableOpacity, FlatList, StyleSheet, ToastAndroid, TextInput, View, Alert, Button, Text } from 'react-native';
import { useHistory } from "react-router-dom";
import EditPofile from './editprofiles';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { Notifier, Easing } from 'react-native-notifier';
import RNRestart from 'react-native-restart'; // Import package from node modules
import {Restart} from 'fiction-expo-restart';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
            useremail: '',
            data: []
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
        const lanipurl = 'http://192.168.1.4:8000/api/login';
        const originalurl = 'http://localhost:8000/api/login';
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
                    console.log(Platform);
                    console.log(responseJson.userid);
                    localStorage.setItem('userid', responseJson.userid);
                    if (responseJson.message === 'success') {
                        if (Platform.OS === 'web') {
                            localStorage.setItem('tokenid', responseJson.token);
                            const { navigate } = this.props.navigation;
                            navigate('Post', { userdetails: responseJson.userid });
                            // ToastAndroid.show(responseJson.toast, ToastAndroid.SHORT);
                        }
                        if (Platform.OS === 'android') {
                            // alert('android');
                            AsyncStorage.setItem('tokenid', responseJson.token);
                            const { navigate } = this.props.navigation;
                            navigate('Post', { userdetails: responseJson.userid });
                            ToastAndroid.show(responseJson.toast, ToastAndroid.SHORT);
                        }

                        // document.getElementById('regform').style.display = 'none';
                    }
                    if (responseJson.message === 'emailissues') {
                        ToastAndroid.show(responseJson.toast, ToastAndroid.SHORT);
                    }
                    if (responseJson.message === 'crederror') {
                        ToastAndroid.show(responseJson.toast, ToastAndroid.SHORT);
                    }
                }).catch((error) => {
                    console.error(error);
                });
        }

    };
    
    titlechanger() {
        if (Platform.OS === 'web') {
            const gettoken = localStorage.getItem('tokenid');
            const getuserid = localStorage.getItem('userid');

            if (gettoken) {
                const { data, isLoading } = this.state;
                // const geturl = 'http://192.168.1.4:8000/api/profiles';
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + gettoken,
                        'Accept': 'application/json',
                    },

                };
              
                // fetch(geturl).then((response) => response.json()).then((json) => {
                //     const profiles = json.profiledetails;
                //     profiles.forEach(datas => {
                        const profileurl = 'http://192.168.1.4:8000/api/yourprofile/';
                        // Axios.get(`http://192.168.1.4.8000/api/yourprofile/${datas.creator}`)
                        Axios.get(profileurl + getuserid, config)
                            .then(response => {
                                console.log(response)
                                // localStorage.setItem('profileid', datas._id);
                                this.setState({ data: response.data.profile });
                                console.log(response)
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    // })
                // })
                return <View>
                    <Text> Profile Details</Text>
                    <Text>{data.username}</Text>
                    <Text>{data.useremail}</Text>
                    <View style={styles.rndimage}>
                        <Avatar rounded size="xlarge"
                            source={{ uri: data.imagePath }} />
                    </View>
                    <TouchableOpacity onPress={this.logout} activeOpacity={0.95} style={styles.button}>
                                <Text style={styles.btntext}>Logout</Text>
                            </TouchableOpacity>
                    <Collapse>
                        <CollapseHeader>
                            <View>
                                <Text style={styles.edittext}>Edit Profile</Text>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <TextInput style={styles.textfield}
                                onChangeText={useremail => this.setState({ useremail })}
                                underlineColorAndroid='transparent'
                            // value={data.useremail}
                            />
                            <TextInput
                                onChangeText={username => this.setState({ username })}
                                // value={data.username}
                                underlineColorAndroid='transparent'
                                style={styles.password_style}
                            />
                            <TouchableOpacity onPress={this.userprofileupdate} activeOpacity={0.95} style={styles.button}>
                                <Text style={styles.btntext}>Update web</Text>
                            </TouchableOpacity>

                        </CollapseBody>
                    </Collapse>

                </View>

            } else {
                return <View style={styles.MainContainer} id="regform">
                    <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>Login
</Text>
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
                        <Text style={styles.btntext}>submit</Text>
                    </TouchableOpacity>
                </View>
            }
        }
        if (Platform.OS === 'android') {
            const gettoken = AsyncStorage.getItem('tokenid');
            const getuserid = AsyncStorage.getItem('userid');
            console.log(gettoken);
            if (gettoken) {
                alert(Platform.OS);
                const { data, isLoading } = this.state;
                const geturl = 'http://192.168.1.4:8000/api/profiles';
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + gettoken,
                        'Accept': 'application/json',
                    },

                };
                fetch(geturl).then((response) => response.json()).then((json) => {
                    const profiles = json.profiledetails;
                    profiles.forEach(datas => {
                        const profileurl = 'http://192.168.1.4:8000/api/yourprofile/';
                        // Axios.get(`http://192.168.1.4.8000/api/yourprofile/${datas.creator}`)
                        Axios.get(profileurl + datas.creator, config)
                            .then(response => {
                                this.setState({ data: response.data.profile });
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    })
                })
                return <View>
                    <Text> Profile Details</Text>
                    <Text>{data.username}</Text>
                    <Text>{data.useremail}</Text>
                    <View style={styles.rndimage}>
                        <Avatar rounded size="xlarge"
                            source={{ uri: data.imagePath }} />
                    </View>
                    <TouchableOpacity onPress={this.logout} activeOpacity={0.95} style={styles.button}>
                                <Text style={styles.btntext}>Logout</Text>
                            </TouchableOpacity>
                   
                    <Collapse>
                        <CollapseHeader>
                            <View>
                                <Text style={styles.edittext}>Edit Profile</Text>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <TextInput style={styles.textfield}
                                onChangeText={useremail => this.setState({ useremail })}
                                underlineColorAndroid='transparent'
                            // value={data.useremail}
                            />
                            <TextInput
                                onChangeText={username => this.setState({ username })}
                                // value={data.username}
                                underlineColorAndroid='transparent'
                                style={styles.password_style}
                            />
                           <TouchableOpacity onPress={this.userprofileupdate} activeOpacity={0.95} style={styles.button}>
                        <Text style={styles.btntext}>Update</Text>
                    </TouchableOpacity>

                        </CollapseBody>
                    </Collapse>

                </View>

            } 
            
            
            
            else {
                return <View style={styles.MainContainer} id="regform">
                    <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>Login
</Text>
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
                        <Text style={styles.btntext}>submit</Text>
                    </TouchableOpacity>
                </View>
                
            }
        }
    }
    userprofileupdate = () => {
        const getprofileid = localStorage.getItem('profileid');
        const lanipurl = 'http://192.168.1.4:8000/api/profileupdate';
        console.log(lanipurl);
        const getuserid = localStorage.getItem('userid');
        const gettoken = localStorage.getItem('tokenid');
        const { useremail } = this.state;
        const { username } = this.state;
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + gettoken,
                'Accept': 'application/json',
            },

        };
        if (!this.validateEmail(this.state.useremail)) {
            // ToastAndroid.show('Enter a Valid email', ToastAndroid.SHORT);
        }
        else {
            Axios.post(lanipurl + getprofileid, config, useremail, username)
                .then(response => {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    };
    logout() {
        if (Platform.OS === 'android') {
            AsyncStorage.removeItem('tokenid');
            AsyncStorage.removeItem('userid');
            Restart();
        }
        if (Platform.OS === 'web') {
            localStorage.removeItem('tokenid');
            localStorage.removeItem('userid');
            location.reload();
        }
    }
  
    render() {
        return (
            <View>
                {this.titlechanger()}
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
        borderRadius: 5,
        // marginTop: 50
    },
    btntext: {
        color: 'white',
        fontSize: 20
    },
    rndimage: {
        // width: 250,
        // height: 250,
        // borderRadius: 75 / 2,
        // overflow: "hidden",
        // // borderWidth: 3,
        // // borderColor: "red",
        justifyContent: 'center',
    },
    edittext: {
        textAlign: 'center',
        // flexDirection: 'row',
        height: 40,
        width: 180,
        backgroundColor: '#00a98f',
        alignItems: 'center',
        // justifyContent: 'center',
        elevation: 3,
        borderRadius: 5,
        marginTop: 50,
        paddingTop: 12
    }
});

export default Profile;