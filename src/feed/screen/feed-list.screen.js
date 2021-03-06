import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

import { NoFeedNotification, FeedItem } from '../../components/index';

const ITEMS_PER_PAGE = 10;

class FeedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      page: 1,
    };
  }

  _moveToSubscribeView = () => {
    const { navigation } = this.props;
    navigation.navigate('Subscribe');
  }

  _pullRefresh = () => {
    const { snapshot, isPendingPullRefresh } = this.props;
    if(!isPendingPullRefresh) {
      // TODO
      // state item will be empty
      this.props.refreshFeedsByDispatch(snapshot.feeds);

      this.setState({
        items: [],
        page: 1,
      });
    }
  }

  _loadRenderItems = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      const { filteredFeeds } = this.props;
      const clone = filteredFeeds.concat();
      const { items, page } = this.state;

      const start = page * ITEMS_PER_PAGE;
      const end = (page + 1) * ITEMS_PER_PAGE;
      const newData = clone.slice(start, end);

      this.setState({
        items: [...items, ...newData],
        page: page + 1,
      });

      this.onEndReachedCalledDuringMomentum = true;
    }
  }

  props: {
    navigation: Object,
    uid: String,
    snapshot: Object,
    feeds: Array,
    filteredFeeds: Array,
    categories: Object,
    hasGetSnapshot: Boolean,
    hasFeedsInSnapshot: Boolean,
    isPendingPullRefresh: Boolean,
    error: String,
    getSnapshotByDispatch: Function,
    getFilteredFeedsByDispatch: Function,
    refreshFeedsByDispatch: Function,
  };

  componentWillMount() {
    const { uid, hasGetSnapshot } = this.props;
    // pre-fetch data from firebase
    if(!hasGetSnapshot) {
      this.props.getSnapshotByDispatch(uid);
    } else {
      this.props.getFilteredFeedsByDispatch();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { filteredFeeds } = nextProps;
    const clone = filteredFeeds.concat();

    if(clone.length > 0 && this.state.items.length <= 0) {
      this.setState({
        items: clone.slice(0, ITEMS_PER_PAGE)
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {

  }

  _keyExtractor = (item, index) => index;

  _onPressItem = item => {
    const { navigation } = this.props;
    navigation.navigate('Webview', {item});
  };

  _renderItem = ({item, index}) => (
    <FeedItem
      onPress={this._onPressItem}
      item={item}
      index={index}
    />
  );

  render() {
    const {
      navigation,
      uid,
      snapshot,
      feeds,
      filter,
      filteredFeeds,
      categories,
      hasFeedsInSnapshot,
      isPendingPullRefresh,
      error,
    } = this.props;

    // console.log('Snapshot', snapshot);
    // console.log('Has feeds', hasFeedsInSnapshot);
    // console.log('Feeds', feeds);
    // console.log('Error:', error);
    // console.log('Categories', categories);

    if(!hasFeedsInSnapshot) {
      return (
        <NoFeedNotification
          onPress={this._moveToSubscribeView}
        />
      );
    }

    return (
      <FlatList
        data={this.state.items}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshing={isPendingPullRefresh}
        onRefresh={this._pullRefresh}
        onEndReachedThreshold={0.5}
        onEndReached={() => this._loadRenderItems()}
        onMomentumScrollBegin={()=> { this.onEndReachedCalledDuringMomentum = false; }}
      />
    );
  }
}

export const FeedListScreen = FeedList;
