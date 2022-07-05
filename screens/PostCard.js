import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";
import CreatePost from './CreatePost'

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      posts_id:this.props.posts.key,
      posts_data : this.props.posts.value
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

   render() {
    let posts = this.state.posts_data
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
       let images = {
        image_1: require("../assets/image_1.jpg"),
        image_2: require("../assets/image_2.jpg"),
        image_3: require("../assets/image_3.jpg"),
        image_4: require("../assets/image_4.jpg"),
        image_5: require("../assets/image_5.jpg"),
        image_6: require("../assets/image_6.jpg"),
        image_7: require("../assets/image_7.jpg")
      };
    
      return(
            <TouchableOpacity
            style={styles.container}
            onPress={() =>
              this.props.navigation.navigate("PostScreen", {
                caption: this.props.post.caption,
                author: this.props.post.author
              })
            }
          >
            <View style={styles.container}>
                <View style={
                        this.state.light_theme
                        ? styles.cardContainerLight
                        : styles.cardContainer
                }>
                    <View style={styles.authorContainer}>
                        <View style={styles.authorImageContainer}>
                            <Image
                                source={require("../assets/profile_img.png")}
                                style={styles.profileImage}
                            ></Image>
                        </View>
                        <View style={styles.authorNameContainer}>
                            <Text style={
                              this.state.light_theme
                              ? styles.authorNameTextLight
                              : styles.authorNameText
                            }>{this.props.post.author}</Text>
                        </View>
                    </View>
                </View>
                <Image source={images[posts.preview_image]} style={styles.postImage} />
 
                <View style={styles.actionContainer}>
                    <View style={styles.likeButton}>
                        <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                        <Text style={
                          this.state.light_theme
                          ? styles.likeText
                          : styles.likeTextLight
                        }>12k</Text>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
      );
    }
    }
}

const styles = StyleSheet.create({
   container: { 
     flex: 1 
    }, 
    cardContainer: { 
      margin: RFValue(13), 
      backgroundColor: "#2a2a2a", 
      borderRadius: RFValue(20),
      padding: RFValue(20) 
    }, 
  cardContainerLight: {
    margin: RFValue(13),

    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
    authorContainer: { 
        flex: 0.1, 
        flexDirection: "row" 
    }, 
    authorImageContainer: { 
        flex: 0.15, 
        justifyContent: "center", 
        alignItems: "center" 
    }, 
    profileImage: { 
        width: "100%", 
        height: "100%", 
        resizeMode: "contain", 
        borderRadius: RFValue(100) 
    }, 
    authorNameContainer: { 
        flex: 0.85, 
        justifyContent: "center" 
    }, 
    authorNameText: { 
        color: "white",
        fontSize: RFValue(20) 
    },
  authorNameTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black"
  },
    postImage: { 
        marginTop: RFValue(20),
        resizeMode: "contain",
        width: "100%",
        alignSelf: "center",
        height: RFValue(275) 
    },
    captionContainer: {

    },
    captionText: { 
        fontSize: 13,
        color: "white",
        paddingTop: RFValue(10) 
    },
    captionTextLight: { 
        fontSize: 13,
        color: "black",
        paddingTop: RFValue(10) 
    },
    actionContainer: { 
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10) 
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eb3948",
        borderRadius: RFValue(30) 
    },
    likeText: {
        color: "white",
        fontSize: RFValue(25),
        marginLeft: RFValue(5) 
    }, 
    likeTextLight: {
        color: "black",
        fontSize: RFValue(25),
        marginLeft: RFValue(5) 
    }
});