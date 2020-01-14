const Helper = {
  // Helper function to generate fuzzy search query for mongoose out of given value for specific
  // fields
  buildSearchQuery: (options = {}) => {
    const fields = options['fields'] || [];
    const queryValue = options['value'] || '';

    return {
      $or: fields.map(field => {
        let subQuery = {};
        subQuery[`${field}`] = { $regex: Helper.escapeRegex(queryValue), $options: 'i' }

        return subQuery;
      })
    }
  },

  escapeRegex: (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
};

module.exports = Helper;
