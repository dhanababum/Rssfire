import XmlReader from 'xml-reader';

export const xmlParser = xml => {
  const reader = XmlReader.create();
  let parsedData = [];

  reader.on('done', data => {
    parsedData = sortFeed(data.children[0].children);
  });

  reader.parse(xml);

  return parsedData;
};

const sortFeed = parsedData => {
  let image = null;
  let siteName = null;
  let feedItem = {};
  let feeds = [];

  parsedData.map(val => {
    // console.log('val', val);
    if(val.name == 'title') {
      siteName = val.children[0].value.replace(/&#(\d+);/g, (match, dec) => { return String.fromCharCode(dec)});
    }

    if(val.name == 'item') {
      val.children.map(item => {
        switch (item.name) {
          case 'title':
            feedItem['title'] = item.children[0].value.replace(/&#(\d+);/g, (match, dec) => { return String.fromCharCode(dec)});
            break;
          case 'link':
            feedItem['link'] = item.children[0].value;
            break;
          case 'pubDate':
            feedItem['pubDate'] = Date.parse(item.children[0].value);
            break;
          case 'dc:date':
            feedItem['pubDate'] = Date.parse(item.children[0].value);
            break;
          case 'description':
            let withoutTags = item.children[0].value.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').replace(/&nbsp;|\t|\n/g, '');
            feedItem['description'] = withoutTags.replace(/&#(\d+);/g, (match, dec) => { return String.fromCharCode(dec)});
            break;
          case 'content:encoded':
            feedItem['content'] = item.children[0].value;
            // feedItem['image'] = item.children[0].value.match(/<img(.|\s)*?>/gi);
            feedItem['image'] = item.children[0].value.match(/<img.*?src=['"](.*?)['"]/);
            break;
          default:
            break;
        }
      });

      feedItem['siteName'] = siteName;
      // console.log('Feed Item:', feedItem);
      feeds.push(feedItem);
      feedItem = {};
    }
  });

  return feeds;
};
