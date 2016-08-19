#Technologies used:
+ JavaScript
+ jquery
+ SASS (CSS)

#API:
+ Google Maps
    + Places Library

#Methodology:
+ BEM (Block Element Modifier)

For this project I decided to dedicate more of my time focusing on the UI architecture. I decided to utilize BEM for it's strict naming conventions, as well as component structure. The selectors in the `.scss` files are also indented to denote child elements for certain classes. This can be seen in the search-container component in **_app.search-container.scss file**.

Along with the BEM methodology, I've also implemented _utility_ classes; these classes also follow the BEM naming convention to denote a modifier to the original class. The _utility_ classes are meant to be general "helper" type classes that eliminate the need for contextual selectors (i.e. `.container p span { color: #fff; }` becomes simply `.u-textColor--white` )
