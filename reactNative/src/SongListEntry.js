import React, { Component } from 'react';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { WebView } from 'react-native';
import styles from './css/styles.css';

class SongListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gestureName: 'none',
      backgroundColor: '#fff',
      onPlaylist: false,
      opacity: 1,
    };
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ backgroundColor: 'red' });
        break;
      case SWIPE_DOWN:
        this.setState({ backgroundColor: 'green' });
        break;
      case SWIPE_LEFT:
        this.props._removeSong(this.props.song, 'Song removed')
        this.setState({ backgroundColor: '#282828', onPlaylist: false, opacity: 1 }, () => console.log('Swipe left: ', this.state));
        break;
      case SWIPE_RIGHT:
        this.props._addSong(this.props.song, 'Song added')
        this.setState({ backgroundColor: 'red', onPlaylist: true, opacity: 0.3 }, () => console.log('Swipe right: ', this.state));
        break;
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 10,
    };

    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        config={config}
        style={{ borderColor: this.state.borderColor }}
      >
        <WebView
          key={this.props.index}
          source={{ uri: `https://open.spotify.com/embed?uri=${this.props.song.uri}` }}
          style={[styles.webview, { opacity: this.state.opacity }]}
          allowsInlineMediaPlayback={true}
          automaticallyAdjustContentInsets={true}
          scrollEnabled={true}
          height={100}
        />
      </GestureRecognizer>
    );
  }
}

export default SongListEntry;
