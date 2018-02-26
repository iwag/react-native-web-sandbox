import React from 'react'
import { View, Text, Image, StyleSheet,Button } from 'react-native'

export default class Details extends React.Component {

  onItemPress = (item) => {
    if (this.props.onItemPress) {
      this.props.onItemPress(item)
    }
  }

  render () {
    const person = this.props.navParams.item || {}
    return (
      <View style={[ styles.main, this.props.style ]}>
        <View style={styles.profile}>
          <Image style={styles.avatar}
                 source={{ uri: person.picture.large }} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileText}>{person.name.first + ' ' + person.name.last}</Text>
            <Text style={styles.profileText}>{person.cell}</Text>
          </View>
        </View>
        <View style={styles.content}>
        </View>

        <Button icon="chevron-left" title="Back" onPress={() => this.props.nav.back()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 120,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  profileInfo: {
    flex: 1
  },
  profileText: {
    marginTop: 10
  },
  avatar: {
    width: 100, height: 100, borderRadius: 50, margin: 10
  },
  content: {
    flex: 1
  }
})
