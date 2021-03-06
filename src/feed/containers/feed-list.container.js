import React from 'react';
import { connect } from 'react-redux';

// import view from screen directory
import { FeedListScreen } from '../screen/feed-list.screen';

import {
  SYSTEM_GET_SNAPSHOT,
  SYSTEM_GET_FEEDS,
  SYSTEM_FILTER_FEEDS,
  USER_PULL_REFRESH,
  USER_TOUCH_FEED_ITEM
} from '../feed-type';

// set state from reducer
const mapStateToProps = state => ({
  uid: state.auth.uid,
  snapshot: state.feed.snapshot,
  feeds: state.feed.feeds,
  filter: state.feed.filter,
  filteredFeeds: state.feed.filteredFeeds,
  categories: state.feed.categories,
  hasGetSnapshot: state.feed.hasGetSnapshot,
  hasFeedsInSnapshot: state.feed.hasFeedsInSnapshot,
  isPendingPullRefresh: state.feed.isPendingPullRefresh,
  error: '',
});

// set dispatch to saga
const mapDispatchToProps = dispatch => ({
  getSnapshotByDispatch: uid => {
    dispatch({
      type: SYSTEM_GET_SNAPSHOT.PENDING,
      uid
    })
  },
  getFilteredFeedsByDispatch: () => {
    dispatch({
      type: SYSTEM_FILTER_FEEDS.PENDING
    })
  },
  refreshFeedsByDispatch: snapshot => {
    dispatch({
      type: USER_PULL_REFRESH.PENDING,
      feeds: snapshot
    })
  },
});

export const FeedListContainer = connect(mapStateToProps, mapDispatchToProps)(FeedListScreen);
