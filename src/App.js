import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Image,ActivityIndicator, ListView, AppRegistry, ScrollView, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Header from './Header.js';
import Footer from './Footer.js';
import SimpleNavigator from './SimpleNavigator';
import Details from './Details';
import 'whatwg-fetch';

const list_view_styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});

const Row = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: props.picture.large}} style={styles.photo} />
    <Text style={styles.text}>
      {`${props.name.first} ${props.name.last}`}
    </Text>
  </View>
);

class ListItem extends React.PureComponent {
  render() {
    const item = this.props.data;
    const price = item.name.first; 
    return (
      <TouchableHighlight
        onPress= {() => {
        this.props.onPressItem(item);
        }}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.picture.large }} />
            <View style={styles.textContainer}>
              <Text style={styles.price}>{price}</Text>
              <Text style={styles.title}
                numberOfLines={1}>{item.name.first} {item.name.last}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
}


class ListViewDemo extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state ={ 
      isLoading: true,
      dataSource: ds
    };
  }

  componentDidMount() {
    return fetch('https://gist.githubusercontent.com/iwag/20fd91e5b9010c2529bb86bfb8581ba6/raw/e7917efcbbba847c98b0b2f09548e130a9823d90/data.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(responseJson),
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  _onPressItem = (item) => {
    console.log("Pressed row: "+item);
    this.props.nav.linkTo(this, 'personDetails', { item })
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={list_view_styles.container} >
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <ListView
        style={list_view_styles.container}
        dataSource={this.state.dataSource}
	    renderRow={(data, index) => <ListItem data={data} index={index} onPressItem={(i) => this._onPressItem(i)} />}
       renderSeparator={(sectionId, rowId) => <View key={rowId} style={list_view_styles.separator} />}
        renderHeader={() => <Header />}
        renderFooter={() => <Footer />}
      />
    );
  }
}

class App extends Component {
  toggleSideMenu = (showFlag) => {
    this.setState({
      toggled: (typeof showFlag !== 'undefined' ? showFlag : !this.state.toggled)
    })
  }

  render() {
    const leftButtonConfig = (
      <TouchableHighlight onPress={() => this.toggleSideMenu()} style={{ margin: 5 }}>
	    <Text> test </Text>
      </TouchableHighlight>
    )
    const titleConfig = { title: 'Rhinos-app' }

    return (
        <View style={styles.view}>

          <SimpleNavigator ref="nav"
               views={{
                 initialView: ListViewDemo,
                 personDetails: {
                   component: Details, fx: { prop: 'top', fromValue: 500, toValue: 0, duration: 200 }
                 }
               }}
          />
        </View>
    );
  }
}

export default App;
