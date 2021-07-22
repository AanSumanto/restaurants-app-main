const UrlParser = {
  parseActiveUrlWithCombiner() {
      const url = window.location.hash.slice(1).toLowerCase();
      const spliteUrl = this._urlSplitter(url);
      return this._urlCombiner(spliteUrl);
  },

  parseActiveUrlWithoutCombiner() {
      const url = window.location.hash.slice(1).toLowerCase();
      return this._urlSplitter(url);
  },

  _urlSplitter(url) {
      const urlSplits = url.split('/');
      return {
          resource: urlSplits[1] || null,
          id: urlSplits[2] || null,
          verb: urlSplits[3] || null,
      };
  },

  _urlCombiner(spliteUrl) {
    return (spliteUrl.resource ? `/${spliteUrl.resource}` : '/')
      + (spliteUrl.id ? '/:id' : '')
      + (spliteUrl.verb ? `/${spliteUrl.verb}` : '');
  },
};

export default UrlParser;