import "bootstrap";
import "./scss/index.scss";

import "./js/test/";
//  import "./js/components/";
// import "./js/theme/";

// https://webpack.js.org/guides/dependency-management/#require-context

function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context("./js", true, /\.js$/));

$("#jqueryTest").click(() => {
  alert("jQuery workss!");
});
