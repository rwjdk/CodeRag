#### Special
- **This is the first v2.x release. It has a set of breaking changes to streamline the API and make it less confusing to use (fewer options to do the same thing). [See a list of breaking changes here](https://github.com/rwjdk/TrelloDotNet/issues/51)**
- Streamlined texts in ReadMe, Changelog, and Description of NuGet Package
- Added .editorconfig to help with naming of public methods (all receive the Async suffix)
- Significantly increased test coverage percentage

#### TrelloClient
- Added `FilterCondition` to `GetCardsOptions` that allows you to filter the cards returned in various ways (Example: _give me all cards on board that have the Red Label, 1-2 Members and the Description contains the word 'Urgent'_). NB: The filter is an in-memory filter as Trello does not allow server-side filtering. See more about the Filter Condition System [here](https://github.com/rwjdk/TrelloDotNet/wiki/Filter-Condition-System)
- Added options for `GetListAsync`, `GetListsAsync`, and `GetListsOnBoardAsync` to include the Board and the Cards on the list(s)
- Added `IncludeOrganization` to `GetBoardOptions`
- Added `GetOrganizationOptions` to the various GetOrganization methods
- Added option to see the Board Preferences of the `Board`
- Added [UpdateBoardPreferencesAsync](https://github.com/rwjdk/TrelloDotNet/wiki/UpdateBoardPreferencesAsync) to update the various preferences of the board
- Added [GetCurrentTokenMembershipsAsync](https://github.com/rwjdk/TrelloDotNet/wiki/GetCurrentTokenMembershipsAsync) to more easily determine if the token-user is Admin on a board
- Added [GetPluginsOnBoardAsync](https://github.com/rwjdk/TrelloDotNet/wiki/GetPluginsOnBoardAsync)
- Added [GetPluginDataOnCardAsync\<T\>(cardId, pluginId)](https://github.com/rwjdk/TrelloDotNet/wiki/GetPluginDataOnCardAsync)
- Added [GetPluginDataOfBoardAsync\<T\>(boardId, pluginId)](https://github.com/rwjdk/TrelloDotNet/wiki/GetPluginDataOfBoardAsync)
- Added Extension Methods for `PlugInData` to cast their values to a Specific Model
- Fixed that a Custom Field of type Date could not be read if it included milliseconds
- Introduced an "Unknown" value for all enum-based values returned from the API to ensure that Trello can introduce new valid values without breaking this API (will revert to this Unknown value if value-parsing fails) [NB: You should never send this value to Add/Update methods as it will result in a failure]
