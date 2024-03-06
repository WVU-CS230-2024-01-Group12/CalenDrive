/**
 * Returns the events that match the search type and search key
 * @param {*} events The list of events to filter
 * @param {*} searchType The type of search to perform
 * @param {*} searchKey The key to search for
 * @returns The events that match the search type and search key
 */
export function filterEventsByValue(events, searchType, searchKey) {
  return events.filter((event) => {
    switch (searchType) {
      case "tag":
        return searchKey.any((tag) => event.tags.includes(tag));
      case "name":
        return event.name.includes(searchKey);
      case "location":
        return event.location.includes(searchKey);
      default:
        break;
    }
  });
}
